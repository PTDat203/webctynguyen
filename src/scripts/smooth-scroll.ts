// ===== Cuộn mượt (smooth scroll) kiểu các trang scroll-oriented hiện đại =====
// Dùng Lenis (cuộn quán tính nhẹ) đồng bộ với GSAP ScrollTrigger, tôn trọng
// prefers-reduced-motion và giữ cuộn chạm (touch) ở chế độ gốc cho mượt trên mobile.
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

// Khoảng đệm dưới header cố định để tiêu đề section không bị che.
function headerOffset(): number {
  const header = document.getElementById('site-header');
  return (header?.offsetHeight ?? 72) + 14;
}

function targetY(el: Element): number {
  return el.getBoundingClientRect().top + window.scrollY - headerOffset();
}

export function scrollToHash(hash: string): void {
  if (!hash || hash.length <= 1) return;
  const el = document.querySelector(hash);
  if (!el) return;
  const y = targetY(el);
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }
  if (history.replaceState) {
    try {
      history.replaceState(null, '', hash);
    } catch {
      /* bỏ qua */
    }
  }
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { duration: 1 });
  else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

function initLenis(): void {
  if (reduced) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Giữ cuộn chạm ở chế độ gốc — mượt & ổn định hơn trên thiết bị di động.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Cho các module khác (nút back-to-top, dot nav, menu mobile) dùng chung phiên Lenis.
  const w = window as typeof window & {
    __ibsScrollToTop?: () => void;
    __ibsScrollToHash?: (h: string) => void;
    __ibsScrollLock?: (locked: boolean) => void;
    __ibsScrollToY?: (y: number) => void;
  };
  w.__ibsScrollToTop = scrollToTop;
  w.__ibsScrollToHash = scrollToHash;
  // Khoá/mở cuộn nền khi mở menu hoặc modal trên thiết bị di động.
  w.__ibsScrollLock = (locked: boolean) => {
    if (locked) lenis?.stop();
    else lenis?.start();
  };
  // Cuộn mượt tới một vị trí Y bất kỳ (dùng cho dot nav của slider dự án).
  w.__ibsScrollToY = (y: number) => {
    if (lenis) lenis.scrollTo(y, { duration: 1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  };
}

// Chặn click các liên kết neo (#...) để cuộn mượt có offset header chuẩn.
function initAnchorLinks(): void {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href') || '';
    if (hash.length <= 1) return;
    const el = document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    scrollToHash(hash);
  });
}

function boot(): void {
  initLenis();
  initAnchorLinks();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
