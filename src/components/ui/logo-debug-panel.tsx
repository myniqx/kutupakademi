'use client';

import { useEffect, useState } from 'react';
import { LOGO_JOURNEY } from '@/config/logo-journey';

interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DebugData {
  scrollY: number;
  viewportMiddle: number;
  currentIndex: number;
  nextIndex: number;
  progress: number;
  normalizedProgress: number;
  currentPosition: Position | null;
  targetPosition: Position | null;
  positions: Position[];
  currentPlaceholderId: string;
  nextPlaceholderId: string;
  pathType: string;
  isInStickyZone: boolean;
}

export function LogoDebugPanel() {
  const [debugData, setDebugData] = useState<DebugData>({
    scrollY: 0,
    viewportMiddle: 0,
    currentIndex: 0,
    nextIndex: 0,
    progress: 0,
    normalizedProgress: 0,
    currentPosition: null,
    targetPosition: null,
    positions: [],
    currentPlaceholderId: '',
    nextPlaceholderId: '',
    pathType: '',
    isInStickyZone: false,
  });

  const getAbsolutePosition = (element: HTMLElement): Position => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      w: rect.width,
      h: rect.height,
    };
  };

  useEffect(() => {
    const updateDebugData = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportMiddle = scrollY + windowHeight / 2;

      const positions: Position[] = [];
      LOGO_JOURNEY.forEach((step) => {
        const element = document.getElementById(step.placeholderId);
        if (element) {
          positions.push(getAbsolutePosition(element));
        } else {
          positions.push({ x: 0, y: 0, w: 0, h: 0 });
        }
      });

      let currentIndex = 0;
      let nextIndex = 1;
      let progress = 0;
      let normalizedProgress = 0;
      let currentPosition: Position | null = null;
      let targetPosition: Position | null = null;
      let isInStickyZone = false;

      // If before first placeholder, use first
      const firstMiddle = positions[0]?.y + positions[0]?.h / 2;
      if (firstMiddle && viewportMiddle < firstMiddle) {
        currentIndex = 0;
        nextIndex = 0;
        currentPosition = positions[0];
        targetPosition = positions[0];
        isInStickyZone = true;
      } else {
        for (let i = 0; i < positions.length; i++) {
        const current = positions[i];
        const next = positions[i + 1];

        if (!next) {
          currentIndex = i;
          nextIndex = i;
          currentPosition = current;
          targetPosition = current;
          break;
        }

        const currentMiddle = current.y + current.h / 2;
        const nextMiddle = next.y + next.h / 2;

        if (viewportMiddle >= currentMiddle && viewportMiddle < nextMiddle) {
          currentIndex = i;
          nextIndex = i + 1;

          const totalDistance = nextMiddle - currentMiddle;
          const traveledDistance = viewportMiddle - currentMiddle;
          progress = Math.max(0, Math.min(1, traveledDistance / totalDistance));

          const stickyThreshold = 0.3;

          if (progress < stickyThreshold) {
            isInStickyZone = true;
            normalizedProgress = 0;
            currentPosition = current;
            targetPosition = current;
          } else if (progress > (1 - stickyThreshold)) {
            isInStickyZone = true;
            normalizedProgress = 1;
            currentPosition = next;
            targetPosition = next;
          } else {
            isInStickyZone = false;
            normalizedProgress = (progress - stickyThreshold) / (1 - 2 * stickyThreshold);
            currentPosition = current;
            targetPosition = {
              x: current.x + (next.x - current.x) * normalizedProgress,
              y: current.y + (next.y - current.y) * normalizedProgress,
              w: current.w + (next.w - current.w) * normalizedProgress,
              h: current.h + (next.h - current.h) * normalizedProgress,
            };
          }
          break;
        }
      }
      }

      setDebugData({
        scrollY,
        viewportMiddle,
        currentIndex,
        nextIndex,
        progress,
        normalizedProgress,
        currentPosition,
        targetPosition,
        positions,
        currentPlaceholderId: LOGO_JOURNEY[currentIndex]?.placeholderId || '',
        nextPlaceholderId: LOGO_JOURNEY[nextIndex]?.placeholderId || '',
        pathType: LOGO_JOURNEY[currentIndex]?.pathToNext || 'direct',
        isInStickyZone,
      });
    };

    updateDebugData();

    const handleScroll = () => {
      updateDebugData();
    };

    const handleResize = () => {
      updateDebugData();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-background/95 backdrop-blur border border-border rounded-lg p-4 shadow-lg max-w-md text-xs font-mono">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <h3 className="font-bold text-sm">Logo Animation Debug</h3>
        <div className={`w-2 h-2 rounded-full ${debugData.isInStickyZone ? 'bg-green-500' : 'bg-orange-500'}`} />
      </div>

      <div className="space-y-2">
        {/* Scroll Info */}
        <div className="bg-muted/50 p-2 rounded">
          <div className="text-muted-foreground mb-1">Scroll Position</div>
          <div>Y: {debugData.scrollY.toFixed(0)}px</div>
          <div>Viewport Middle: {debugData.viewportMiddle.toFixed(0)}px</div>
        </div>

        {/* Current Transition */}
        <div className="bg-muted/50 p-2 rounded">
          <div className="text-muted-foreground mb-1">Transition</div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">{debugData.currentPlaceholderId}</span>
            <span>→</span>
            <span className="text-primary font-bold">{debugData.nextPlaceholderId}</span>
          </div>
          <div className="mt-1">
            Path: <span className="text-accent-foreground">{debugData.pathType}</span>
          </div>
          <div className="mt-1">
            Status: <span className={debugData.isInStickyZone ? 'text-green-500' : 'text-orange-500'}>
              {debugData.isInStickyZone ? 'STICKY' : 'TRANSITIONING'}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-muted/50 p-2 rounded">
          <div className="text-muted-foreground mb-1">Progress</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-100"
                style={{ width: `${debugData.progress * 100}%` }}
              />
            </div>
            <span>{(debugData.progress * 100).toFixed(1)}%</span>
          </div>
          <div className="mt-1">
            Normalized: {(debugData.normalizedProgress * 100).toFixed(1)}%
          </div>
        </div>

        {/* Current Position */}
        {debugData.currentPosition && (
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-muted-foreground mb-1">Source Position (Absolute)</div>
            <div>X: {debugData.currentPosition.x.toFixed(0)}px, Y: {debugData.currentPosition.y.toFixed(0)}px (abs)</div>
            <div>W: {debugData.currentPosition.w.toFixed(0)}px, H: {debugData.currentPosition.h.toFixed(0)}px</div>
          </div>
        )}

        {/* Target Position */}
        {debugData.targetPosition && (
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-muted-foreground mb-1">Target Position</div>
            <div>Absolute Y: {debugData.targetPosition.y.toFixed(0)}px</div>
            <div>Viewport Y: {(debugData.targetPosition.y - debugData.scrollY).toFixed(0)}px</div>
            <div>X: {debugData.targetPosition.x.toFixed(0)}px | W: {debugData.targetPosition.w.toFixed(0)}px, H: {debugData.targetPosition.h.toFixed(0)}px</div>
          </div>
        )}

        {/* All Placeholders */}
        <div className="bg-muted/50 p-2 rounded max-h-48 overflow-y-auto">
          <div className="text-muted-foreground mb-1">All Placeholders ({debugData.positions.length})</div>
          {LOGO_JOURNEY.map((step, index) => {
            const pos = debugData.positions[index];
            const isActive = index === debugData.currentIndex;
            return (
              <div
                key={step.placeholderId}
                className={`text-[10px] mt-1 p-1 rounded ${isActive ? 'bg-primary/20 text-primary' : ''}`}
              >
                <div className="font-bold">{index}: {step.placeholderId}</div>
                {pos && pos.w > 0 ? (
                  <div className="opacity-70">
                    XY: ({pos.x.toFixed(0)}, {pos.y.toFixed(0)}) |
                    WH: ({pos.w.toFixed(0)}, {pos.h.toFixed(0)})
                  </div>
                ) : (
                  <div className="text-red-500">NOT FOUND</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
