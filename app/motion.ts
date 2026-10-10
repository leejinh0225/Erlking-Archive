/*
 * Page behaviour for the Crimson web rules: theme switch, mobile menu,
 * nav pill and section dot, scroll progress, reveal on scroll, grid light,
 * magnetic buttons, ambient and ember that follow the cursor, the
 * velocity marquee and the footer wordmark. Everything stays in the plane.
 */

type Follower = { el: HTMLElement; zone: HTMLElement | null; x: number; t: number };

export function setupMotion(): () => void {
  const root = document.documentElement;
  const motion = root.classList.contains('motion');
  const fine = root.classList.contains('fine');
  const $ = <T extends Element = HTMLElement>(s: string, c: Document | Element = document) => c.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string, c: Document | Element = document) =>
    Array.from(c.querySelectorAll<T>(s));
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const cleanups: Array<() => void> = [];
  const on = (t: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
    t.addEventListener(type, fn, opts);
    cleanups.push(() => t.removeEventListener(type, fn, opts));
  };

  /* ---------- theme ---------- */
  const themeBtn = $<HTMLButtonElement>('#themeBtn');
  const moon = $('#iconMoon');
  const sun = $('#iconSun');
  let firstSync = true;
  const isDark = () => {
    const t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  const sync = () => {
    const d = isDark();
    themeBtn?.setAttribute('aria-label', d ? '라이트 모드로 전환' : '다크 모드로 전환');
    moon?.toggleAttribute('hidden', d);
    sun?.toggleAttribute('hidden', !d);
    const ic = d ? sun : moon;
    if (!firstSync && motion && ic) {
      ic.classList.remove('pop');
      void ic.getBoundingClientRect();
      ic.classList.add('pop');
    }
    firstSync = false;
  };
  const toggleTheme = (e: Event) => {
    const next = isDark() ? 'light' : 'dark';
    const apply = () => {
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('erlking-theme', next);
      } catch {
        /* storage may be unavailable */
      }
      sync();
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (!motion || !doc.startViewTransition) {
      apply();
      return;
    }
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    try {
      const vt = doc.startViewTransition(apply);
      vt.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 760, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' },
          );
        })
        .catch(() => {});
    } catch {
      apply();
    }
  };
  if (themeBtn) on(themeBtn, 'click', toggleTheme);
  const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  schemeQuery.addEventListener('change', sync);
  cleanups.push(() => schemeQuery.removeEventListener('change', sync));
  sync();

  /* ---------- mobile menu ---------- */
  const mBtn = $<HTMLButtonElement>('#menuBtn');
  const mMenu = $('#mMenu');
  const setMenu = (open: boolean) => {
    if (!mBtn || !mMenu) return;
    mBtn.setAttribute('aria-expanded', String(open));
    mBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    mMenu.toggleAttribute('hidden', !open);
  };
  if (mBtn && mMenu) {
    on(mBtn, 'click', () => setMenu(mMenu.hasAttribute('hidden')));
    $$('a', mMenu).forEach((a) => on(a, 'click', () => setMenu(false)));
    on(window, 'resize', () => {
      if (innerWidth > 820) setMenu(false);
    });
    on(document, 'keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Escape' && !mMenu.hasAttribute('hidden')) {
        setMenu(false);
        mBtn.focus();
      }
    });
  }

  /* ---------- nav: hover pill, section dot, progress ---------- */
  const nav = $('.nav');
  const prog = $('.progress');
  const navWrap = $('.nav-links');
  const navLinks = $$<HTMLAnchorElement>('.nav-links a');
  const pill = $('.nav-pill');
  const dot = $('.nav-dot');
  navLinks.forEach((a) =>
    on(a, 'pointerenter', () => {
      if (!pill) return;
      pill.style.width = `${a.offsetWidth}px`;
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
      pill.classList.add('on');
    }),
  );
  if (navWrap) on(navWrap, 'pointerleave', () => pill?.classList.remove('on'));
  let active = -1;
  const setActive = (i: number) => {
    active = i;
    navLinks.forEach((a, j) => {
      if (j === i) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    if (!dot) return;
    if (i < 0) {
      dot.classList.remove('on');
      return;
    }
    const a = navLinks[i];
    dot.style.transform = `translateX(${a.offsetLeft + a.offsetWidth / 2 - 2}px)`;
    dot.classList.add('on');
  };
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href') || ''));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) setActive(sections.indexOf(en.target));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => {
    if (s) spy.observe(s);
  });
  const hero = $('.hero');
  if (hero) spy.observe(hero);
  cleanups.push(() => spy.disconnect());
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    if (prog) prog.style.transform = `scaleX(${p.toFixed(4)})`;
    nav?.classList.toggle('scrolled', scrollY > 8);
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();
  on(window, 'resize', () => {
    if (active >= 0) setActive(active);
  });
  void document.fonts?.ready.then(() => {
    if (active >= 0) setActive(active);
  });

  /* ---------- reveal on scroll ---------- */
  const mark = $('.mark');
  const mega = $('.mega');
  const footer = $('footer');
  const revealables = $$('[data-reveal], .closing, footer');
  const timers: number[] = [];
  cleanups.push(() => timers.forEach((t) => clearTimeout(t)));
  if (motion) {
    const rio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const t = en.target as HTMLElement;
          t.classList.add('in');
          rio.unobserve(t);
          if (t === footer) {
            timers.push(
              window.setTimeout(() => {
                t.classList.add('done');
                mega?.classList.add('open');
              }, 1400),
            );
          }
          if (t.hasAttribute('data-reveal')) {
            /* once revealed, hand the element back to its own hover transitions */
            const i = parseFloat(getComputedStyle(t).getPropertyValue('--i')) || 0;
            timers.push(
              window.setTimeout(
                () => {
                  t.removeAttribute('data-reveal');
                  t.classList.remove('in');
                },
                1000 + i * 70,
              ),
            );
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    revealables.forEach((el) => rio.observe(el));
    cleanups.push(() => rio.disconnect());
    on(window, 'beforeprint', () => revealables.forEach((el) => el.classList.add('in')));
    /* release the clip around the hero wordmark once its letters have risen */
    timers.push(window.setTimeout(() => mark?.classList.add('open'), 1500));
  } else {
    revealables.forEach((el) => el.classList.add('in', 'done'));
    mark?.classList.add('open');
    mega?.classList.add('open');
    return () => cleanups.forEach((fn) => fn());
  }

  /* ---------- pointer effects (mouse only) ---------- */
  if (fine) {
    $$('.grid').forEach((g) => {
      on(
        g,
        'pointermove',
        (ev) => {
          const e = ev as PointerEvent;
          const r = g.getBoundingClientRect();
          g.style.setProperty('--gx', `${e.clientX - r.left}px`);
          g.style.setProperty('--gy', `${e.clientY - r.top}px`);
          const c = (e.target as Element).closest<HTMLElement>('.cell');
          if (!c) return;
          const cr = c.getBoundingClientRect();
          c.style.setProperty('--mx', `${e.clientX - cr.left}px`);
          c.style.setProperty('--my', `${e.clientY - cr.top}px`);
        },
        { passive: true },
      );
    });

    const hamb = $('.hero .amb');
    if (hero && hamb) {
      on(
        hero,
        'pointermove',
        (ev) => {
          const e = ev as PointerEvent;
          const r = hero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          hamb.style.transform = `translate(${(x * 90).toFixed(1)}px,${(y * 60).toFixed(1)}px)`;
        },
        { passive: true },
      );
      on(hero, 'pointerleave', () => {
        hamb.style.transform = '';
      });
    }

    $$('[data-magnetic]').forEach((b) => {
      on(
        b,
        'pointermove',
        (ev) => {
          const e = ev as PointerEvent;
          const r = b.getBoundingClientRect();
          b.style.setProperty('--tx', `${((e.clientX - r.left - r.width / 2) * 0.14).toFixed(1)}px`);
          b.style.setProperty('--ty', `${((e.clientY - r.top - r.height / 2) * 0.2).toFixed(1)}px`);
        },
        { passive: true },
      );
      on(b, 'pointerleave', () => {
        b.style.setProperty('--tx', '0px');
        b.style.setProperty('--ty', '0px');
      });
    });
  }

  /* ember follows the pointer inside its zone */
  const followers: Follower[] = $$('[data-follow]').map((el) => ({
    el,
    zone: el.closest<HTMLElement>('[data-follow-zone]'),
    x: 0,
    t: 0,
  }));
  if (fine) {
    followers.forEach((f) => {
      const zone = f.zone;
      if (!zone) return;
      on(
        zone,
        'pointermove',
        (ev) => {
          const e = ev as PointerEvent;
          const r = zone.getBoundingClientRect();
          f.t = ((e.clientX - r.left) / r.width - 0.5) * r.width * 0.18;
        },
        { passive: true },
      );
      on(zone, 'pointerleave', () => {
        f.t = 0;
      });
    });
  }

  /* marquee: time + scroll velocity */
  const marquee = $('.marquee');
  const track = $('.mq-track');
  let mqOn = false;
  let mqHover = false;
  let mqX = 0;
  let skew = 0;
  let vel = 0;
  let lastY = scrollY;
  if (marquee) {
    const mio = new IntersectionObserver((entries) => {
      mqOn = entries[0].isIntersecting;
    });
    mio.observe(marquee);
    cleanups.push(() => mio.disconnect());
    on(marquee, 'pointerenter', () => {
      mqHover = true;
    });
    on(marquee, 'pointerleave', () => {
      mqHover = false;
    });
  }

  let last = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    const dt = Math.min(now - last, 50) / 16.667;
    last = now;
    const y = scrollY;
    const v = y - lastY;
    lastY = y;
    vel += (v - vel) * 0.2;
    followers.forEach((f) => {
      const d = f.t - f.x;
      if (Math.abs(d) > 0.1) {
        f.x += d * 0.05 * dt;
        f.el.style.transform = `translate3d(${f.x.toFixed(1)}px,0,0)`;
      }
    });
    if (mqOn && track) {
      const half = track.scrollWidth / 2;
      const sp = (mqHover ? 0.2 : 1) * (1 + Math.min(Math.abs(vel) * 0.15, 7));
      mqX -= sp * 1.1 * dt;
      if (mqX <= -half) mqX += half;
      skew += (clamp(-vel * 0.3, -12, 12) - skew) * 0.12 * dt;
      track.style.transform = `translate3d(${mqX.toFixed(1)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  cleanups.push(() => cancelAnimationFrame(raf));

  return () => cleanups.forEach((fn) => fn());
}
