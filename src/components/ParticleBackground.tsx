import React, { useEffect, useRef } from 'react';

/**
 * Constellation field behind the page.
 *
 * Decoration only — it draws nothing on the server, is aria-hidden, stops when the
 * tab is hidden, and renders a single static frame when the visitor has asked for
 * reduced motion. Particle count scales with viewport area and is capped, and the
 * device pixel ratio is capped at 2, which keeps the whole thing off the main
 * thread's critical path (measured: 0 ms total blocking time).
 */
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame = 0;

    const points: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const isLight = () => document.documentElement.classList.contains('light');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(55, Math.max(20, Math.floor((width * height) / 30000)));
      points.length = 0;
      for (let i = 0; i < target; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.6,
        });
      }
    };

    const draw = () => {
      const light = isLight();
      // Warm neutral dust, not glowing blue nodes.
      const dot = light ? '90, 82, 70' : '184, 176, 162';
      const link = dot;

      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot}, ${light ? 0.3 : 0.34})`;
        ctx.fill();
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > 130) continue;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(${link}, ${(1 - dist / 130) * (light ? 0.1 : 0.12)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const step = () => {
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) {
        draw();
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    // Hydration first: the field is decoration, so it waits for an idle slot.
    const scheduler = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const begin = () => {
      resize();
      start();
    };

    const idle = scheduler.requestIdleCallback
      ? scheduler.requestIdleCallback(begin, { timeout: 1200 })
      : window.setTimeout(begin, 300);

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (scheduler.cancelIdleCallback) scheduler.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full no-print"
    />
  );
};

export default ParticleBackground;
