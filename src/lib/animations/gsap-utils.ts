import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const GSAP_CONFIG = {
  defaults: {
    ease: 'none',
    duration: 1,
  },

  scrollTrigger: {
    scrub: 0.5,
    markers: process.env.NODE_ENV === 'development',
    anticipatePin: 1,
  },

  performance: {
    force3D: true,
    autoRound: false,
  },

  reducedMotion: {
    scrub: 0.1,
    ease: 'power1.inOut',
  },
};

export class GSAPUtils {
  static init() {
    gsap.defaults(GSAP_CONFIG.defaults);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      ScrollTrigger.config({
        ...GSAP_CONFIG.scrollTrigger,
        scrub: GSAP_CONFIG.reducedMotion.scrub,
      });
    } else {
      ScrollTrigger.config(GSAP_CONFIG.scrollTrigger);
    }

    gsap.config({
      force3D: GSAP_CONFIG.performance.force3D,
      autoRound: GSAP_CONFIG.performance.autoRound,
    });
  }

  static cleanup(triggers?: ScrollTrigger[]) {
    if (triggers) {
      triggers.forEach(t => t.kill());
    } else {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }

  static refresh() {
    ScrollTrigger.refresh();
  }

  static setPerspective(element: HTMLElement, perspective: number = 1000) {
    gsap.set(element, {
      perspective,
      transformStyle: 'preserve-3d',
    });
  }
}
