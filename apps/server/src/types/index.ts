export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  VIEWER = 'VIEWER',
}

export enum DeploymentStatus {
  QUEUED = 'QUEUED',
  BUILDING = 'BUILDING',
  DEPLOYING = 'DEPLOYING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum ProviderType {
  GITHUB = 'GITHUB',
  VERCEL = 'VERCEL',
  AWS = 'AWS',
  KUBERNETES = 'KUBERNETES',
  NETLIFY = 'NETLIFY',
  RAILWAY = 'RAILWAY',
  GOOGLE_CLOUD = 'GOOGLE_CLOUD',
  AZURE = 'AZURE',
}

export enum EventLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  AI_INSIGHT = 'AI_INSIGHT',
}
