export type AnimationConfig = {
  particleCount: number;
  particleSize: number;
  particleGap: number;
  baseSpeed: number;
  mouseSpeedMultiplier: number;
  mouseProximity: number;
  blurStart: number;
  blurEnd: number;
  scaleStart: number;
  scaleEnd: number;
  opacityPeak: number;
  spawnInterval: number;
  segmentDelay: number;
  fadeInDuration: number;
  holdDuration: number;
  fadeOutDuration: number;
};

export const DEFAULT_CONFIG: AnimationConfig = {
  particleCount: 5,
  particleSize: 24,
  particleGap: 9,
  baseSpeed: 1,
  mouseSpeedMultiplier: 1.5,
  mouseProximity: 50,
  blurStart: 9,
  blurEnd: 5,
  scaleStart: 2,
  scaleEnd: 1,
  opacityPeak: 0.15,
  spawnInterval: 1600,
  segmentDelay: 80,
  fadeInDuration: 350,
  holdDuration: 100,
  fadeOutDuration: 350,
};

export type Edge = 'top' | 'right' | 'bottom' | 'left';

export type Point = {
  x: number;
  y: number;
};

export type SnakeConfig = {
  fadeInDuration: number;
  holdDuration: number;
  fadeOutDuration: number;
  segmentDelay: number;
  particleSize: number;
  opacityPeak: number;
  blurStart: number;
  blurEnd: number;
  scaleStart: number;
  scaleEnd: number;
};

export type Snake = {
  id: string;
  squares: Point[];
  color: string;
  startTime: number;
  config?: SnakeConfig;
};
