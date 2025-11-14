package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// OpenAIService gère les interactions avec l'API OpenAI
type OpenAIService struct {
	apiKey       string
	assistantID  string
	httpClient   *http.Client
}

// ThreadRequest pour créer un thread
type ThreadRequest struct {
	Messages []ThreadMessage `json:"messages"`
}

// ThreadMessage représente un message dans un thread
type ThreadMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// ThreadResponse représente la réponse de création de thread
type ThreadResponse struct {
	ID string `json:"id"`
}

// RunRequest pour lancer un run
type RunRequest struct {
	AssistantID string `json:"assistant_id"`
}

// RunResponse représente la réponse d'un run
type RunResponse struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

// MessagesResponse représente la liste des messages
type MessagesResponse struct {
	Data []struct {
		ID      string `json:"id"`
		Role    string `json:"role"`
		Content []struct {
			Type string `json:"type"`
			Text struct {
				Value string `json:"value"`
			} `json:"text"`
		} `json:"content"`
	} `json:"data"`
}

// OpenAIErrorResponse représente une erreur de l'API OpenAI
type OpenAIErrorResponse struct {
	Error struct {
		Message string `json:"message"`
		Type    string `json:"type"`
		Code    string `json:"code"`
	} `json:"error"`
}

// NewOpenAIService crée une nouvelle instance du service OpenAI
func NewOpenAIService() *OpenAIService {
	return &OpenAIService{
		apiKey:      os.Getenv("OPENAI_API_KEY"),
		assistantID: os.Getenv("ASSISTANT_ID"),
		httpClient: &http.Client{
			Timeout: 60 * time.Second,
		},
	}
}

// AskQuestion envoie une question à OpenAI et retourne la réponse
func (s *OpenAIService) AskQuestion(question string) (string, error) {
	// Validation des variables d'environnement
	if s.apiKey == "" {
		return "", fmt.Errorf("OPENAI_API_KEY is not set")
	}
	if s.assistantID == "" {
		return "", fmt.Errorf("ASSISTANT_ID is not set")
	}

	// Étape 1: Créer un thread
	threadID, err := s.createThread(question)
	if err != nil {
		return "", fmt.Errorf("failed to create thread: %w", err)
	}

	// Étape 2: Lancer le run
	runID, err := s.createRun(threadID)
	if err != nil {
		return "", fmt.Errorf("failed to create run: %w", err)
	}

	// Étape 3: Attendre la complétion
	err = s.waitForCompletion(threadID, runID)
	if err != nil {
		return "", fmt.Errorf("run failed: %w", err)
	}

	// Étape 4: Récupérer les messages
	answer, err := s.getMessages(threadID)
	if err != nil {
		return "", fmt.Errorf("failed to get messages: %w", err)
	}

	if answer == "" {
		return "Je ne sais pas.", nil
	}

	return answer, nil
}

// createThread crée un nouveau thread avec le message utilisateur
func (s *OpenAIService) createThread(question string) (string, error) {
	reqBody := ThreadRequest{
		Messages: []ThreadMessage{
			{
				Role:    "user",
				Content: question,
			},
		},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/threads", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.apiKey)
	req.Header.Set("OpenAI-Beta", "assistants=v2")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != http.StatusOK {
		var errResp OpenAIErrorResponse
		json.Unmarshal(body, &errResp)
		return "", fmt.Errorf("API error: %s", errResp.Error.Message)
	}

	var threadResp ThreadResponse
	if err := json.Unmarshal(body, &threadResp); err != nil {
		return "", err
	}

	return threadResp.ID, nil
}

// createRun lance un run sur le thread
func (s *OpenAIService) createRun(threadID string) (string, error) {
	reqBody := RunRequest{
		AssistantID: s.assistantID,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	url := fmt.Sprintf("https://api.openai.com/v1/threads/%s/runs", threadID)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.apiKey)
	req.Header.Set("OpenAI-Beta", "assistants=v2")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != http.StatusOK {
		var errResp OpenAIErrorResponse
		json.Unmarshal(body, &errResp)
		return "", fmt.Errorf("API error: %s", errResp.Error.Message)
	}

	var runResp RunResponse
	if err := json.Unmarshal(body, &runResp); err != nil {
		return "", err
	}

	return runResp.ID, nil
}

// waitForCompletion attend que le run soit terminé
func (s *OpenAIService) waitForCompletion(threadID, runID string) error {
	url := fmt.Sprintf("https://api.openai.com/v1/threads/%s/runs/%s", threadID, runID)
	
	for i := 0; i < 30; i++ { // Max 30 secondes
		time.Sleep(1 * time.Second)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			return err
		}

		req.Header.Set("Authorization", "Bearer "+s.apiKey)
		req.Header.Set("OpenAI-Beta", "assistants=v2")

		resp, err := s.httpClient.Do(req)
		if err != nil {
			return err
		}

		body, err := io.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			return err
		}

		var runResp RunResponse
		if err := json.Unmarshal(body, &runResp); err != nil {
			return err
		}

		if runResp.Status == "completed" {
			return nil
		}

		if runResp.Status == "failed" || runResp.Status == "cancelled" || runResp.Status == "expired" {
			return fmt.Errorf("run status: %s", runResp.Status)
		}
	}

	return fmt.Errorf("timeout waiting for completion")
}

// getMessages récupère les messages du thread
func (s *OpenAIService) getMessages(threadID string) (string, error) {
	url := fmt.Sprintf("https://api.openai.com/v1/threads/%s/messages", threadID)
	
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+s.apiKey)
	req.Header.Set("OpenAI-Beta", "assistants=v2")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var messagesResp MessagesResponse
	if err := json.Unmarshal(body, &messagesResp); err != nil {
		return "", err
	}

	// Le premier message est la réponse de l'assistant
	if len(messagesResp.Data) > 0 && messagesResp.Data[0].Role == "assistant" {
		if len(messagesResp.Data[0].Content) > 0 {
			return messagesResp.Data[0].Content[0].Text.Value, nil
		}
	}

	return "", nil
}
