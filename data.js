/* ============================================================
   ANTASENA WEB — data.js
   Data default & manajemen localStorage
   ============================================================ */

const STORAGE_KEY = 'antasena_data_v2';
const ADMIN_PASS  = 'antasena2026'; // Kata sandi admin

const defaultData = {
  'hero-title':    'ANTASENA',
  'hero-subtitle': "Ma'had Islami Salafi Nur Al-Qadiri",
  'hero-tagline':  'Panitia Penyelenggara • 2026',

  'about-p1': "ANTASENA adalah kepanitiaan yang dibentuk di bawah naungan Ma'had Islami Salafi Nur Al-Qadiri. Kami hadir dengan semangat pengabdian dan komitmen untuk menyelenggarakan berbagai kegiatan islami yang bermanfaat bagi seluruh santri dan masyarakat.",
  'about-p2': "Dengan landasan aqidah yang lurus dan akhlak yang mulia, kami bergerak bersama dalam persatuan, kejujuran, dan keikhlasan demi kemajuan agama dan bangsa. Bismillah, kami siap memberikan yang terbaik.",

  'stat-anggota':  '20+',
  'stat-kegiatan': '15+',
  'stat-tahun':    '2026',

  'ig-link':   'https://instagram.com/antasena_official',
  'ig-handle': '@antasena_official',
  'tt-link':   'https://tiktok.com/@antasena_official',
  'tt-handle': '@antasena_official',
  'wa-link':   'https://wa.me/628123456789',
  'wa-handle': '+62 812-3456-789',

  'quote-arabic-0': 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  'quote-latin-0':  "Inna ma'al 'usri yusraa",
  'quote-trans-0':  '"Sesungguhnya bersama kesulitan ada kemudahan." — QS. Al-Insyirah: 6',

  'quote-arabic-1': 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
  'quote-latin-1':  "Wa may yattaqillaaha yaj'al lahuu makhrajaa",
  'quote-trans-1':  '"Barangsiapa bertakwa kepada Allah, Dia akan memberinya jalan keluar." — QS. Ath-Thalaq: 2',

  'quote-arabic-2': 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
  'quote-latin-2':  "Fa-inna ma'al 'usri yusraa",
  'quote-trans-2':  '"Maka sesungguhnya bersama kesulitan ada kemudahan." — QS. Al-Insyirah: 5',

  members: [
    { name: 'Ahmad Fauzan',     jabatan: 'Ketua Panitia',      badge: 'Ketua',       wa: '6281234567890', ig: 'ahmad_fauzan'     },
    { name: 'Fatimah Az-Zahra', jabatan: 'Sekretaris',         badge: '',            wa: '6281234567891', ig: 'fatimah.azzahra'  },
    { name: 'Muhammad Rizky',   jabatan: 'Bendahara',          badge: '',            wa: '6281234567892', ig: 'mrizky_official'  },
    { name: 'Aisyah Ramadhani', jabatan: 'Sie Konsumsi',       badge: '',            wa: '6281234567893', ig: 'aisyah.ramadhan'  },
    { name: 'Abdullah Hakim',   jabatan: 'Sie Keamanan',       badge: 'Koordinator', wa: '6281234567894', ig: 'abdullahhakim_'   },
    { name: 'Khadijah Salma',   jabatan: 'Sie Dekorasi',       badge: '',            wa: '6281234567895', ig: 'khadijah_salma'   },
    { name: 'Yusuf Al-Farisi',  jabatan: 'Sie Dokumentasi',    badge: 'Koordinator', wa: '6281234567896', ig: 'yusuf.alfarisi'  },
    { name: 'Maryam Sholehah',  jabatan: 'Sie Humas',          badge: '',            wa: '6281234567897', ig: 'maryam_sholehah'  },
    { name: 'Ibrahim Khalil',   jabatan: 'Sie Perlengkapan',   badge: '',            wa: '6281234567898', ig: 'ibrahimkhalil_'   },
    { name: 'Zainab Muflihah',  jabatan: 'Sie Acara',          badge: 'Koordinator', wa: '6281234567899', ig: 'zainab.muflihah'  },
    { name: 'Umar bin Khattab', jabatan: 'Anggota Acara',      badge: '',            wa: '6281234567900', ig: 'umar_bk'          },
    { name: 'Hafsah Wulandari', jabatan: 'Anggota Konsumsi',   badge: '',            wa: '6281234567901', ig: 'hafsah.wulandari' }
  ],

  docs: [
    { title: 'Pembukaan Kegiatan',  desc: 'Dokumentasi acara pembukaan yang penuh khidmat dan barokah',              img: '' },
    { title: 'Kajian Ilmiah',       desc: 'Momen berharga dalam menimba ilmu agama bersama para ustadz',             img: '' },
    { title: 'Kegiatan Santri',     desc: 'Aktivitas santri yang penuh semangat dan antusias',                        img: '' },
    { title: 'Acara Penutupan',     desc: 'Momen perpisahan yang mengharukan namun penuh kenangan indah',            img: '' },
    { title: 'Sesi Foto Bersama',   desc: 'Kebersamaan panitia yang solid dan kompak',                                img: '' },
    { title: 'Momen Spesial',       desc: 'Kenangan tak terlupakan bersama seluruh jajaran panitia ANTASENA',        img: '' }
  ]
};

let appData = {};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    appData = saved ? { ...defaultData, ...JSON.parse(saved) } : { ...defaultData };
  } catch (e) {
    appData = { ...defaultData };
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    showSaveIndicator();
  } catch (e) {
    console.error('Gagal menyimpan:', e);
  }
}

function saveEdit(key, value) {
  appData[key] = value;
  const el = document.getElementById(key) || document.querySelector(`[data-key="${key}"]`);
  if (el) el.textContent = value;
  saveData();
}