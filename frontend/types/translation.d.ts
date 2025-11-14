declare module '#app' {
  interface NuxtApp {
    $t: (key: string) => string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}

export {}

