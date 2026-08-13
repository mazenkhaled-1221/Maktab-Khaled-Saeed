// ======================================================
// Firebase Config - مكتب خالد سعيد للمحاسبة
// ======================================================

const firebaseConfig = {
  apiKey: "AIzaSyB0lkjj1nWMKxp-5JgKIhw35YH270fQBZM",
  authDomain: "khalid-saeed-office.firebaseapp.com",
  projectId: "khalid-saeed-office",
  storageBucket: "khalid-saeed-office.firebasestorage.app",
  messagingSenderId: "83641892654",
  appId: "1:83641892654:web:00ddaf7195fc7a12a844bf"
};

// ======================================================
// Cloudinary Config
// ======================================================
const CLOUDINARY = {
  cloudName:    'dwbbhkdmm',
  uploadPreset: 'eogbr1be'
};

// ======================================================
// تهيئة Firebase
// ======================================================
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// ======================================================
// رفع ملف عبر Cloudinary
// ======================================================
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file',          file);
  formData.append('upload_preset', CLOUDINARY.uploadPreset);
  formData.append('folder',        'khalid-saeed');

  const isImage = file.type.startsWith('image/');
  const isPDF   = file.type === 'application/pdf';
  const isWord  = file.type === 'application/msword' ||
                  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  // Word يحتاج resource_type = raw، باقي الملفات auto
  const resourceType = isWord ? 'raw' : 'auto';

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/${resourceType}/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error('فشل رفع الملف: ' + (err.error?.message || res.status));
  }

  const data = await res.json();
  let url = data.secure_url;

  // PDF: نضيف fl_attachment لضمان فتح الـ PDF صح في المتصفح
  if (isPDF) {
    url = url.replace('/upload/', '/upload/fl_attachment/');
  }

  // Word: نضيف الامتداد لو مش موجود في الرابط
  if (isWord) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!url.toLowerCase().endsWith('.' + ext)) {
      url = url + '.' + ext;
    }
  }

  return url;
}

// ======================================================
// دوال مساعدة مشتركة
// ======================================================

function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function statusBadge(status) {
  const map = {
    'pending':    { label: 'قيد المراجعة', cls: 'badge-pending'  },
    'inprogress': { label: 'جارٍ التنفيذ',  cls: 'badge-progress' },
    'done':       { label: 'مكتمل',          cls: 'badge-done'     },
    'rejected':   { label: 'مرفوض',          cls: 'badge-rejected' },
  };
  const s = map[status] || { label: status, cls: 'badge-pending' };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}

function showToast(msg, type = 'success') {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.id = 'toast';
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3500);
}