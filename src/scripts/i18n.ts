// Chuyển ngôn ngữ VN/EN tại chỗ — nhớ lựa chọn bằng localStorage, không tải lại trang.
type Lang = 'vi' | 'en';

const KEY = 'ibs-lang';
const ATTRS = ['placeholder', 'alt', 'aria-label'];

function getLang(): Lang {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'vi';
  } catch {
    return 'vi';
  }
}

function applyAttrs(lang: Lang) {
  ATTRS.forEach((attr) => {
    document.querySelectorAll<HTMLElement>(`[data-${attr}-vi]`).forEach((el) => {
      const val = el.getAttribute(`data-${attr}-${lang}`);
      if (val != null) el.setAttribute(attr, val);
    });
  });

  // <option> bên trong <select> không chứa được thẻ con → đổi textContent trực tiếp.
  document.querySelectorAll<HTMLOptionElement>('option[data-vi]').forEach((opt) => {
    const val = opt.getAttribute(`data-${lang}`);
    if (val != null) opt.textContent = val;
  });
}

function applyMeta(lang: Lang) {
  const root = document.documentElement;
  const title = root.getAttribute(`data-title-${lang}`);
  if (title) document.title = title;
  const desc = root.getAttribute(`data-desc-${lang}`);
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (desc && metaDesc) metaDesc.content = desc;
}

function apply(lang: Lang) {
  const root = document.documentElement;
  root.setAttribute('data-lang', lang);
  root.lang = lang;
  applyAttrs(lang);
  applyMeta(lang);
  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.langBtn === lang));
  });
}

function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* ignore */
  }
  apply(lang);
}

function init() {
  apply(getLang());
  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = (btn.dataset.langBtn as Lang) || 'vi';
      setLang(lang);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
