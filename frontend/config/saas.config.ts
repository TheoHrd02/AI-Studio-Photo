/**
 * SaaS platform redirect configuration.
 *
 * The SaaS platform does not exist yet.
 * All URLs below are placeholders — update SAAS_BASE_URL when the platform launches.
 * Every redirect on the marketing site derives from this single file.
 */

const SAAS_BASE_URL = 'https://app.glintstudio.ai'

export const saasConfig = {
  /** Root of the SaaS application */
  baseUrl: SAAS_BASE_URL,

  /** Sign-up and login: app root (no /signup or /login route yet) */
  signupUrl: SAAS_BASE_URL,
  loginUrl: SAAS_BASE_URL,

  /** Enterprise: calendar booking or contact form (Calendly, HubSpot, etc.) */
  enterpriseContactUrl: 'https://calendly.com/glintstudio/enterprise',
} as const

export type SaasConfig = typeof saasConfig
