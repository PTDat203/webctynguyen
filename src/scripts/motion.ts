import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ST = { start: 'top 85%', toggleActions: 'play none none none' };

function showAll() {
  gsap.set(
    '.reveal, [data-animate], .hero-line-inner, .section-divider, .stat-underline, .icon-draw path, .icon-draw circle, .icon-draw rect',
    { autoAlpha: 1, x: 0, y: 0, scale: 1, clipPath: 'none', filter: 'none', clearProps: 'transform,clipPath,filter' }
  );
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

function initHero(reduced: boolean) {
  const section = document.getElementById('home');
  if (!section) return;

  const img = section.querySelector<HTMLElement>('[data-hero-image]');
  const kioskImage = section.querySelector<HTMLElement>('[data-hero-kiosk-image]');
  const overlay = section.querySelector<HTMLElement>('[data-hero-overlay]');
  const goldLine = section.querySelector<HTMLElement>('[data-hero-gold-line]');
  const tagline = section.querySelector<HTMLElement>('[data-hero-tagline]');
  const lines = section.querySelectorAll<HTMLElement>('.hero-line-inner');
  const subline = section.querySelector<HTMLElement>('[data-hero-subline]');
  const ctas = section.querySelectorAll<HTMLElement>('[data-hero-cta]');
  const chevron = section.querySelector<HTMLElement>('[data-hero-chevron]');
  const kioskDesktopQuery = window.matchMedia('(min-width: 1280px) and (hover: hover) and (pointer: fine)');
  const syncKioskVisibility = () => {
    if (!kioskImage) return;
    kioskImage.style.display = kioskDesktopQuery.matches ? 'block' : 'none';
  };

  syncKioskVisibility();
  kioskDesktopQuery.addEventListener('change', syncKioskVisibility);
  window.addEventListener('resize', syncKioskVisibility, { passive: true });

  if (reduced) {
    showAll();
    return;
  }

  gsap.set([goldLine, tagline, ...lines, subline, ...ctas, chevron], { autoAlpha: 0, y: 24 });
  if (goldLine) gsap.set(goldLine, { scaleX: 0, transformOrigin: 'left center' });
  if (img) gsap.set(img, { scale: 1.08 });
  if (kioskImage) gsap.set(kioskImage, { scale: 1.08 });
  if (overlay) gsap.set(overlay, { opacity: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (overlay) tl.to(overlay, { opacity: 0.55, duration: 0.8 }, 0);
  if (img) tl.to(img, { scale: 1, duration: 1.2 }, 0);
  if (kioskImage) tl.to(kioskImage, { scale: 1, duration: 1.2 }, 0);
  if (goldLine) tl.to(goldLine, { scaleX: 1, duration: 0.5 }, 0.3);
  if (tagline) tl.to(tagline, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.45);
  if (lines.length) tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.55);
  if (subline) tl.to(subline, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.2');
  if (ctas.length) tl.to(ctas, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.15');
  if (chevron) tl.to(chevron, { autoAlpha: 1, y: 0, duration: 0.45 }, 1.1);

  if (img) {
    const heroImages = kioskImage ? [img, kioskImage] : [img];

    gsap.to(heroImages, {
      scale: 1.06,
      duration: 25,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
    gsap.to(heroImages, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  if (chevron) {
    gsap.to(chevron, { y: 8, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 });
  }
}

function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      gsap.set(bar, { scaleX: self.progress });
    },
  });
}

function initHeader(reduced: boolean) {
  const header = document.getElementById('site-header');
  const inner = header?.querySelector<HTMLElement>('[data-header-inner]');
  const logo = header?.querySelector<HTMLElement>('[data-header-logo]');
  if (!header || !inner) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 80;
    header.classList.toggle('is-scrolled', scrolled);
    if (reduced) {
      header.classList.toggle('shadow-md', scrolled);
      return;
    }
    if (logo) {
      gsap.to(logo, {
        scale: scrolled ? 0.92 : 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initBackToTop(reduced: boolean) {
  const btt = document.getElementById('back-to-top');
  if (!btt) return;

  let visible = false;

  const toggle = () => {
    const show = window.scrollY > 400;
    if (show === visible) return;
    visible = show;

    if (reduced) {
      btt.classList.toggle('opacity-0', !show);
      btt.classList.toggle('translate-y-3', !show);
      btt.classList.toggle('pointer-events-none', !show);
      return;
    }

    gsap.to(btt, {
      autoAlpha: show ? 1 : 0,
      y: show ? 0 : 12,
      scale: show ? 1 : 0.85,
      duration: 0.35,
      ease: show ? 'back.out(1.4)' : 'power2.in',
      onStart: () => {
        btt.classList.toggle('pointer-events-none', !show);
      },
    });
  };

  gsap.set(btt, { autoAlpha: 0, y: 12, scale: 0.85 });
  btt.classList.add('pointer-events-none');
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });

  btt.addEventListener('click', () => {
    const toTop = (window as typeof window & { __ibsScrollToTop?: () => void }).__ibsScrollToTop;
    if (toTop) toTop();
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

function initRibbon(reduced: boolean) {
  const ribbon = document.querySelector('[data-ribbon]');
  if (!ribbon) return;

  const left = ribbon.querySelector<HTMLElement>('[data-ribbon-left]');
  const right = ribbon.querySelector<HTMLElement>('[data-ribbon-right]');
  const diamond = ribbon.querySelector<HTMLElement>('[data-ribbon-diamond]');

  if (reduced) {
    gsap.set([left, right, diamond], { autoAlpha: 1, x: 0, scale: 1 });
    return;
  }

  gsap.set(left, { autoAlpha: 0, x: -60 });
  gsap.set(right, { autoAlpha: 0, x: 60 });
  gsap.set(diamond, { autoAlpha: 0, scale: 0, rotation: 45 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: ribbon, start: 'top 90%', toggleActions: 'play none none none' },
    defaults: { ease: 'power3.out' },
  });

  tl.to(left, { autoAlpha: 1, x: 0, duration: 0.7 }, 0)
    .to(right, { autoAlpha: 1, x: 0, duration: 0.7 }, 0)
    .to(diamond, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.35);
}

function initSectionHeaders(reduced: boolean) {
  document.querySelectorAll<HTMLElement>('[data-section-header]').forEach((header) => {
    const overline = header.querySelector('.section-overline');
    const title = header.querySelector('.section-title');
    const divider = header.querySelector<HTMLElement>('.section-divider');
    const intro = header.querySelector('.section-intro');
    const parts = [overline, title, divider, intro].filter(Boolean);

    if (reduced) {
      gsap.set(parts, { autoAlpha: 1, y: 0 });
      if (divider) gsap.set(divider, { scaleX: 1 });
      return;
    }

    gsap.set(parts, { autoAlpha: 0, y: 20 });
    if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: 'center center' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: header, ...ST },
      defaults: { ease: 'power3.out' },
    });

    if (overline) tl.to(overline, { autoAlpha: 1, y: 0, duration: 0.5 });
    if (title) tl.to(title, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.25');
    if (divider) tl.to(divider, { autoAlpha: 1, scaleX: 1, duration: 0.45 }, '-=0.2');
    if (intro) tl.to(intro, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.15');
  });
}

function drawIcons(container: ParentNode) {
  container.querySelectorAll<SVGElement>('.icon-draw').forEach((svg) => {
    svg.querySelectorAll<SVGGeometryElement>('path, circle, rect').forEach((el) => {
      if (typeof el.getTotalLength !== 'function') return;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
  });
}

function animateIconDraw(container: ParentNode, reduced: boolean) {
  drawIcons(container);
  if (reduced) {
    container.querySelectorAll<SVGGeometryElement>('.icon-draw path, .icon-draw circle, .icon-draw rect').forEach((el) => {
      gsap.set(el, { strokeDashoffset: 0 });
    });
    return;
  }

  const paths = container.querySelectorAll<SVGGeometryElement>('.icon-draw path, .icon-draw circle, .icon-draw rect');
  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    stagger: 0.08,
    scrollTrigger: { trigger: container as Element, start: 'top 85%', toggleActions: 'play none none none' },
  });
}

function initAbout(reduced: boolean) {
  const section = document.getElementById('gioi-thieu');
  if (!section) return;

  const textCol = section.querySelector<HTMLElement>('[data-about-text]');
  const imageWrap = section.querySelector<HTMLElement>('[data-about-image]');
  const badge = section.querySelector<HTMLElement>('[data-about-badge]');
  const cards = section.querySelectorAll<HTMLElement>('[data-value-card]');

  if (reduced) {
    gsap.set([textCol, imageWrap, badge, ...cards], { autoAlpha: 1, x: 0, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
    animateIconDraw(section, true);
    return;
  }

  if (textCol) gsap.set(textCol, { autoAlpha: 0, x: -40 });
  if (imageWrap) gsap.set(imageWrap, { clipPath: 'inset(0% 100% 0% 0%)' });
  if (badge) gsap.set(badge, { autoAlpha: 0, scale: 0.8 });
  gsap.set(cards, { autoAlpha: 0, y: 40 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.querySelector('.grid') || section, start: 'top 80%', toggleActions: 'play none none none' },
    defaults: { ease: 'power3.out' },
  });

  if (textCol) tl.to(textCol, { autoAlpha: 1, x: 0, duration: 0.7 }, 0);
  if (imageWrap) tl.to(imageWrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, 0.1);
  if (badge) tl.to(badge, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.55);
  if (cards.length) tl.to(cards, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 }, 0.45);

  animateIconDraw(section, false);
}

function initStats(reduced: boolean) {
  const section = document.querySelector('[data-stats-bar]');
  if (!section) return;

  const items = section.querySelectorAll<HTMLElement>('[data-stat-item]');

  if (reduced) {
    items.forEach((item) => {
      const counter = item.querySelector<HTMLElement>('[data-counter]');
      const underline = item.querySelector<HTMLElement>('.stat-underline');
      if (counter) {
        const target = Number(counter.dataset.target || '0');
        const suffix = counter.dataset.suffix || '';
        counter.textContent = target.toLocaleString('vi-VN') + suffix;
      }
      if (underline) gsap.set(underline, { scaleX: 1 });
    });
    return;
  }

  items.forEach((item, i) => {
    const counter = item.querySelector<HTMLElement>('[data-counter]');
    const underline = item.querySelector<HTMLElement>('.stat-underline');
    if (!counter) return;

    gsap.set(item, { autoAlpha: 0, y: 30 });
    if (underline) gsap.set(underline, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(counter, { filter: 'blur(4px)' });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.55, delay: i * 0.12, ease: 'power3.out' });
        gsap.to(counter, { filter: 'blur(0px)', duration: 0.6, delay: i * 0.12 + 0.1 });

        const target = Number(counter.dataset.target || '0');
        const suffix = counter.dataset.suffix || '';
        const fmt = (n: number) => n.toLocaleString('vi-VN');

        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 1.4,
            delay: i * 0.12 + 0.15,
            ease: 'power2.out',
            onUpdate: function () {
              counter.textContent = fmt(Math.round(this.targets()[0].val)) + suffix;
            },
            onComplete: () => {
              if (underline) gsap.to(underline, { scaleX: 1, duration: 0.4, ease: 'power2.out' });
            },
          }
        );
      },
      once: true,
    });
  });
}

function initServices(reduced: boolean) {
  const section = document.getElementById('dich-vu');
  if (!section) return;

  const featured = section.querySelector<HTMLElement>('[data-service-featured]');
  const secondary = section.querySelectorAll<HTMLElement>('.service-secondary');

  if (reduced) {
    gsap.set([featured, ...secondary], { autoAlpha: 1, y: 0, scale: 1, filter: 'none' });
    return;
  }

  if (featured) {
    gsap.set(featured, { autoAlpha: 0, y: 48, scale: 0.98 });
    gsap.to(featured, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: featured, ...ST },
    });
    const icon = featured.querySelector<HTMLElement>('[data-service-icon]');
    if (icon) {
      gsap.from(icon, {
        scale: 0,
        duration: 0.55,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: featured, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }
  }

  gsap.set(secondary, { autoAlpha: 0, y: 36, scale: 0.98, filter: 'blur(2px)' });
  gsap.to(secondary, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: { trigger: secondary[0]?.parentElement || section, start: 'top 88%', toggleActions: 'play none none none' },
  });
}

