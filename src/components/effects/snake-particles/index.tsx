'use client';

import { useState } from 'react';
import { SnakeParticles } from './snake-particles';
import { ControlPanel } from './control-panel';
import { AnimationConfig, DEFAULT_CONFIG } from './types';

export function SnakeParticlesEffect() {
  const [config, setConfig] = useState<AnimationConfig>(DEFAULT_CONFIG);
  const [showDebug, setShowDebug] = useState(false);

  return (
    <>
      <ControlPanel
        config={config}
        onChange={setConfig}
        showDebug={showDebug}
        onDebugToggle={setShowDebug}
      />
      <SnakeParticles config={config} showDebug={showDebug} />
    </>
  );
}

export * from './types';
