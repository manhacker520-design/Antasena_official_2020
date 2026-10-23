/* ============================================================
   ANTASENA WEB — main.js
   Entry point utama
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Muat data dari localStorage
  loadData();

  // 2. Aktifkan efek partikel & bintang
  initParticles();
  initStars();

  // 3. Render seluruh komponen web
  renderAll();

  // 4. Inisialisasi efek animasi scroll
  initReveal();

  // 5. Hilangkan layar loading
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }, 2000);
});