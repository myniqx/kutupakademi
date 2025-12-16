export type PathType =
  | 'direct'
  | 'arc-left'
  | 'arc-right'
  | 'exit-left'
  | 'exit-right'
  | 'bounce'
  | 'spiral';

export interface Transform3D {
  perspective?: number;
  rotateX?: [number, number];
  rotateY?: [number, number];
  rotateZ?: [number, number];
  scale?: [number, number];
  z?: number;
}

export interface LogoJourneyStep {
  placeholderId: string;
  pathToNext?: PathType;
  duration?: number;
  transforms?: Transform3D;
  pathConfig?: {
    intensity?: number;
    bounceCount?: number;
    overshoot?: number;
  };
  stickyThreshold?: number;
}

export const LOGO_JOURNEY: LogoJourneyStep[] = [
  {
    placeholderId: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'hero-logo-mobile' : 'hero-logo',
    pathToNext: 'arc-right',
    duration: 0.8,
    transforms: {
      perspective: 1200,
      rotateY: [0, 15],
      scale: [1, 1.05],
    },
    pathConfig: {
      intensity: 0.4,
    },
  },
  {
    placeholderId: 'partners-logo',
    pathToNext: 'spiral',
    duration: 0.8,
    transforms: {
      perspective: 1000,
      rotateX: [-10, 10],
      rotateY: [15, -15],
      rotateZ: [0, 360],
    },
    pathConfig: {
      intensity: 0.6,
    },
  },
  {
    placeholderId: 'services-logo',
    pathToNext: 'exit-right',
    duration: 0.7,
    transforms: {
      perspective: 800,
      rotateY: [0, 180],
      scale: [1, 1.2],
    },
    pathConfig: {
      overshoot: 1.5,
    },
  },
  {
    placeholderId: 'process-logo',
    pathToNext: 'bounce',
    duration: 0.8,
    transforms: {
      perspective: 1000,
      rotateZ: [-5, 5],
    },
    pathConfig: {
      bounceCount: 3,
    },
  },
  {
    placeholderId: 'stats-logo',
    pathToNext: 'direct',
    duration: 0.6,
    transforms: {
      scale: [1, 1.1],
    },
  },
  {
    placeholderId: 'testimonials-logo',
    pathToNext: 'arc-left',
    duration: 0.8,
    transforms: {
      perspective: 1200,
      rotateY: [0, -20],
    },
    pathConfig: {
      intensity: 0.5,
    },
  },
  {
    placeholderId: 'blog-logo',
    pathToNext: 'direct',
    duration: 0.6,
    stickyThreshold: 0.2,
  },
];
