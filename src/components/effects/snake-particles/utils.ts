import { Point } from './types';

export function getStartAndEndPoints(
  width: number,
  height: number
): { start: Point; end: Point } {
  const edgeOffset = 10;
  const isHorizontal = Math.random() > 0.5;

  if (isHorizontal) {
    const y = Math.random() * height * 0.8 + height * 0.1;
    const leftToRight = Math.random() > 0.5;

    return {
      start: { x: leftToRight ? -edgeOffset : width + edgeOffset, y },
      end: { x: leftToRight ? width + edgeOffset : -edgeOffset, y },
    };
  } else {
    const x = Math.random() * width * 0.8 + width * 0.1;
    const topToBottom = Math.random() > 0.5;

    return {
      start: { x, y: topToBottom ? -edgeOffset : height + edgeOffset },
      end: { x, y: topToBottom ? height + edgeOffset : -edgeOffset },
    };
  }
}

export function calculateSquaresOnPath(
  start: Point,
  end: Point
): Point[] {
  return [start, end];
}

export function getRandomColor(): string {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ||
    document.documentElement.classList.contains('dark');

  if (isDarkMode) {
    const lightness = Math.floor(Math.random() * 30) + 70;
    return `hsl(0, 0%, ${lightness}%)`;
  } else {
    const lightness = Math.floor(Math.random() * 30) + 10;
    return `hsl(0, 0%, ${lightness}%)`;
  }
}