function initWhyIbs(reduced: boolean) {
  const section = document.querySelector('[data-why-ibs]');
  if (!section) return;

  const items = section.querySelectorAll<HTMLElement>('[data-why-item]');

  items.forEach((item, i) => {
    const circle = item.querySelector<HTMLElement>('[data-why-circle]');
    const title = item.querySelector('[data-why-title]');
    const body = item.querySelector('[data-why-body]');

    if (reduced) {
      gsap.set([circle, title, body], { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(item, { autoAlpha: 0, y: 30 });
    gsap.set([title, body], { autoAlpha: 0, y: 16 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power3.out' });
        if (circle) {
          gsap.from(circle, { scale: 0.6, autoAlpha: 0, duration: 0.5, delay: i * 0.1 + 0.1, ease: 'back.out(1.5)' });
          animateIconDraw(circle, false);
        }
        gsap.to([title, body], {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          delay: i * 0.1 + 0.25,
          ease: 'power2.out',
        });
      },
      once: true,
    });
  });
}

function initContact(reduced: boolean) {
  const section = document.getElementById('lien-he');
  if (!section) return;

  const header = section.querySelector('[data-contact-header]');
  if (header) {
    const parts = header.querySelectorAll('p, h2');
    if (reduced) {
      gsap.set(parts, { autoAlpha: 1, y: 0 });
    } else {
      gsap.set(parts, { autoAlpha: 0, y: 24 });
      gsap.to(parts, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: header, ...ST },
      });
    }
  }

  const infoItems = section.querySelectorAll<HTMLElement>('[data-contact-info]');
  const map = section.querySelector<HTMLElement>('[data-contact-map]');
  const fields = section.querySelectorAll<HTMLElement>('[data-form-field]');

  if (reduced) {
    gsap.set([...infoItems, map, ...fields], { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  gsap.set(infoItems, { autoAlpha: 0, x: -24 });
  gsap.set(map, { autoAlpha: 0, scale: 0.98 });
  gsap.set(fields, { autoAlpha: 0, y: 20 });

  const infoCol = section.querySelector('[data-contact-info-col]');
  if (infoCol) {
    gsap.to(infoItems, {
      autoAlpha: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: infoCol, ...ST },
    });
    if (map) {
      gsap.to(map, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: map, start: 'top 88%', toggleActions: 'play none none none' },
      });
    }
  }

  const form = section.querySelector('[data-contact-form]');
  if (form) {
    gsap.to(fields, {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: form, ...ST },
    });
  }
}

function initGenericReveals(reduced: boolean) {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal:not([data-section-header]):not([data-about-text]):not([data-about-image]):not([data-value-card]):not([data-service-card]):not([data-why-item]):not([data-stat-item]):not([data-contact-header]):not([data-contact-info-col]):not([data-contact-form])');

  if (reduced) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  reveals.forEach((el) => {
    if (el.closest('[data-section-header]') || el.closest('#home')) return;
    gsap.set(el, { autoAlpha: 0, y: 24 });
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });
}

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.body.classList.add('motion-ready');

  if (reduced) {
    showAll();
    initScrollProgress();
    initHeader(true);
    initBackToTop(true);
    initStats(true);
    return;
  }

  initHero(false);
  initScrollProgress();
  initHeader(false);
  initBackToTop(false);
  initRibbon(false);
  initSectionHeaders(false);
  initAbout(false);
  initStats(false);
  initServices(false);
  initWhyIbs(false);
  initContact(false);
  initGenericReveals(false);

  ScrollTrigger.refresh();
}

function boot() {
  initMotion();
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
