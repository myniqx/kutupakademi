import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_JOURNEY } from '@/config/logo-journey';
import { PathGenerator, Position } from '@/lib/animations/path-generators';
import { GSAPUtils, GSAP_CONFIG } from '@/lib/animations/gsap-utils';
import { stickyEase } from '@/lib/animations/easing-presets';

export function useLogoAnimation(logoRef: RefObject<HTMLDivElement>) {
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const positionsRef = useRef<Position[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    GSAPUtils.init();

    GSAPUtils.setPerspective(logoRef.current, 1200);

    const getPositions = (): Position[] => {
      return LOGO_JOURNEY.map((step) => {
        const element = document.getElementById(step.placeholderId);
        if (!element) return { x: 0, y: 0, w: 0, h: 0 };

        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          w: rect.width,
          h: rect.height,
        };
      });
    };

    positionsRef.current = getPositions();

    // Set initial position
    const initialPos = positionsRef.current[0];
    if (initialPos && logoRef.current) {
      gsap.set(logoRef.current, {
        x: initialPos.x,
        y: initialPos.y - window.scrollY - 64,
        width: initialPos.w,
        height: initialPos.h,
      });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: GSAP_CONFIG.scrollTrigger.scrub,
        invalidateOnRefresh: true,
        onUpdate: () => {
          positionsRef.current = getPositions();
        },
      },
    });

    timelineRef.current = timeline;

    LOGO_JOURNEY.forEach((step, index) => {
      const nextStep = LOGO_JOURNEY[index + 1];
      if (!nextStep) return;

      const stickyThreshold = step.stickyThreshold ?? 0.15;

      const segmentTimeline = gsap.timeline();

      segmentTimeline.to(logoRef.current, {
        duration: stickyThreshold,
        ease: 'none',
        onUpdate: function () {
          const positions = positionsRef.current;
          const currentPos = positions[index];

          if (logoRef.current && currentPos) {
            gsap.set(logoRef.current, {
              x: currentPos.x,
              y: currentPos.y - window.scrollY - 64,
              width: currentPos.w,
              height: currentPos.h,
            });
          }
        },
      });

      const transitionDuration = 1 - 2 * stickyThreshold;

      segmentTimeline.to(logoRef.current, {
        duration: transitionDuration,
        ease: 'none',
        onUpdate: function () {
          const progress = this.progress();
          const positions = positionsRef.current;

          if (!logoRef.current || !positions[index] || !positions[index + 1]) return;

          const pathPoint = PathGenerator.generate(
            {
              start: positions[index],
              end: positions[index + 1],
              type: step.pathToNext || 'direct',
              intensity: step.pathConfig?.intensity,
              bounceCount: step.pathConfig?.bounceCount,
              overshoot: step.pathConfig?.overshoot,
            },
            progress
          );

          const widthInterpolated =
            positions[index].w + (positions[index + 1].w - positions[index].w) * progress;
          const heightInterpolated =
            positions[index].h + (positions[index + 1].h - positions[index].h) * progress;

          gsap.set(logoRef.current, {
            x: pathPoint.x,
            y: pathPoint.y - window.scrollY - 64,
            width: widthInterpolated,
            height: heightInterpolated,
            rotateX: pathPoint.rotateX ?? 0,
            rotateY: pathPoint.rotateY ?? 0,
            rotateZ: pathPoint.rotateZ ?? 0,
            scale: pathPoint.scale ?? 1,
            z: pathPoint.z ?? 0,
          });
        },
      });

      segmentTimeline.to(logoRef.current, {
        duration: stickyThreshold,
        ease: 'none',
        onUpdate: function () {
          const positions = positionsRef.current;
          const nextPos = positions[index + 1];

          if (logoRef.current && nextPos) {
            gsap.set(logoRef.current, {
              x: nextPos.x,
              y: nextPos.y - window.scrollY - 64,
              width: nextPos.w,
              height: nextPos.h,
            });
          }
        },
      });

      timeline.add(segmentTimeline, index);
    });

    scrollTriggersRef.current = ScrollTrigger.getAll();

    const handleResize = () => {
      positionsRef.current = getPositions();
      GSAPUtils.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      GSAPUtils.cleanup(scrollTriggersRef.current);
      timelineRef.current?.kill();
    };
  }, [logoRef]);

  return {
    timeline: timelineRef.current,
    positions: positionsRef.current,
  };
}
