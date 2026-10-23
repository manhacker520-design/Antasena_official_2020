/* ============================================================
   ANTASENA WEB — render.js
   Render anggota, kutipan islami, galeri dokumentasi
   ============================================================ */

let currentQuoteIndex = 0;

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

function renderAll() {
  renderTextFields();
  renderSosmed();
  renderMembers();
  renderQuotes();
  renderDocs();
  loadEditPanel();
}

function renderTextFields() {
  const keys = ['hero-title', 'hero-subtitle', 'hero-tagline', 'about-p1', 'about-p2', 'stat-anggota', 'stat-kegiatan', 'stat-tahun'];
  keys.forEach(k => {
    const el = document.getElementById(k);
    if (el && appData[k] !== undefined) el.textContent = appData[k];
  });
}

function renderSosmed() {
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHref = (id, val) => { const el = document.getElementById(id); if (el) el.href = val; };

  setText('ig-handle', appData['ig-handle'] || '@antasena_official');
  setText('tt-handle', appData['tt-handle'] || '@antasena_official');
  setText('wa-handle', appData['wa-handle'] || '+62 812-3456-789');
  setHref('ig-card', appData['ig-link'] || '#');
  setHref('tt-card', appData['tt-link'] || '#');
  setHref('wa-card', appData['wa-link'] || '#');
}

function renderMembers() {
  const grid = document.getElementById('anggotaGrid');
  if (!grid) return;
  grid.innerHTML = '';

  (appData.members || []).forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'anggota-card reveal';
    card.setAttribute('data-delay', i * 100);

    if (isAdminMode) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openMemberEdit(i));
    }

    card.innerHTML = `
      ${m.badge ? `<div class="card-badge">${m.badge}</div>` : ''}
      <div class="avatar-wrapper">
        <div class="avatar-circle">${getInitials(m.name)}</div>
      </div>
      <div class="anggota-name">${m.name}</div>
      <div class="anggota-jabatan">${m.jabatan}</div>
      <div class="anggota-divider"></div>
      <div class="anggota-contacts">
        ${m.wa ? `<a href="https://wa.me/${m.wa}" class="contact-btn contact-wa" target="_blank"><i class="fab fa-whatsapp"></i> WA</a>` : ''}
        ${m.ig ? `<a href="https://instagram.com/${m.ig}" class="contact-btn contact-ig" target="_blank"><i class="fab fa-instagram"></i> IG</a>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });

  initReveal();
}

function renderQuotes() {
  const nav = document.getElementById('quoteNav');
  if (!nav) return;
  nav.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'quote-dot' + (i === currentQuoteIndex ? ' active' : '');
    dot.addEventListener('click', () => showQuote(i));
    nav.appendChild(dot);
  }
  showQuote(currentQuoteIndex);
}

function showQuote(idx) {
  currentQuoteIndex = idx;
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setText('quote-arabic', appData[`quote-arabic-${idx}`] || '');
  setText('quote-latin',  appData[`quote-latin-${idx}`]  || '');
  setText('quote-trans',  appData[`quote-trans-${idx}`]  || '');
  document.querySelectorAll('.quote-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

setInterval(() => {
  currentQuoteIndex = (currentQuoteIndex + 1) % 3;
  showQuote(currentQuoteIndex);
}, 5000);

function renderDocs() {
  const gallery = document.getElementById('docGallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  (appData.docs || []).forEach((doc, i) => {
    const card = document.createElement('div');
    card.className = 'doc-card reveal';
    card.setAttribute('data-delay', i * 100);

    const uploadBtn = isAdminMode
      ? `<div style="position:absolute;bottom:10px;right:10px;z-index:2;">
           <label style="cursor:pointer;background:rgba(201,168,76,0.2);border:1px solid var(--gold);color:var(--gold);padding:6px 12px;border-radius:15px;font-size:0.7rem;">
             <i class="fas fa-upload"></i> Upload
             <input type="file" accept="image/*" style="display:none" onchange="uploadDocImg(${i}, this)">
           </label>
         </div>`
      : '';

    card.innerHTML = `
      <div class="doc-placeholder">
        ${doc.img
          ? `<img src="${doc.img}" alt="${doc.title}">`
          : `<i class="fas fa-camera" style="position:relative;z-index:1;font-size:2.5rem;"></i>`
        }
        ${uploadBtn}
      </div>
      <div class="doc-info">
        <div class="doc-title" ${isAdminMode ? `contenteditable="true" onblur="saveDocField(${i},'title',this.textContent)"` : ''}>${doc.title}</div>
        <div class="doc-desc" ${isAdminMode ? `contenteditable="true" onblur="saveDocField(${i},'desc',this.textContent)"` : ''}>${doc.desc}</div>
      </div>
    `;
    gallery.appendChild(card);
  });

  initReveal();
}

function uploadDocImg(idx, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    appData.docs[idx].img = e.target.result;
    saveData();
    renderDocs();
    showToast('📸 Foto berhasil diupload!');
  };
  reader.readAsDataURL(file);
}

function saveDocField(idx, field, value) {
  appData.docs[idx][field] = value;
  saveData();
}

function loadEditPanel() {
  const map = {
    'edit-hero-title': 'hero-title', 'edit-hero-subtitle': 'hero-subtitle', 'edit-hero-tagline': 'hero-tagline',
    'edit-about-p1': 'about-p1', 'edit-about-p2': 'about-p2',
    'edit-ig-link': 'ig-link', 'edit-ig-handle': 'ig-handle',
    'edit-tt-link': 'tt-link', 'edit-tt-handle': 'tt-handle'
  };
  Object.entries(map).forEach(([elId, dataKey]) => {
    const el = document.getElementById(elId);
    if (el) el.value = appData[dataKey] || '';
  });
}