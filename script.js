/* ================= JavaScript (logika/animasi) ================= */

/* ======== EDIT BAGIAN INI SAJA ======== */
const CONFIG = {
  nama: "Hestiii Ruwaidaaaaa💖",
  dari: "Justfriendmu, fans emyuuu #GGMU",
  tanggalBuka: "2026-12-12T00:00:00+07:00", // "" = langsung buka tanpa hitung mundur
  judul: "Selamat Ulang Tahun!",
  penutup: "Aku sayang kamu 💖",

  pesan: [
    "Hai {nama}, ada sesuatu yang ingin aku sampaikan…",
    "Terima kasih sudah jadi orang yang selalu ada buat aku.",
    "Semoga tahun ini penuh hal-hal baik dan senyum yang banyak.",
    "Sekali lagi, selamat ulang tahun! 🎂"
  ],

  sorotan: "Kamu itu alasan banyak hari-hariku jadi lebih baik.",

  /* Linimasa (boleh dikosongkan: linimasa: []) */
  linimasa: [
    { tanggal: "Januari 2024", teks: "Pertama kali kita ketemu." },
    { tanggal: "Juni 2024",    teks: "Mulai sering ngobrol sampai larut." },
    { tanggal: "Hari ini",     teks: "Dan sekarang aku bikin ini buat kamu." }
  ],

  /* MEMORY: foto & video
     type "foto"  -> src = nama file ("foto1.jpg") ATAU link gambar (https://...jpg)
     type "video" -> src = file mp4 ("video1.mp4") ATAU link YouTube (https://youtu.be/xxxx) */
  memory: [
    // { type: "foto",  src: "foto1.jpg",  caption: "Pertama kali jalan bareng" },
    // { type: "video", src: "video1.mp4", caption: "Momen lucu waktu itu" },
    // { type: "video", src: "https://youtu.be/XXXXXXXXXXX", caption: "Lagu kita" },
  ]
};
/* ===================================== */

const $ = id => document.getElementById(id);
const fill = t => t.replaceAll('{nama}', CONFIG.nama).replaceAll('{dari}', CONFIG.dari);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };

$('startTitle').textContent = `Surprise for My Love ${CONFIG.nama}`;
$('judul').textContent = CONFIG.judul;
$('penutup').textContent = CONFIG.penutup;
$('dari').textContent = "— " + CONFIG.dari;
$('sorotan').textContent = CONFIG.sorotan;
if (!CONFIG.sorotan) $('band').style.display = 'none';

// pesan
CONFIG.pesan.forEach((t, i) => $('bubbles').appendChild(el('div', 'bubble reveal ' + (i % 2 ? 'right' : 'left'), fill(t))));

// linimasa
if (CONFIG.linimasa.length) {
  $('tlSection').style.display = 'block';
  CONFIG.linimasa.forEach(x => {
    const d = el('div', 'tl reveal up');
    d.append(el('b', '', x.tanggal), el('p', '', x.teks));
    $('timeline').appendChild(d);
  });
}

// memory
function ytId(u) { const m = u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? m[1] : null; }
if (CONFIG.memory.length) {
  $('memSection').style.display = 'block';
  CONFIG.memory.forEach(m => {
    const card = el('div', 'polaroid reveal zoom');
    let media;
    if (m.type === 'video') {
      const id = ytId(m.src);
      if (id) { media = el('iframe'); media.src = 'https://www.youtube.com/embed/' + id; media.allowFullscreen = true; }
      else { media = el('video'); media.src = m.src; media.controls = true; media.playsInline = true; media.preload = 'metadata'; }
    } else {
      media = el('img'); media.src = m.src; media.alt = m.caption || ''; media.loading = 'lazy';
      media.onclick = () => { $('lightbox').querySelector('img').src = m.src; $('lightbox').style.display = 'flex'; };
    }
    card.appendChild(media);
    if (m.caption) card.appendChild(el('div', 'cap', m.caption));
    $('memory').appendChild(card);
  });
}
$('lightbox').onclick = () => $('lightbox').style.display = 'none';

// tombol mulai
$('startBtn').onclick = () => {
  $('start').style.display = 'none';
  const target = CONFIG.tanggalBuka ? new Date(CONFIG.tanggalBuka).getTime() : 0;
  if (Date.now() >= target) return openSite();
  $('wait').style.display = 'flex';
  const t = setInterval(() => {
    const left = target - Date.now();
    if (left <= 0) { clearInterval(t); $('wait').style.display = 'none'; return openSite(); }
    $('d').textContent = Math.floor(left / 864e5);
    $('h').textContent = Math.floor(left % 864e5 / 36e5);
    $('m').textContent = Math.floor(left % 36e5 / 6e4);
    $('s').textContent = Math.floor(left % 6e4 / 1e3);
  }, 500);
};

function openSite() {
  $('site').style.display = 'block';
  window.scrollTo(0, 0);
  confetti();
  floaties();
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: .2 });
  document.querySelectorAll('.reveal').forEach(x => io.observe(x));
}

// hati melayang di hero
function floaties() {
  const emo = ['💖', '✨', '💜', '🎈', '🌸'];
  for (let i = 0; i < 14; i++) {
    const f = el('div', 'floaty', emo[i % emo.length]);
    f.style.left = Math.random() * 100 + '%';
    f.style.fontSize = 16 + Math.random() * 22 + 'px';
    f.style.animationDuration = 8 + Math.random() * 8 + 's';
    f.style.animationDelay = -Math.random() * 10 + 's';
    $('hero').appendChild(f);
  }
}

// konfeti
function confetti() {
  const c = $('confetti'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const colors = ['#ff7eb3','#ffd166','#06d6a0','#118ab2','#fff'];
  const parts = Array.from({length: 140}, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height,
    r: 4 + Math.random() * 6, v: 2 + Math.random() * 4,
    c: colors[Math.floor(Math.random() * colors.length)], a: Math.random() * 6
  }));
  let n = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach(p => { p.y += p.v; p.x += Math.sin(p.a += .05) * 1.5; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.r, p.r * 1.6); });
    if (++n < 300) requestAnimationFrame(loop); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}
