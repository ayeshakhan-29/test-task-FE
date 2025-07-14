export const config = {
  // Frontend Configuration
  frontend: {
    url: import.meta.env.VITE_FRONTEND_URL,
  },

  // Backend API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },

  // Authentication
  auth: {
    tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY,
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY,
  },

  // Feature Flags
  features: {
    debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === "true",
  },

  // Analytics
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === "true",
    id: import.meta.env.VITE_ANALYTICS_ID,
  },

  // Theme
  theme: {
    default: import.meta.env.VITE_DEFAULT_THEME,
  },

  // App Info
  app: {
    version: import.meta.env.VITE_APP_VERSION,
  },
};
