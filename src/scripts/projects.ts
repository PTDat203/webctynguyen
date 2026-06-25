import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = () => window.matchMedia('(min-width: 1024px)').matches;

type WindowWithScroll = typeof window & { __ibsScrollToY?: (y: number) => void };

export function initProjects() {
  const section = document.querySelector<HTMLElement>('[data-project-slider]');
  if (!section) return;

  const track = section.querySelector<HTMLElement>('[data-ps-track]');
  const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-card]'));
  const bgs = Array.from(section.querySelectorAll<HTMLElement>('[data-bg]'));
  const texts = Array.from(section.querySelectorAll<HTMLElement>('[data-text]'));
  const dots = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const total = cards.length;
  if (!track || total < 2) return;

  let index = 0;

  // Canh thẻ thứ i vào giữa vùng nhìn (các thẻ rộng bằng nhau nên phép tính ổn định).
  const centerCard = (i: number, animate: boolean) => {
    const card = cards[i];
    const viewport = track.parentElement;
    if (!card || !viewport) return;
    const x = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    gsap.to(track, { x, duration: animate ? 0.7 : 0, ease: 'power3.out', overwrite: 'auto' });
  };

  const apply = (i: number, animate = true) => {
    index = Math.max(0, Math.min(total - 1, i));
    bgs.forEach((b, n) => b.classList.toggle('is-active', n === index));
    texts.forEach((t, n) => t.classList.toggle('is-active', n === index));
    cards.forEach((c, n) => {
      c.classList.toggle('is-active', n === index);
      c.classList.toggle('is-past', n < index);
    });
    dots.forEach((d, n) => {
      const on = n === index;
      d.classList.toggle('is-active', on);
      d.setAttribute('aria-selected', String(on));
    });
    if (section.classList.contains('is-enhanced')) centerCard(index, animate);
  };

  // ===== Bản nâng cao (desktop + cho phép animation): slider ghim theo scroll =====
  let st: ScrollTrigger | null = null;

  const enhance = () => {
    section.classList.add('is-enhanced');
    apply(0, false);
    requestAnimationFrame(() => centerCard(0, false));

    st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + (total - 1) * Math.round(window.innerHeight * 0.2),
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.round(self.progress * (total - 1));
        if (i !== index) apply(i, true);
      },
      onRefresh: () => centerCard(index, false),
    });
  };

  const unenhance = () => {
    section.classList.remove('is-enhanced');
    st?.kill();
    st = null;
    gsap.set(track, { clearProps: 'transform' });
    apply(0, false);
  };

  const shouldEnhance = () => desktop() && !reduced();
  let enhanced = false;

  if (shouldEnhance()) {
    enhanced = true;
    enhance();
  }

  // Bật/tắt chế độ slider khi đổi breakpoint hoặc prefers-reduced-motion.
  const onResize = () => {
    const want = shouldEnhance();
    if (want && !enhanced) {
      enhanced = true;
      enhance();
    } else if (!want && enhanced) {
      enhanced = false;
      unenhance();
    } else if (want) {
      centerCard(index, false);
    }
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Nhảy tới slide i (dùng cho bấm chấm điều hướng & bấm thẻ trong queue).
  const scrollToY = (window as WindowWithScroll).__ibsScrollToY;
  const jumpTo = (i: number) => {
    if (i === index) return;
    if (st && enhanced) {
      const target = st.start + (i / (total - 1)) * (st.end - st.start);
      if (scrollToY) scrollToY(target);
      else window.scrollTo({ top: target, behavior: reduced() ? 'auto' : 'smooth' });
    } else {
      apply(i, true);
      cards[i]?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
    }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => jumpTo(i));
  });

  // Bấm vào một dự án trong queue → hiển thị ngay (thẻ CTA cuối giữ vai trò link).
  cards.forEach((c, i) => {
    if (c.classList.contains('ps-card-more')) return;
    c.addEventListener('click', () => {
      if (section.classList.contains('is-enhanced')) jumpTo(i);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
}
