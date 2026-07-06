import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `aulirex-header-tab inline-flex min-h-10 flex-none items-center justify-center rounded-md px-2.5 py-2 text-xs font-semibold transition-all duration-200 sm:px-3 sm:text-sm ${
    isActive ? 'aulirex-header-tab--active' : 'text-slate-300'
  }`;

interface EcgSample {
  time: number;
  value: number;
}

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const showBloodiedCursor = () => {
      document.documentElement.classList.add('scalpel-clicked');
    };

    const hideBloodiedCursor = () => {
      document.documentElement.classList.remove('scalpel-clicked');
    };

    window.addEventListener('pointerdown', showBloodiedCursor);
    window.addEventListener('pointerup', hideBloodiedCursor);
    window.addEventListener('pointercancel', hideBloodiedCursor);
    window.addEventListener('blur', hideBloodiedCursor);

    return () => {
      window.removeEventListener('pointerdown', showBloodiedCursor);
      window.removeEventListener('pointerup', hideBloodiedCursor);
      window.removeEventListener('pointercancel', hideBloodiedCursor);
      window.removeEventListener('blur', hideBloodiedCursor);
      hideBloodiedCursor();
    };
  }, []);
  useEffect(() => {
    const interactiveSelector = [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
      'input[type="reset"]',
      'select',
      'label',
    ].join(',');

    const hoverSound = new Audio('/audio/hover.mp3');
    const selectSound = new Audio('/audio/ps2-select-sound.mp3');
    hoverSound.preload = 'auto';
    selectSound.preload = 'auto';
    hoverSound.volume = 0.28;
    selectSound.volume = 0.42;

    const interactiveFrom = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest(interactiveSelector);
    };

    const isDisabled = (element: Element) =>
      element.matches(':disabled, [aria-disabled="true"]') ||
      element.closest(':disabled, [aria-disabled="true"]') !== null;

    const playSound = (sound: HTMLAudioElement) => {
      sound.pause();
      sound.currentTime = 0;
      void sound.play().catch(() => undefined);
    };

    const playHoverSound = (event: PointerEvent) => {
      const control = interactiveFrom(event.target);
      if (!control || isDisabled(control)) return;

      const previousControl = interactiveFrom(event.relatedTarget);
      if (previousControl === control) return;

      playSound(hoverSound);
    };

    const playFocusSound = (event: FocusEvent) => {
      const control = interactiveFrom(event.target);
      if (!control || isDisabled(control)) return;
      playSound(hoverSound);
    };

    const playSelectSound = (event: PointerEvent) => {
      const control = interactiveFrom(event.target);
      if (!control || isDisabled(control)) return;
      playSound(selectSound);
    };

    const playKeyboardSelectSound = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const control = interactiveFrom(event.target);
      if (!control || isDisabled(control)) return;
      playSound(selectSound);
    };

    document.addEventListener('pointerover', playHoverSound);
    document.addEventListener('focusin', playFocusSound);
    document.addEventListener('pointerdown', playSelectSound);
    document.addEventListener('keydown', playKeyboardSelectSound);

    return () => {
      document.removeEventListener('pointerover', playHoverSound);
      document.removeEventListener('focusin', playFocusSound);
      document.removeEventListener('pointerdown', playSelectSound);
      document.removeEventListener('keydown', playKeyboardSelectSound);
      hoverSound.pause();
      selectSound.pause();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <CustomScalpelCursor />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.22),transparent_58%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/78 px-3 py-2 backdrop-blur-xl sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 md:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none md:shrink-0">
            <img
              src="/brand/aulirex-mark.png"
              alt="Aulirex"
              className="size-10 rounded-full object-contain shadow-[0_0_22px_rgba(34,211,238,0.32)] sm:size-12"
            />
            <div className="min-w-0">
              <img
                src="/brand/aulirex-wordmark.png?v=corrected-20260703"
                alt="Aulirex"
                className="h-6 w-auto max-w-[8.25rem] object-contain drop-shadow-[0_0_10px_rgba(125,211,252,0.35)] sm:h-8 sm:max-w-[10.5rem]"
              />
              <span className="hidden text-xs font-medium text-slate-400 sm:block">
                Entrenamiento para Medicina
              </span>
            </div>
          </div>

          <EcgHeaderMonitor />

          <nav aria-label="Navegacion principal" className="order-3 flex w-full min-w-0 overflow-x-auto overscroll-x-contain whitespace-nowrap rounded-lg border border-white/10 bg-black/24 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [scrollbar-width:none] lg:order-none lg:ml-auto lg:w-auto lg:max-w-[34rem] lg:shrink-0">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/practica" className={linkClass}>
              Practica
            </NavLink>
            <NavLink to="/repaso" className={linkClass}>
              Repaso
            </NavLink>
            <NavLink to="/errores" className={linkClass}>
              Errores
            </NavLink>
            <NavLink to="/formulario" className={linkClass}>
              Formulas
            </NavLink>
            <NavLink to="/moleculas" className={linkClass}>
              Moleculas
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

function CustomScalpelCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'scalpel-cursor-overlay';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<img class="scalpel-cursor-image scalpel-cursor-image-clean" src="/cursors/bisturi-cursor.png" alt="" draggable="false" /><img class="scalpel-cursor-image scalpel-cursor-image-blood" src="/cursors/bisturi-cursor-blood.png" alt="" draggable="false" />';
    document.body.append(cursor);

    let animationFrame = 0;
    let latestX = -80;
    let latestY = -80;

    const moveCursor = () => {
      animationFrame = 0;
      cursor.style.transform = `translate3d(${latestX - 3}px, ${latestY - 4}px, 0)`;
    };

    const scheduleMove = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(moveCursor);
    };

    const forceNativeCursorOff = () => {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
    };

    const showCursor = (event: PointerEvent | MouseEvent) => {
      if ('pointerType' in event && event.pointerType === 'touch') return;
      forceNativeCursorOff();
      latestX = event.clientX;
      latestY = event.clientY;
      cursor.classList.add('is-visible');
      scheduleMove();
    };

    const hideCursor = () => {
      cursor.classList.remove('is-visible');
      forceNativeCursorOff();
    };

    forceNativeCursorOff();
    window.addEventListener('pointermove', showCursor, { passive: true });
    window.addEventListener('pointerdown', showCursor, { passive: true });
    window.addEventListener('pointerenter', showCursor, { passive: true });
    window.addEventListener('mousemove', showCursor, { passive: true });
    window.addEventListener('mouseover', showCursor, { passive: true });
    window.addEventListener('mouseenter', showCursor, { passive: true });
    window.addEventListener('dragover', showCursor, { passive: true });
    window.addEventListener('blur', hideCursor);

    return () => {
      window.removeEventListener('pointermove', showCursor);
      window.removeEventListener('pointerdown', showCursor);
      window.removeEventListener('pointerenter', showCursor);
      window.removeEventListener('mousemove', showCursor);
      window.removeEventListener('mouseover', showCursor);
      window.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('dragover', showCursor);
      window.removeEventListener('blur', hideCursor);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
      cursor.remove();
    };
  }, []);

  return null;
}
function EcgHeaderMonitor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;

    const canvas: HTMLCanvasElement = canvasNode;
    const drawingContext = canvas.getContext('2d');
    if (!drawingContext) return;

    const ctx: CanvasRenderingContext2D = drawingContext;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const samples: EcgSample[] = [];
    let rPeaks: number[] = [];
    let animationFrame = 0;
    let currentTime = 0;
    let lastTimestamp = 0;
    let lastSampleTime = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;

    const visibleSeconds = 5.4;
    const sampleRate = 420;
    const sampleStep = 1 / sampleRate;
    const baseline = 0.56;
    const baseRr = 60 / 72;

    const gaussian = (x: number, center: number, spread: number, amount: number) =>
      amount * Math.exp(-((x - center) ** 2) / (2 * spread ** 2));

    function rrForBeat(index: number) {
      return baseRr * (1 + 0.035 * Math.sin(index * 1.73) + 0.018 * Math.sin(index * 0.47));
    }

    function seedRhythm(start: number, end: number) {
      rPeaks = [];
      let beatIndex = Math.floor(start / baseRr) - 2;
      let peakTime = beatIndex * baseRr + 0.38;

      while (peakTime < end) {
        if (peakTime > start - 1) rPeaks.push(peakTime);
        peakTime += rrForBeat(beatIndex);
        beatIndex += 1;
      }
    }

    function ensureRhythm(until: number) {
      if (rPeaks.length === 0) {
        seedRhythm(currentTime - visibleSeconds - 1, until + 1.4);
        return;
      }

      let beatIndex = Math.round(rPeaks.length + currentTime / baseRr);
      let nextPeak = rPeaks[rPeaks.length - 1] + rrForBeat(beatIndex);
      while (nextPeak < until + 1.4) {
        rPeaks.push(nextPeak);
        beatIndex += 1;
        nextPeak += rrForBeat(beatIndex);
      }

      const oldestVisible = currentTime - visibleSeconds - 1;
      while (rPeaks.length > 0 && rPeaks[0] < oldestVisible) {
        rPeaks.shift();
      }
    }

    function ecgValueAt(time: number) {
      let value =
        0.018 * Math.sin(Math.PI * 2 * 0.23 * time) +
        0.006 * Math.sin(Math.PI * 2 * 0.08 * time) +
        0.0025 * Math.sin(Math.PI * 2 * 38 * time);

      for (const peak of rPeaks) {
        const rel = time - peak;
        if (rel < -0.34 || rel > 0.62) continue;

        value += gaussian(rel, -0.21, 0.045, 0.12); // P
        value += gaussian(rel, -0.035, 0.012, -0.28); // Q
        value += gaussian(rel, 0, 0.009, 1.42); // R
        value += gaussian(rel, 0.028, 0.014, -0.58); // S
        value += gaussian(rel, 0.075, 0.055, 0.025); // ST lift
        value += gaussian(rel, 0.29, 0.09, 0.3); // T
      }

      return value;
    }

    function configureCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetSignal();
      drawMonitor();
    }

    function resetSignal() {
      currentTime = visibleSeconds;
      lastSampleTime = currentTime - visibleSeconds;
      samples.length = 0;
      seedRhythm(lastSampleTime - 1, currentTime + 1.4);
      while (lastSampleTime <= currentTime) {
        samples.push({ time: lastSampleTime, value: ecgValueAt(lastSampleTime) });
        lastSampleTime += sampleStep;
      }
    }

    function updateSignal(elapsed: number) {
      currentTime += elapsed;
      ensureRhythm(currentTime);

      while (lastSampleTime < currentTime) {
        samples.push({ time: lastSampleTime, value: ecgValueAt(lastSampleTime) });
        lastSampleTime += sampleStep;
      }

      const oldestVisible = currentTime - visibleSeconds - 0.08;
      while (samples.length > 0 && samples[0].time < oldestVisible) {
        samples.shift();
      }
    }

    function sampleToPoint(sample: EcgSample): [number, number] {
      const x = ((sample.time - (currentTime - visibleSeconds)) / visibleSeconds) * width;
      const y = height * baseline - sample.value * height * 0.34;
      return [x, Math.max(3, Math.min(height - 3, y))];
    }

    function drawTrace(
      visibleSamples: EcgSample[],
      stroke: string,
      lineWidth: number,
      alpha: number,
      shadowBlur = 0,
      shadowColor = 'transparent',
    ) {
      if (visibleSamples.length < 2) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = shadowBlur;
      ctx.shadowColor = shadowColor;
      ctx.beginPath();

      const [startX, startY] = sampleToPoint(visibleSamples[0]);
      ctx.moveTo(startX, startY);
      for (let i = 1; i < visibleSamples.length; i += 1) {
        const [x, y] = sampleToPoint(visibleSamples[i]);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.restore();
    }

    function drawHead() {
      const latest = samples[samples.length - 1];
      if (!latest) return;

      const [x, y] = sampleToPoint(latest);
      const sweep = ctx.createLinearGradient(width - 52, 0, width, 0);
      sweep.addColorStop(0, 'rgba(14, 165, 233, 0)');
      sweep.addColorStop(0.68, 'rgba(14, 165, 233, 0.1)');
      sweep.addColorStop(1, 'rgba(103, 232, 249, 0.3)');
      ctx.fillStyle = sweep;
      ctx.fillRect(width - 52, 0, 52, height);

      const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
      glow.addColorStop(0, 'rgba(240, 253, 255, 0.92)');
      glow.addColorStop(0.24, 'rgba(103, 232, 249, 0.68)');
      glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(236, 254, 255, 0.96)';
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMonitor() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const windowStart = currentTime - visibleSeconds;
      const visibleSamples = samples.filter(
        (sample) => sample.time >= windowStart && sample.time <= currentTime,
      );
      const recentSamples = visibleSamples.filter(
        (sample) => currentTime - sample.time <= 1.15,
      );

      ctx.fillStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.fillRect(0, height * baseline - 0.45, width, 0.9);

      drawTrace(visibleSamples, 'rgba(14, 165, 233, 0.22)', 7.5, 1, 10, 'rgba(14, 165, 233, 0.45)');
      drawTrace(visibleSamples, 'rgba(34, 211, 238, 0.5)', 3.2, 1, 7, 'rgba(34, 211, 238, 0.55)');
      drawTrace(visibleSamples, 'rgba(224, 252, 255, 0.76)', 1.15, 1);

      drawTrace(recentSamples, 'rgba(103, 232, 249, 0.62)', 5, 1, 14, 'rgba(14, 165, 233, 0.85)');
      drawTrace(recentSamples, 'rgba(240, 253, 255, 0.95)', 1.05, 1, 4, 'rgba(240, 253, 255, 0.75)');
      drawHead();
    }

    function tick(timestamp: number) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
      lastTimestamp = timestamp;

      updateSignal(elapsed);
      drawMonitor();
      animationFrame = window.requestAnimationFrame(tick);
    }

    configureCanvas();

    if (!reduceMotion.matches) {
      animationFrame = window.requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(() => configureCanvas());
    resizeObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="ecg-header-strip pointer-events-none mx-auto hidden h-11 min-w-40 flex-1 basis-[14rem] overflow-hidden xl:basis-[28rem] rounded-lg border border-sky-300/10 bg-slate-950/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] lg:block"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="ecg-monitor-canvas" />
    </div>
  );
}



