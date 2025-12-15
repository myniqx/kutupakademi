'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { LOGO_JOURNEY, type PathType } from '@/config/logo-journey';

interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function AnimatedLogo() {
  const [positions, setPositions] = useState<Position[]>([]);
  const scrollY = useMotionValue(0);

  const getAbsolutePosition = (element: HTMLElement): Position => {
    const rect = element.getBoundingClientRect();
    // Store absolute document coordinates
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      w: rect.width,
      h: rect.height,
    };
  };

  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Position[] = [];

      LOGO_JOURNEY.forEach((step) => {
        const element = document.getElementById(step.placeholderId);
        if (element) {
          newPositions.push(getAbsolutePosition(element));
        }
      });

      if (newPositions.length > 0) {
        setPositions(newPositions);
      }
    };

    // Initial update
    updatePositions();

    // Update positions and scroll on every animation frame
    let rafId: number;
    const animate = () => {
      scrollY.set(window.scrollY);
      updatePositions();
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      updatePositions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY]);

  const getCurrentPositionData = (scroll: number) => {
    if (positions.length === 0) return null;

    const windowHeight = window.innerHeight;
    const viewportMiddle = scroll + windowHeight / 2;

    // If before first placeholder, use first
    const firstMiddle = positions[0].y + positions[0].h / 2;
    if (viewportMiddle < firstMiddle) {
      return {
        position: positions[0],
        progress: 0,
        pathType: LOGO_JOURNEY[0]?.pathToNext || 'direct',
      };
    }

    for (let i = 0; i < positions.length; i++) {
      const current = positions[i];
      const next = positions[i + 1];

      if (!next) {
        return {
          position: current,
          progress: 0,
          pathType: LOGO_JOURNEY[i]?.pathToNext || 'direct',
        };
      }

      const currentMiddle = current.y + current.h / 2;
      const nextMiddle = next.y + next.h / 2;

      if (viewportMiddle >= currentMiddle && viewportMiddle < nextMiddle) {
        const totalDistance = nextMiddle - currentMiddle;
        const traveledDistance = viewportMiddle - currentMiddle;
        const progress = Math.max(0, Math.min(1, traveledDistance / totalDistance));

        const stickyThreshold = 0.15; // Lower = more responsive, Higher = more sticky

        if (progress < stickyThreshold) {
          return {
            position: current,
            progress: 0,
            pathType: LOGO_JOURNEY[i]?.pathToNext || 'direct',
          };
        } else if (progress > (1 - stickyThreshold)) {
          return {
            position: next,
            progress: 0,
            pathType: LOGO_JOURNEY[i + 1]?.pathToNext || 'direct',
          };
        } else {
          const normalizedProgress = (progress - stickyThreshold) / (1 - 2 * stickyThreshold);

          return {
            position: {
              x: current.x + (next.x - current.x) * normalizedProgress,
              y: current.y + (next.y - current.y) * normalizedProgress,
              w: current.w + (next.w - current.w) * normalizedProgress,
              h: current.h + (next.h - current.h) * normalizedProgress,
            },
            progress: normalizedProgress,
            pathType: LOGO_JOURNEY[i]?.pathToNext || 'direct',
          };
        }
      }
    }

    // If after last placeholder, use last
    return {
      position: positions[positions.length - 1],
      progress: 0,
      pathType: 'direct',
    };
  };

  const x = useTransform(scrollY, (scroll) => {
    const data = getCurrentPositionData(scroll);
    return data?.position.x || 0;
  });

  const y = useTransform(scrollY, (scroll) => {
    const data = getCurrentPositionData(scroll);
    const headerHeight = 64; // h-16 = 64px
    return data ? data.position.y - scroll - headerHeight : 0;
  });

  const width = useTransform(scrollY, (scroll) => {
    const data = getCurrentPositionData(scroll);
    return data?.position.w || 40;
  });

  const height = useTransform(scrollY, (scroll) => {
    const data = getCurrentPositionData(scroll);
    return data?.position.h || 40;
  });

  const smoothX = useSpring(x, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 120 });
  const smoothWidth = useSpring(width, { damping: 25, stiffness: 120 });
  const smoothHeight = useSpring(height, { damping: 25, stiffness: 120 });

  const [currentWidth, setCurrentWidth] = useState(40);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const unsubscribeWidth = smoothWidth.on('change', (latest) => {
      setCurrentWidth(latest);
    });
    const unsubscribeX = smoothX.on('change', (latest) => {
      setCurrentPos(prev => ({ ...prev, x: latest }));
    });
    const unsubscribeY = smoothY.on('change', (latest) => {
      setCurrentPos(prev => ({ ...prev, y: latest }));
    });
    const unsubscribeW = smoothWidth.on('change', (latest) => {
      setCurrentPos(prev => ({ ...prev, w: latest }));
    });
    const unsubscribeH = smoothHeight.on('change', (latest) => {
      setCurrentPos(prev => ({ ...prev, h: latest }));
    });

    return () => {
      unsubscribeWidth();
      unsubscribeX();
      unsubscribeY();
      unsubscribeW();
      unsubscribeH();
    };
  }, [smoothWidth, smoothX, smoothY, smoothHeight]);

  if (positions.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed z-100 pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        width: smoothWidth,
        height: smoothHeight,
      }}
    >
      <Image
        src="/kutupakademi.svg"
        alt="Kutup Akademi"
        width={currentWidth}
        height={currentWidth}
        className="pointer-events-auto w-full h-full object-contain rounded-full border-2 p-4 text-primary bg-white border-primary"
        priority
      />
    </motion.div>
  );
}
