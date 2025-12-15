export type AnimationConfig = {
  particleSize: number;
  blurEnd: number;
  opacityPeak: number;
  maxConcurrentBeams: number;
  fadeInDuration: number;
  holdDuration: number;
  fadeOutDuration: number;
};

export const DEFAULT_CONFIG: AnimationConfig = {
  particleSize: 20,
  blurEnd: 5,
  opacityPeak: 0.15,
  maxConcurrentBeams: 12,
  fadeInDuration: 700,
  holdDuration: 1000,
  fadeOutDuration: 650,
};

export type Point = {
  x: number;
  y: number;
};

export type SnakeConfig = {
  fadeInDuration: number;
  holdDuration: number;
  fadeOutDuration: number;
  particleSize: number;
  opacityPeak: number;
  blurEnd: number;
};

export type Snake = {
  id: string;
  squares: Point[];
  color: string;
  startTime: number;
  config?: SnakeConfig;
};
