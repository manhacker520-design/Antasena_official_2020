/* ============================================================
   ANTASENA WEB — particles.js
   Partikel emas & bintang berkelip
   ============================================================ */

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 2 + 0.5,
      dx:    (Math.random() - 0.5) * 0.3,
      dy:    (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.pulse += 0.02;
      const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function initStars() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    star.className = 'star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width:  ${size}px;
      height: ${size}px;
      --dur: ${(Math.random() * 3 + 2).toFixed(1)}s;
      --op:  ${(Math.random() * 0.4 + 0.1).toFixed(2)};
      animation-delay: ${(Math.random() * 3).toFixed(1)}s;
    `;
    star.setAttribute('data-speed', (Math.random() * 0.5 + 0.1).toFixed(2));
    layer.appendChild(star);
  }
}