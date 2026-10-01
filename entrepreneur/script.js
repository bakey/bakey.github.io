// ── Particle Background ──
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    });
  }

  let animId;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100,200,255,0.5)';
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(100,200,255,${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
})();

// ── Scroll Animations ──
(function () {
  const sections = document.querySelectorAll('.lp-section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('lp-visible');
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((s) => observer.observe(s));
})();

// ── Smooth Scroll for Anchor Links ──
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Contact Modal ──
(function () {
  const modal = document.getElementById('lp-contact-modal');
  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('lp-modal-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('lp-modal-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.lp-contact-trigger').forEach((trigger) => {
    trigger.addEventListener('click', openModal);
  });

  modal.querySelector('.lp-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.lp-modal-ok').addEventListener('click', closeModal);
  modal.querySelector('.lp-modal-overlay').addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('lp-modal-open')) {
      closeModal();
    }
  });
})();
