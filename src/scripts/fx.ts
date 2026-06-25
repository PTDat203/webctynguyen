// ===== Lớp hiệu ứng tương tác cao cấp (FX) =====
// Port từ landing-page demo nhưng đổi sang bảng màu thương hiệu IBS (navy + sky + gold).
// Tất cả đều vanilla, tôn trọng prefers-reduced-motion, và chỉ bật hiệu ứng nặng
// (con trỏ tùy biến, nam châm, nghiêng 3D) trên thiết bị có con trỏ chính xác (chuột).

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const LOADER_MINIMUM_MS = 1500;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener(
  'mousemove',
  (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  },
  { passive: true }
);

// ---- Con trỏ tùy biến + vùng sáng spotlight (gộp 1 vòng RAF cho mượt) ----
function initCursor() {
  if (!finePointer || reduced) return;
  const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
  const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');
  const glow = document.querySelector<HTMLElement>('[data-cursor-glow]');
  if (!dot || !ring) return;

  document.body.classList.add('has-custom-cursor');

  let isHovering = false;
  const interactive = 'a, button, [data-tilt], [data-magnetic], input, textarea, select, label';
  document.querySelectorAll(interactive).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      document.body.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      isHovering = false;
      document.body.classList.remove('is-hovering');
    });
  });

  // Đo vị trí các section spotlight theo toạ độ tài liệu — KHÔNG đọc lại layout mỗi khung hình.
  const spots = [...document.querySelectorAll<HTMLElement>('[data-spotlight]')];
  let metrics: { left: number; top: number; w: number; h: number }[] = [];
  const measure = () => {
    const sx = window.scrollX;
    const sy = window.scrollY;
    metrics = spots.map((s) => {
      const r = s.getBoundingClientRect();
      return { left: r.left + sx, top: r.top + sy, w: r.width, h: r.height };
    });
  };
  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  window.setTimeout(measure, 1500);

  // Làm mượt độc lập tốc độ màn hình (60/120/144Hz đều cho cảm giác như nhau).
  const smooth = (cur: number, target: number, factor: number, dt: number) =>
    cur + (target - cur) * (1 - Math.pow(1 - factor, dt * 60));

  let dx = mouseX;
  let dy = mouseY;
  let rx = mouseX;
  let ry = mouseY;
  let gx = mouseX;
  let gy = mouseY;
  let scale = 1;
  let last = performance.now();

  const loop = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    // Chấm bám sát con trỏ (chính xác), vòng & quầng sáng đuổi theo mượt mà.
    dx = smooth(dx, mouseX, 0.5, dt);
    dy = smooth(dy, mouseY, 0.5, dt);
    rx = smooth(rx, mouseX, 0.2, dt);
    ry = smooth(ry, mouseY, 0.2, dt);
    gx = smooth(gx, mouseX, 0.12, dt);
    gy = smooth(gy, mouseY, 0.12, dt);
    scale = smooth(scale, isHovering ? 1.7 : 1, 0.18, dt);

    dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    if (glow) glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;

    // Spotlight: chỉ cập nhật section đang chứa con trỏ → tránh repaint thừa.
    const vx = window.scrollX;
    const vy = window.scrollY;
    for (let i = 0; i < spots.length; i += 1) {
      const m = metrics[i];
      if (!m) continue;
      const topVp = m.top - vy;
      const leftVp = m.left - vx;
      if (mouseY < topVp || mouseY > topVp + m.h) continue;
      if (mouseX < leftVp || mouseX > leftVp + m.w) continue;
      spots[i].style.setProperty('--mx', `${(mouseX - leftVp).toFixed(1)}px`);
      spots[i].style.setProperty('--my', `${(mouseY - topVp).toFixed(1)}px`);
    }

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// ---- Nút nam châm (hút nhẹ, vừa phải — có giới hạn dịch chuyển) ----
function initMagnetic() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '') || 0.15;
    const max = 12; // px — không cho dịch quá nhiều
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      const cx = Math.max(-max, Math.min(max, x));
      const cy = Math.max(-max, Math.min(max, y));
      el.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ---- Gợn sóng khi click ----
