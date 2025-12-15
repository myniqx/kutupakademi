'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationConfig, Snake, Point } from './types';
import {
  getStartAndEndPoints,
  calculateSquaresOnPath,
  getRandomColor,
} from './utils';

interface SnakeParticlesProps {
  config: AnimationConfig;
  showDebug?: boolean;
}

export function SnakeParticles({ config, showDebug = false }: SnakeParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const [snakes, setSnakes] = useState<Snake[]>([]);
  const [mousePos, setMousePos] = useState<Point | null>(null);
  const mousePosRef = useRef<Point | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        mousePosRef.current = newPos;
        setMousePos(newPos);
      }
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
      setMousePos(null);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const spawnSnake = () => {
      const currentConfig = configRef.current;

      const { start, end } = getStartAndEndPoints(
        dimensions.width,
        dimensions.height,
        mousePosRef.current,
        currentConfig.mouseProximity
      );

      const squares = calculateSquaresOnPath(
        start,
        end,
        currentConfig.particleSize,
        currentConfig.particleGap
      );

      const snakeConfig = {
        fadeInDuration: currentConfig.fadeInDuration,
        holdDuration: currentConfig.holdDuration,
        fadeOutDuration: currentConfig.fadeOutDuration,
        segmentDelay: currentConfig.segmentDelay,
        particleSize: currentConfig.particleSize,
        opacityPeak: currentConfig.opacityPeak,
        blurStart: currentConfig.blurStart,
        blurEnd: currentConfig.blurEnd,
        scaleStart: currentConfig.scaleStart,
        scaleEnd: currentConfig.scaleEnd,
      };

      const newSnake: Snake = {
        id: `snake-${Date.now()}-${Math.random()}`,
        squares,
        color: `black`,
        startTime: Date.now(),
        config: snakeConfig,
      };

      setSnakes(prev => [...prev, newSnake]);

      const totalSquares = squares.length;
      const threshold95Index = Math.floor(totalSquares * 0.95);
      const waitUntil95 = Math.max(
        0,
        (threshold95Index * snakeConfig.segmentDelay + snakeConfig.fadeInDuration) - snakeConfig.fadeInDuration
      );
      const adjustedHold = snakeConfig.holdDuration + waitUntil95;
      const totalDuration = snakeConfig.fadeInDuration + adjustedHold + snakeConfig.fadeOutDuration;
      const lastSquareDelay = (totalSquares - 1) * snakeConfig.segmentDelay;
      const lastSquareEnd = lastSquareDelay + totalDuration;

      setTimeout(() => {
        setSnakes(prev => prev.filter(s => s.id !== newSnake.id));
      }, lastSquareEnd);
    };

    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
    }

    spawnIntervalRef.current = setInterval(spawnSnake, configRef.current.spawnInterval);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-screen h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {snakes.map((snake, snakeIndex) => {
        const snakeConfig = snake.config || config;

        return (
          <div key={snake.id} className="contents">
            {showDebug && (
              <div
                className="absolute pointer-events-none z-100 text-xs font-mono bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap"
                style={{
                  left: snake.squares[0]?.x || 0,
                  top: (snake.squares[0]?.y || 0) - 30,
                }}
              >
                S{snakeIndex + 1} ({snake.squares.length}p)
              </div>
            )}
            {snake.squares.map((square, index) => {
              const totalSquares = snake.squares.length;
              const delay = index * snakeConfig.segmentDelay;

              const visibilityThreshold = 0.95;
              const threshold95Index = Math.floor(totalSquares * visibilityThreshold);

              const waitUntil95PercentFadesIn = Math.max(
                0,
                (threshold95Index * snakeConfig.segmentDelay + snakeConfig.fadeInDuration) - (delay + snakeConfig.fadeInDuration)
              );

              const adjustedHoldDuration = snakeConfig.holdDuration + waitUntil95PercentFadesIn;

              const totalDuration =
                snakeConfig.fadeInDuration + adjustedHoldDuration + snakeConfig.fadeOutDuration;

              return (
                <motion.div
                  key={`${snake.id}-${index}`}
                  className="absolute rounded-sm"
                  style={{
                    left: square.x - snakeConfig.particleSize / 2,
                    top: square.y - snakeConfig.particleSize / 2,
                    width: snakeConfig.particleSize,
                    height: snakeConfig.particleSize,
                    backgroundColor: snake.color,
                  }}
                  initial={{
                    opacity: 0,
                    filter: `blur(${snakeConfig.blurStart}px)`,
                    scale: snakeConfig.scaleStart,
                  }}
                  animate={{
                    opacity: [0, snakeConfig.opacityPeak, snakeConfig.opacityPeak, 0],
                    filter: [
                      `blur(${snakeConfig.blurStart}px)`,
                      `blur(${snakeConfig.blurEnd}px)`,
                      `blur(${snakeConfig.blurEnd}px)`,
                      `blur(${snakeConfig.blurStart}px)`,
                    ],
                    scale: [
                      snakeConfig.scaleStart,
                      snakeConfig.scaleEnd,
                      snakeConfig.scaleEnd,
                      0.1,
                    ],
                  }}
                  transition={{
                    duration: totalDuration / 1000,
                    delay: delay / 1000,
                    times: [
                      0,
                      snakeConfig.fadeInDuration / totalDuration,
                      (snakeConfig.fadeInDuration + adjustedHoldDuration) / totalDuration,
                      1,
                    ],
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
