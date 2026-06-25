import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initProjects() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
  const empty = document.getElementById('project-empty');
  const filterBar = document.querySelector('[data-project-filters]');
  if (!buttons.length || !cards.length) return;

  let activeBtn = buttons[0];

  const setActiveStyles = (btn: HTMLButtonElement) => {
    buttons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('bg-gold', active);
      b.classList.toggle('text-navy', active);
      b.classList.toggle('border-gold', active);
      b.classList.toggle('text-slate', !active);
      b.classList.toggle('border-mist', !active);
      b.classList.toggle('is-filter-active', active);
    });
  };

  const matches = (c: HTMLElement, filter: string) =>
    filter === 'all' || c.dataset.category === filter;

  const animateFilter = (filter: string) => {
    const toHide = cards.filter((c) => {
      const show = matches(c, filter);
      return !show && !c.classList.contains('hidden');
    });
    const toShow = cards.filter((c) => {
      const show = matches(c, filter);
      return show && c.classList.contains('hidden');
    });

    if (reduced()) {
      cards.forEach((c) => {
        const show = matches(c, filter);
        c.classList.toggle('hidden', !show);
        gsap.set(c, { autoAlpha: 1, scale: 1 });
      });
      const visible = cards.filter((c) => !c.classList.contains('hidden')).length;
      empty?.classList.toggle('hidden', visible !== 0);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    if (toHide.length) {
      tl.to(toHide, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.25,
        stagger: 0.04,
        onComplete: () => {
          toHide.forEach((c) => c.classList.add('hidden'));
          gsap.set(toHide, { clearProps: 'all' });
        },
      });
    }

    toShow.forEach((c) => c.classList.remove('hidden'));
    if (toShow.length) {
      gsap.set(toShow, { autoAlpha: 0, scale: 0.92 });
      tl.to(
        toShow,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power3.out',
        },
        toHide.length ? '>-0.05' : 0
      );
    }

    const visible = cards.filter((c) => matches(c, filter)).length;
    empty?.classList.toggle('hidden', visible !== 0);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn === activeBtn) return;
      activeBtn = btn;
      setActiveStyles(btn);

      if (filterBar && !reduced()) {
        const pill = filterBar.querySelector<HTMLElement>('[data-filter-pill]');
        if (pill) {
          const rect = btn.getBoundingClientRect();
          const barRect = filterBar.getBoundingClientRect();
          gsap.to(pill, {
            x: rect.left - barRect.left,
            width: rect.width,
            height: rect.height,
            duration: 0.35,
            ease: 'power3.out',
          });
        }
      }

      animateFilter(btn.dataset.filter || 'all');
    });
  });

  const lb = document.getElementById('lightbox');
  const lbPanel = lb?.querySelector<HTMLElement>('[data-lb-panel]');
  const lbMedia = document.getElementById('lb-media');
  const lbCat = document.getElementById('lb-cat');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbClose = document.getElementById('lb-close');
  let lbOpen = false;

  const openLb = (c: HTMLElement) => {
    if (!lb || !lbPanel) return;

    const lang = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'vi';
    const pick = (name: string) =>
      c.getAttribute(`data-${name}-${lang}`) || c.getAttribute(`data-${name}-vi`) || '';
    if (lbCat) lbCat.textContent = pick('cat');
    if (lbTitle) lbTitle.textContent = pick('title');
    if (lbDesc) lbDesc.textContent = pick('desc');
    const cardImg = c.querySelector('img');
    const src = cardImg ? cardImg.currentSrc || cardImg.src : '';
    if (lbMedia) {
      lbMedia.innerHTML = src ? `<img src="${src}" alt="" class="h-full w-full object-cover" />` : '';
    }

    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';
    lbOpen = true;

    if (reduced()) return;

    gsap.set(lb, { autoAlpha: 0 });
    gsap.set(lbPanel, { scale: 0.85, autoAlpha: 0 });
    gsap.to(lb, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(lbPanel, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'power2.out', delay: 0.05 });
  };

  const closeLb = () => {
    if (!lb || !lbPanel || !lbOpen) return;

    if (reduced()) {
      lb.classList.add('hidden');
      lb.classList.remove('flex');
      document.body.style.overflow = '';
      lbOpen = false;
      return;
    }

    gsap.to(lbPanel, { scale: 0.9, autoAlpha: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(lb, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
      delay: 0.05,
      onComplete: () => {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
        document.body.style.overflow = '';
        lbOpen = false;
      },
    });
  };

  cards.forEach((c) => c.addEventListener('click', () => openLb(c)));
  lbClose?.addEventListener('click', closeLb);
  lb?.addEventListener('click', (e) => {
    if (e.target === lb) closeLb();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });

  if (filterBar && !reduced()) {
    const pill = filterBar.querySelector<HTMLElement>('[data-filter-pill]');
    const first = buttons[0];
    if (pill && first) {
      const syncPill = () => {
        const rect = first.getBoundingClientRect();
        const barRect = filterBar.getBoundingClientRect();
        gsap.set(pill, {
          x: rect.left - barRect.left,
          width: rect.width,
          height: rect.height,
          opacity: 1,
        });
        pill.classList.add('is-ready');
      };
      syncPill();
      filterBar.classList.add('pill-ready');
      window.addEventListener('resize', syncPill, { passive: true });
    }
  }

  if (!reduced()) {
    gsap.from(cards, {
      autoAlpha: 0,
      y: 40,
      scale: 0.96,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: document.getElementById('project-grid'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
}