function initRipple() {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-ripple]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const r = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'fx-ripple';
      ripple.style.left = `${e.clientX - r.left}px`;
      ripple.style.top = `${e.clientY - r.top}px`;
      el.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    });
  });
}

// ---- Nghiêng 3D theo con trỏ ----
function initTilt() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotateX = (y / r.height - 0.5) * -6;
      const rotateY = (x / r.width - 0.5) * 6;
      card.style.setProperty('--tilt-x', `${x}px`);
      card.style.setProperty('--tilt-y', `${y}px`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


// ---- Lưới điểm "blueprint" trong các section nền tối ----
type FxNode = { x: number; y: number; vx: number; vy: number; r: number };
interface FxField {
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nodes: FxNode[];
  w: number;
  h: number;
}

function initBlueprint() {
  if (reduced) return;
  const hosts = [...document.querySelectorAll<HTMLElement>('[data-blueprint]')];
  if (!hosts.length) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const fields: FxField[] = [];

  hosts.forEach((host) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'fx-blueprint';
    canvas.setAttribute('aria-hidden', 'true');
    host.prepend(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    fields.push({ host, canvas, ctx, nodes: [], w: 0, h: 0 });
  });

  const size = (f: FxField) => {
    f.w = f.host.clientWidth;
    f.h = f.host.clientHeight;
    f.canvas.width = f.w * ratio;
    f.canvas.height = f.h * ratio;
    f.canvas.style.width = `${f.w}px`;
    f.canvas.style.height = `${f.h}px`;
    f.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(14, Math.min(38, Math.floor((f.w * f.h) / 26000)));
    f.nodes = Array.from({ length: count }, () => ({
      x: Math.random() * f.w,
      y: Math.random() * f.h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.8,
    }));
  };

  fields.forEach(size);
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => fields.forEach(size), 180);
  });

  const draw = () => {
    for (const f of fields) {
      const rect = f.host.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) continue;

      const { ctx, w, h, nodes } = f;
      const localMx = mouseX - rect.left;
      const localMy = mouseY - rect.top;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            ctx.strokeStyle = `rgba(128, 187, 223, ${0.16 - d / 1500})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const md = Math.hypot(n.x - localMx, n.y - localMy);
        const lift = Math.max(0, 1 - md / 200);
        ctx.fillStyle =
          lift > 0 ? `rgba(255, 212, 90, ${0.32 + lift * 0.52})` : 'rgba(128, 187, 223, 0.32)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + lift * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}

// ---- Màn hình chờ (page loader) ----
function initLoader() {
  const loader = document.querySelector<HTMLElement>('[data-loader]');
  if (!loader) {
    document.body.classList.remove('is-loading');
    return;
  }

  const bar = loader.querySelector<HTMLElement>('[data-loader-bar]');
  if (bar) requestAnimationFrame(() => (bar.style.transform = 'scaleX(0.65)'));

  const ready =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((res) => window.addEventListener('load', () => res(), { once: true }));
  const minDelay = new Promise<void>((res) => window.setTimeout(res, LOADER_MINIMUM_MS));

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (bar) bar.style.transform = 'scaleX(1)';
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    window.setTimeout(() => loader.remove(), 600);
  };

  Promise.all([ready, minDelay]).then(finish);
  window.setTimeout(finish, 4500); // an toàn: không bao giờ kẹt loader
}

// ---- Vùng sáng vàng bám theo con trỏ (thay cho hiệu ứng trượt trái→phải) ----
function initGoldGlow() {
  if (reduced || !finePointer) return;
  const sel =
    '.text-gold-metallic, .hero-highlight, .bg-gold-metallic, .bg-gold-metallic-h, .bg-gold, .eyebrow, .btn-primary, .gold-line-metallic';
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    el.addEventListener(
      'mousemove',
      (e) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty('--gx', `${x.toFixed(1)}%`);
        el.style.setProperty('--gy', `${y.toFixed(1)}%`);
      },
      { passive: true }
    );
  });
}

function boot() {
  initLoader();
  initCursor();
  initMagnetic();
  initRipple();
  initTilt();
  initGoldGlow();
  initBlueprint();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
