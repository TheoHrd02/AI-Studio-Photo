/**
 * SaaS platform redirect configuration.
 *
 * The SaaS platform does not exist yet.
 * All URLs below are placeholders — update SAAS_BASE_URL when the platform launches.
 * Every redirect on the marketing site derives from this single file.
 */

const SAAS_BASE_URL = 'https://app.aistudiophoto.com'

export const saasConfig = {
  /** Root of the SaaS application */
  baseUrl: SAAS_BASE_URL,

  /** Sends visitors to the sign-up flow */
  signupUrl: `${SAAS_BASE_URL}/signup`,

  /** Sends existing users to the login page */
  loginUrl: `${SAAS_BASE_URL}/login`,

  /** Sends authenticated users to their main dashboard */
  dashboardUrl: `${SAAS_BASE_URL}/dashboard`,

  /** Enterprise: calendar booking or contact form (Calendly, HubSpot, etc.) */
  enterpriseContactUrl: 'https://calendly.com/aistudiophoto/enterprise',
} as const

export type SaasConfig = typeof saasConfig
