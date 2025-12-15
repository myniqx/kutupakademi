'use client';

import { useState } from 'react';
import { AnimationConfig, DEFAULT_CONFIG } from './types';
import { CaretRight, Gear } from '@phosphor-icons/react';

interface ControlPanelProps {
  config: AnimationConfig;
  onChange: (config: AnimationConfig) => void;
  showDebug: boolean;
  onDebugToggle: (show: boolean) => void;
}

export function ControlPanel({ config, onChange, showDebug, onDebugToggle }: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateConfig = (key: keyof AnimationConfig, value: number | string) => {
    onChange({ ...config, [key]: value });
  };

  const resetToDefaults = () => {
    onChange(DEFAULT_CONFIG);
  };

  const exportConfig = () => {
    const json = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(json);
    alert('Config copied to clipboard!');
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-100">
      <div
        className={`flex items-center transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-80'
          }`}
      >
        <div className="w-80 h-[80vh] bg-black/95 backdrop-blur-md text-white overflow-y-auto shadow-2xl border-r border-white/10 rounded-r-lg">
          <div className="sticky top-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-4 z-10">
            <div className="flex items-center gap-2">
              <Gear size={20} weight="duotone" className="text-blue-400" />
              <h2 className="text-base font-bold">Snake Controls</h2>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium">
                <span>Show Debug Panel</span>
                <input
                  type="checkbox"
                  checked={showDebug}
                  onChange={e => onDebugToggle(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
              </label>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-semibold text-white/60 mb-3">BEAM SETTINGS</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Beam Thickness: {config.particleSize}px
                </label>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={config.particleSize}
                  onChange={e => updateConfig('particleSize', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Blur Amount: {config.blurEnd}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={config.blurEnd}
                  onChange={e => updateConfig('blurEnd', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Opacity: {config.opacityPeak}
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  value={config.opacityPeak}
                  onChange={e => updateConfig('opacityPeak', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-semibold text-white/60 mb-3">TIMING</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max Concurrent Beams: {config.maxConcurrentBeams ?? 12}
                </label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  step="1"
                  value={config.maxConcurrentBeams ?? 12}
                  onChange={e => updateConfig('maxConcurrentBeams', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Spawn Interval: {config.spawnInterval}ms
                </label>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={config.spawnInterval}
                  onChange={e => updateConfig('spawnInterval', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Fade In: {config.fadeInDuration}ms
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={config.fadeInDuration}
                  onChange={e => updateConfig('fadeInDuration', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Hold: {config.holdDuration}ms
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={config.holdDuration}
                  onChange={e => updateConfig('holdDuration', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Fade Out: {config.fadeOutDuration}ms
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={config.fadeOutDuration}
                  onChange={e => updateConfig('fadeOutDuration', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 space-y-2 border-t border-white/10">
              <button
                onClick={exportConfig}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm"
              >
                Copy Config JSON
              </button>
              <button
                onClick={resetToDefaults}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors text-sm"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-0 bg-black/95 backdrop-blur-md text-white px-2 py-8 rounded-r-lg shadow-lg hover:bg-black transition-all border border-l-0 border-white/10 group"
          title={isOpen ? 'Close Controls' : 'Open Controls'}
        >
          <CaretRight
            size={20}
            weight="bold"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
              } group-hover:scale-110`}
          />
        </button>
      </div>
    </div>
  );
}
