export type PathType =
  | 'direct'
  | 'arc-left'
  | 'arc-right'
  | 'exit-left'
  | 'exit-right'
  | 'bounce'
  | 'spiral';

export interface LogoJourneyStep {
  placeholderId: string;
  pathToNext?: PathType;
  duration?: number;
}

export const LOGO_JOURNEY: LogoJourneyStep[] = [
  {
    placeholderId: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'hero-logo-mobile' : 'hero-logo',
    pathToNext: 'arc-right',
    duration: 0.8,
  },
  {
    placeholderId: 'partners-logo',
    pathToNext: 'arc-left',
    duration: 0.8,
  },
  {
    placeholderId: 'services-logo',
    pathToNext: 'exit-right',
    duration: 0.7,
  },
  {
    placeholderId: 'process-logo',
    pathToNext: 'arc-right',
    duration: 0.8,
  },
  {
    placeholderId: 'stats-logo',
    pathToNext: 'direct',
    duration: 0.6,
  },
  {
    placeholderId: 'testimonials-logo',
    pathToNext: 'arc-left',
    duration: 0.8,
  },
  {
    placeholderId: 'blog-logo',
    pathToNext: 'direct',
    duration: 0.6,
  },
];
