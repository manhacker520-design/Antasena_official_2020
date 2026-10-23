/* ============================================================
   ANTASENA WEB — admin.js
   Login admin, panel edit, & edit anggota
   ============================================================ */

let isAdminMode = false;

function openAdminLogin() {
  document.getElementById('adminLoginModal').classList.add('active');
  setTimeout(() => document.getElementById('adminPassword').focus(), 100);
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('active');
  document.getElementById('adminPassword').value = '';
}

function loginAdmin() {
  const pw = document.getElementById('adminPassword').value;

  if (pw === ADMIN_PASS) {
    isAdminMode = true;
    closeAdminLogin();
    document.body.classList.add('admin-mode');
    document.getElementById('adminBadge').style.display = 'block';
    document.getElementById('adminToolbar').classList.add('active');
    renderAll();
    showToast('✅ Mode Admin Aktif!');
  } else {
    const input = document.getElementById('adminPassword');
    input.style.borderColor = '#e55';
    showToast('❌ Kata sandi salah!');
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }
}

function logoutAdmin() {
  isAdminMode = false;
  document.body.classList.remove('admin-mode');
  document.getElementById('adminBadge').style.display = 'none';
  document.getElementById('adminToolbar').classList.remove('active');
  document.getElementById('adminPanel').classList.remove('active');
  renderAll();
  showToast('👋 Keluar dari mode admin.');
}

function toggleAdminPanel() {
  document.getElementById('adminPanel').classList.toggle('active');
}

function openMemberEdit(idx) {
  if (!isAdminMode) return;
  const m = appData.members[idx];

  document.getElementById('edit-member-index').value = idx;
  document.getElementById('edit-m-name').value        = m.name;
  document.getElementById('edit-m-jabatan').value     = m.jabatan;
  document.getElementById('edit-m-badge').value       = m.badge  || '';
  document.getElementById('edit-m-wa').value          = m.wa     || '';
  document.getElementById('edit-m-ig').value          = m.ig     || '';

  document.getElementById('memberEditModal').classList.add('active');
}

function closeMemberEdit() {
  document.getElementById('memberEditModal').classList.remove('active');
}

function saveMemberEdit() {
  const idx = parseInt(document.getElementById('edit-member-index').value);

  appData.members[idx] = {
    name:    document.getElementById('edit-m-name').value,
    jabatan: document.getElementById('edit-m-jabatan').value,
    badge:   document.getElementById('edit-m-badge').value,
    wa:      document.getElementById('edit-m-wa').value,
    ig:      document.getElementById('edit-m-ig').value
  };

  saveData();
  renderMembers();
  closeMemberEdit();
  showToast('✅ Data anggota berhasil disimpan!');
}

function addNewMember() {
  appData.members.push({
    name:    'Anggota Baru',
    jabatan: 'Divisi',
    badge:   '',
    wa:      '',
    ig:      ''
  });
  saveData();
  renderMembers();
  openMemberEdit(appData.members.length - 1);
}