import { Point } from './types';

export function getStartAndEndPoints(
  width: number,
  height: number,
  mousePos: Point | null,
  mouseProximity: number
): { start: Point; end: Point } {
  const edgeOffset = -10;
  const isHorizontal = Math.random() > 0.5;

  if (isHorizontal) {
    const y = mousePos
      ? Math.max(height * 0.1, Math.min(height * 0.9, mousePos.y + (Math.random() - 0.5) * mouseProximity))
      : Math.random() * height * 0.8 + height * 0.1;

    const leftToRight = Math.random() > 0.5;

    return {
      start: { x: leftToRight ? edgeOffset : width - edgeOffset, y },
      end: { x: leftToRight ? width - edgeOffset : edgeOffset, y },
    };
  } else {
    const x = mousePos
      ? Math.max(width * 0.1, Math.min(width * 0.9, mousePos.x + (Math.random() - 0.5) * mouseProximity))
      : Math.random() * width * 0.8 + width * 0.1;

    const topToBottom = Math.random() > 0.5;

    return {
      start: { x, y: topToBottom ? edgeOffset : height - edgeOffset },
      end: { x, y: topToBottom ? height - edgeOffset : edgeOffset },
    };
  }
}

export function calculateSquaresOnPath(
  start: Point,
  end: Point,
  squareSize: number,
  gap: number
): Point[] {
  const squares: Point[] = [];
  const step = squareSize + gap;

  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  const numSquares = Math.floor(distance / step);

  for (let i = 0; i <= numSquares; i++) {
    const t = (i * step) / distance;
    squares.push({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    });
  }

  return squares;
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
