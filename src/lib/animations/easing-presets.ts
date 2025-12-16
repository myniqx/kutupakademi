export const EASING_PRESETS = {
  smooth: {
    snap: 'power2.out',
    transition: 'power1.inOut',
    bounce: 'elastic.out(1, 0.5)',
    spring: 'back.out(1.4)',
  },

  scroll: {
    scrubbed: 'none',
    velocity: 'power1.out',
  },

  rotation: {
    smooth: 'power2.inOut',
    elastic: 'elastic.out(1, 0.3)',
  },

  scale: {
    pop: 'back.out(1.7)',
    smooth: 'power2.out',
  },
};

export const stickyEase = (threshold: number = 0.15) => {
  return (progress: number): number => {
    if (progress < threshold) return 0;
    if (progress > 1 - threshold) return 1;
    return (progress - threshold) / (1 - 2 * threshold);
  };
};
