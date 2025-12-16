export interface Point3D {
  x: number;
  y: number;
  z?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
}

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type PathType =
  | 'direct'
  | 'arc-left'
  | 'arc-right'
  | 'exit-left'
  | 'exit-right'
  | 'bounce'
  | 'spiral';

export interface PathConfig {
  start: Position;
  end: Position;
  type: PathType;
  intensity?: number;
  bounceCount?: number;
  overshoot?: number;
}

export class PathGenerator {
  static arc(config: PathConfig, progress: number): Point3D {
    const { start, end, type } = config;
    const intensity = config.intensity ?? 0.3;

    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const offsetDistance = distance * intensity;
    const direction = type === 'arc-left' ? -1 : 1;
    const controlX = midX + (-dy / distance) * offsetDistance * direction;
    const controlY = midY + (dx / distance) * offsetDistance * direction;

    const t = progress;
    const invT = 1 - t;

    const x = invT * invT * start.x + 2 * invT * t * controlX + t * t * end.x;
    const y = invT * invT * start.y + 2 * invT * t * controlY + t * t * end.y;

    const rotateZ = Math.sin(t * Math.PI) * 15 * direction;
    const scale = 1 + Math.sin(t * Math.PI) * 0.1;

    return { x, y, rotateZ, scale };
  }

  static spiral(config: PathConfig, progress: number): Point3D {
    const { start, end } = config;
    const intensity = config.intensity ?? 0.5;
    const rotations = 1.5;

    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;

    const angle = progress * Math.PI * 2 * rotations;
    const radius = 100 * intensity * (1 - progress);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const offsetX = radius * Math.cos(angle) * (-dy / distance);
    const offsetY = radius * Math.sin(angle) * (dx / distance);

    const rotateX = Math.sin(angle) * 20 * intensity;
    const rotateY = Math.cos(angle) * 15 * intensity;
    const rotateZ = progress * 360 * rotations;
    const scale = 1 + Math.sin(angle) * 0.15;
    const z = Math.sin(angle) * 50 * intensity;

    return {
      x: x + offsetX,
      y: y + offsetY,
      z,
      rotateX,
      rotateY,
      rotateZ,
      scale,
    };
  }

  static bounce(config: PathConfig, progress: number): Point3D {
    const { start, end } = config;
    const bounceCount = config.bounceCount ?? 2;

    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;

    const frequency = bounceCount * Math.PI;
    const damping = 3;
    const amplitude = 80;

    const bounceOffset =
      amplitude * Math.exp(-damping * progress) * Math.abs(Math.sin(frequency * progress));

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const offsetX = bounceOffset * (-dy / distance);
    const offsetY = bounceOffset * (dx / distance);

    const rotateZ = Math.sin(frequency * progress) * 10 * Math.exp(-damping * progress);
    const scale =
      1 + Math.abs(Math.sin(frequency * progress)) * 0.1 * Math.exp(-damping * progress);

    return {
      x: x + offsetX,
      y: y + offsetY,
      rotateZ,
      scale,
    };
  }

  static exit(config: PathConfig, progress: number): Point3D {
    const { start, end, type } = config;
    const direction = type === 'exit-left' ? -1 : 1;
    const overshoot = config.overshoot ?? 1.70158;

    const t = progress;
    const easedProgress = t * t * ((overshoot + 1) * t - overshoot);

    const x = start.x + (end.x - start.x) * easedProgress;
    const y = start.y + (end.y - start.y) * easedProgress;

    const rotateY = easedProgress * 180 * direction;
    const rotateZ = easedProgress * 90 * direction;
    const scale = 1 + (1 - easedProgress) * 0.2;

    return { x, y, rotateY, rotateZ, scale };
  }

  static direct(config: PathConfig, progress: number): Point3D {
    const { start, end } = config;
    return {
      x: start.x + (end.x - start.x) * progress,
      y: start.y + (end.y - start.y) * progress,
    };
  }

  static generate(config: PathConfig, progress: number): Point3D {
    switch (config.type) {
      case 'arc-left':
      case 'arc-right':
        return this.arc(config, progress);
      case 'spiral':
        return this.spiral(config, progress);
      case 'bounce':
        return this.bounce(config, progress);
      case 'exit-left':
      case 'exit-right':
        return this.exit(config, progress);
      case 'direct':
      default:
        return this.direct(config, progress);
    }
  }
}
