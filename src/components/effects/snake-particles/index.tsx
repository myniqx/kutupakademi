'use client';

import { SnakeParticles } from './snake-particles';
import { DEFAULT_CONFIG } from './types';

export function SnakeParticlesEffect() {

  return <SnakeParticles config={DEFAULT_CONFIG} showDebug={false} />

}

export * from './types';
