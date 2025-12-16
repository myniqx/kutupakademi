'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { AnimationConfig, Snake } from './types';
import {
  getStartAndEndPoints,
  calculateSquaresOnPath,
} from './utils';

interface SnakeParticlesProps {
  config: AnimationConfig;
  showDebug?: boolean;
}

export function SnakeParticles({ config, showDebug = false }: SnakeParticlesProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const [snakes, setSnakes] = useState<Snake[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    if (!showDebug) return;
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, [showDebug]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);


  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const spawnSnake = () => {
      const currentConfig = configRef.current;

      setSnakes(prev => {
        const maxBeams = currentConfig.maxConcurrentBeams ?? 12;
        if (prev.length >= maxBeams) {
          return prev;
        }

        const { start, end } = getStartAndEndPoints(
          dimensions.width,
          dimensions.height
        );

        const squares = calculateSquaresOnPath(start, end);

        const snakeConfig = {
          fadeInDuration: currentConfig.fadeInDuration,
          holdDuration: currentConfig.holdDuration,
          fadeOutDuration: currentConfig.fadeOutDuration,
          particleSize: currentConfig.particleSize,
          opacityPeak: currentConfig.opacityPeak,
          blurEnd: currentConfig.blurEnd,
        };

        // Theme-aware colors with occasional accent waves
        const isDark = theme === 'dark';
        const useAccentColor = Math.random() < 0.3; // 30% chance for accent wave

        const color = isDark
          ? (useAccentColor ? 'black' : 'white') // Dark mode: mainly white, some black
          : (useAccentColor ? 'white' : 'black'); // Light mode: mainly black, some white

        const newSnake: Snake = {
          id: `snake-${Date.now()}-${Math.random()}`,
          squares,
          color,
          startTime: Date.now(),
          config: snakeConfig,
        };

        const totalDuration = snakeConfig.fadeInDuration + snakeConfig.holdDuration + snakeConfig.fadeOutDuration;

        setTimeout(() => {
          setSnakes(current => current.filter(s => s.id !== newSnake.id));
        }, totalDuration);

        return [...prev, newSnake];
      });
    };

    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
    }

    const currentConfig = configRef.current;
    const totalDuration = currentConfig.fadeInDuration + currentConfig.holdDuration + currentConfig.fadeOutDuration;
    const maxBeams = currentConfig.maxConcurrentBeams ?? 12;
    const minBeams = Math.ceil(maxBeams / 2);

    const targetInterval = totalDuration / minBeams;

    spawnIntervalRef.current = setInterval(spawnSnake, targetInterval);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    };
  }, [dimensions.width, dimensions.height, config]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-screen h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {snakes.map((snake) => {
        const snakeConfig = snake.config || config;
        const start = snake.squares[0];
        const end = snake.squares[snake.squares.length - 1];

        if (!start || !end) return null;

        const isHorizontal = Math.abs(end.x - start.x) > Math.abs(end.y - start.y);
        const distance = Math.sqrt(
          Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
        );

        const leftToRight = isHorizontal && end.x > start.x;
        const topToBottom = !isHorizontal && end.y > start.y;

        const beamWidth = isHorizontal ? distance * 3 : snakeConfig.particleSize;
        const beamHeight = isHorizontal ? snakeConfig.particleSize : distance * 3;

        const totalDuration =
          snakeConfig.fadeInDuration + snakeConfig.holdDuration + snakeConfig.fadeOutDuration;

        return (
          <div key={snake.id} className="contents">
            <motion.div
              className="absolute rounded-lg overflow-hidden"
              style={{
                left: Math.min(start.x, end.x),
                top: Math.min(start.y, end.y),
                width: beamWidth,
                height: beamHeight,
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  width: beamWidth,
                  height: beamHeight,
                  background: `linear-gradient(
                    ${isHorizontal ? 'to right' : 'to bottom'},
                    transparent 0%,
                    ${snake.color} 50%,
                    transparent 100%
                  )`,
                  filter: `blur(${snakeConfig.blurEnd}px)`,
                }}
                initial={{
                  [isHorizontal ? 'left' : 'top']: leftToRight || topToBottom ? -beamWidth : beamWidth,
                  opacity: 0,
                }}
                animate={{
                  [isHorizontal ? 'left' : 'top']: [
                    leftToRight || topToBottom ? -beamWidth : beamWidth,
                    0,
                    0,
                    leftToRight || topToBottom ? beamWidth : -beamWidth,
                  ],
                  opacity: [0, snakeConfig.opacityPeak, snakeConfig.opacityPeak, 0],
                }}
                transition={{
                  duration: totalDuration / 1000,
                  times: [
                    0,
                    snakeConfig.fadeInDuration / totalDuration,
                    (snakeConfig.fadeInDuration + snakeConfig.holdDuration) / totalDuration,
                    1,
                  ],
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        );
      })}

      {showDebug && snakes.length > 0 && (
        <div className="fixed top-40 right-4 bg-black/90 backdrop-blur-md text-white p-4 rounded-lg shadow-2xl border border-white/10 z-200 min-w-75">
          <h3 className="text-sm font-bold mb-3 border-b border-white/20 pb-2">
            Active Beams ({snakes.length})
          </h3>
          <div className="space-y-2 text-xs font-mono max-h-[60vh] overflow-y-auto">
            {snakes.map((snake, idx) => {
              const snakeConfig = snake.config || config;
              const elapsed = currentTime - snake.startTime;
              const totalDuration =
                snakeConfig.fadeInDuration + snakeConfig.holdDuration + snakeConfig.fadeOutDuration;
              const remaining = Math.max(0, totalDuration - elapsed);
              const progress = Math.min(100, (elapsed / totalDuration) * 100);

              let status = 'Active';
              let statusColor = 'text-green-400';

              if (elapsed < snakeConfig.fadeInDuration) {
                status = 'Fading In';
                statusColor = 'text-blue-400';
              } else if (elapsed >= snakeConfig.fadeInDuration + snakeConfig.holdDuration) {
                status = 'Fading Out';
                statusColor = 'text-orange-400';
              }

              const start = snake.squares[0];
              const end = snake.squares[snake.squares.length - 1];
              const isHorizontal = Math.abs(end.x - start.x) > Math.abs(end.y - start.y);
              const leftToRight = isHorizontal && end.x > start.x;
              const topToBottom = !isHorizontal && end.y > start.y;
              const direction = isHorizontal
                ? (leftToRight ? 'L→R' : 'R→L')
                : (topToBottom ? 'T→B' : 'B→T');

              return (
                <div
                  key={snake.id}
                  className="bg-white/5 p-2 rounded border border-white/10"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60">Beam #{idx + 1} ({direction})</span>
                    <span className={statusColor}>{status}</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-linear-to-r from-blue-500 to-purple-500 h-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px] text-white/50">
                    <span>Active: {(elapsed / 1000).toFixed(2)}s</span>
                    <span>Remaining: {(remaining / 1000).toFixed(2)}s</span>
                    <span>Total: {(totalDuration / 1000).toFixed(2)}s</span>
                    <span>Progress: {progress.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
