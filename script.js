// Theme toggle — default light
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

setTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

// Navbar: frosted backdrop on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
}, { passive: true });

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', e => {
    e.preventDefault();
    navLinks.classList.remove('open');
    const target = document.getElementById(l.getAttribute('href').slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', location.pathname);
  })
);

// Strip hash if page is loaded with one (e.g. shared link)
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', location.pathname);
}

// Highlight active nav link by scroll position
function updateActiveLink() {
  const ids    = ['home', 'about', 'experience', 'skills', 'gallery', 'contact'];
  const scrollY = window.scrollY + 100;

  ids.forEach(id => {
    const el   = document.getElementById(id);
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!el || !link) return;
    link.classList.toggle('active',
      scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight
    );
  });
}

// FAB → scroll to contact
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Contact form
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
  btn.disabled  = true;

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body:    JSON.stringify(Object.fromEntries(new FormData(this))),
    });
    const data = await res.json();

    if (data.success) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message sent!';
      this.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled  = false;
      }, 4000);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Failed — try again';
    btn.disabled  = false;
    console.error('Contact form error:', err);
  }
});

updateActiveLink();

// ── Experience data ───────────────────────────────────────────
const expData = {
  work: [
    {
      company: 'Telkom Indonesia',
      role: 'External Portfolio Management',
      duration: 'May 2026 – Present',
      logo: 'logo-telkom.png',
      desc: [
        'I manage and monitor a portfolio of 40+ startup investments under Telkom, specifically within the former Indigo Program. In this role, I work closely with founders to track operational, financial, and strategic progress across the portfolio, maintaining regular engagement to assess business performance, identify risks, and support them in navigating challenges within fast-paced environments.',
        'I coordinate cross-functionally to align internal objectives with portfolio outcomes, while leading portfolio reviews and evaluations to determine next steps for each investment. Through this role, I focus on driving clarity, accountability, and informed decision-making across the portfolio.'
      ]
    },
    {
      company: 'City Explorer – Live Streaming Hub',
      role: 'Regional Operation Manager',
      duration: 'Jan 2024 – Apr 2026',
      logo: 'logo-cityexplorer.jpg',
      desc: [
        'I joined City Explorer during a full reset phase, where the platform had to be rebuilt from the ground up in Indonesia. My role quickly evolved into leading day-to-day operations, rebuilding the team, and driving early-stage growth across users, content, and internal systems.',
        'Over time, I took ownership of multiple functions — from hiring and team structuring to coordinating with external vendors and aligning cross-region efforts. This included building and managing a team of 50+ contributors (with 5 team leads), launching internal programs such as the City Explorer Academy, and supporting the platform\'s growth to 1,000+ users and 130+ livestreamers.',
        'I was also involved in scaling initiatives such as a global internship program with 700+ applicants across five continents, as well as navigating later-stage challenges including restructuring and team downsizing to keep operations sustainable.'
      ]
    },
    {
      company: 'Mixture',
      role: 'Co-Founder & CTO',
      duration: 'May 2022 – Aug 2024',
      logo: 'logo-mixture.png',
      desc: [
        'Mixture was my first startup experience, where I served as CTO and led all technical development from the ground up. The idea originated from a problem we experienced ourselves — the difficulty for independent musicians to find consistent gig opportunities — which led us to build a platform aimed at solving that gap.',
        'We initially validated the concept through Indonesian Digital Tribe, where we were selected as a Top 20 finalist out of 2,000+ teams, giving us early confidence to move forward with building the product.',
        'I was responsible for designing and building the entire MVP, including the web platform, backend systems, and early infrastructure for a mobile application. This meant working across the full stack — from system architecture and database design to frontend implementation — while translating product ideas into working features.',
        'Beyond development, I worked closely with the founding team to support early-stage execution, including partnerships and initial rollout. The platform gained early traction with 170+ musicians onboarded, 25+ gigs published, and 10+ event collaborations, alongside a growing online presence of around 2,300 followers.'
      ]
    },
    {
      company: 'IGNITEVENT.ID',
      role: 'Co-Founder',
      duration: 'Sep 2020 – Jul 2023',
      logo: 'logo-ignitevent.png',
      desc: [
        'IGNITEVENT.ID started as an offline event initiative, but quickly pivoted to a fully virtual format during the COVID-19 pandemic. This shift led us to explore livestream-based events, which we later developed into a service offering.',
        'I was involved in planning and executing events, coordinating with internal teams, and ensuring smooth delivery of live sessions. Over time, we ran 40+ online events, reaching 8,000+ participants and generating 35,000+ total livestream viewers.'
      ]
    },
    {
      company: 'Esri Indonesia',
      role: 'Application Developer Intern',
      duration: 'Feb 2021 – Mar 2022',
      logo: 'logo-esri.png',
      desc: [
        'As part of BINUS University\'s Alternative Internship 3+1 Program, I collaborated with Esri Indonesia on an application development project. The engagement provided hands-on experience working with geospatial technologies and enterprise-grade software solutions, bridging academic learning with real-world application in a professional setting.'
      ]
    }
  ],
  edu: [
    {
      company: 'BINUS University',
      role: 'Bachelor of Computer Science',
      duration: 'Aug 2018 – Aug 2022',
      logo: 'logo-binus.png',
      desc: [
        'I completed my Bachelor\'s degree in Computer Science at BINUS University, where I was an active member of HIMTI (Himpunan Mahasiswa Teknik Informatika), the university\'s Computer Science student association, from 2019 to 2021.',
        'Throughout my time at BINUS, I took on several organizational leadership roles. I served as Vice Chairman of HISHOT 2020, led as Regional Person in Charge of HIMTIBAND, and contributed as part of the Publication and Marketing team — experiences that sharpened my leadership, coordination, and communication skills alongside my technical studies.'
      ]
    },
    {
      company: 'SMA Islam Al Azhar 8 Kota Bekasi',
      role: 'High School Diploma',
      duration: 'May 2015 – Aug 2018',
      logo: 'logo-alazhar.png',
      desc: [
        'I completed my high school education at SMA Islam Al Azhar 8 Kota Bekasi, where I was actively involved in student life beyond the classroom.',
        'I was a member of the Student Council, serving as Division Lead for Islamic Religious Affairs (Kerohanian Islam) — responsible for organizing and coordinating religious programs and community activities within the school.'
      ]
    }
  ],
  vol: [
    {
      company: 'Ambil Peran',
      role: 'Co-Lead, Creative Economy Division',
      duration: 'Jan 2024 – Oct 2024',
      logo: 'logo-ambilperan.png',
      desc: [
        'Ambil Peran (formerly Bekasi Ambil Peran) is a youth organization founded in Bekasi with a vision to create meaningful, positive impact for the city and, ultimately, the nation as a whole.',
        'I was entrusted with the role of Co-Lead of the Creative Economy Division, which focuses on supporting and advancing Bekasi\'s creative economy sector. My responsibilities spanned inter-community relations, activations, active participation in regional-level forums, and the organization of creative economy events and projects across the city.',
        'A highlight of my tenure was representing Ambil Peran on a city visit to Bandung, where I had the opportunity to introduce the organization to a wide range of local stakeholders. This initiative fostered long-standing relationships between Ambil Peran and multiple Bandung-based organizations and institutions — partnerships that continue to this day.'
      ]
    },
    {
      company: 'Perahu Kertas',
      role: 'Volunteer',
      duration: 'Jan 2021 – Apr 2021',
      logo: 'logo-perahukertas.png',
      desc: [
        'Perahu Kertas is a non-profit organization dedicated to helping those in need and uplifting marginalized communities — particularly individuals working on the streets, including street sweepers, busking musicians, and those experiencing homelessness.',
        'During my time as a volunteer, I actively participated in outreach efforts across Jakarta, contributing to the delivery of millions of rupiah worth of food and essential supplies to dozens of people in need. It was a deeply humbling experience that reinforced my belief in the power of community-driven action.'
      ]
    },
    {
      company: 'ICPC 2019 – Asia Jakarta Region',
      role: 'Vice Chairman',
      duration: 'Mar 2019 – Oct 2019',
      logo: 'logo-icpc.png',
      desc: [
        'The International Collegiate Programming Contest (ICPC) is one of the world\'s most prestigious programming competitions, bringing together top young programmers from universities across the globe for a multi-day competitive programming event.',
        'As Vice Chairman of the Asia Jakarta Regional Contest in 2019, I led and coordinated a committee of 60+ members while managing approximately 80 competing teams from around 30 institutions worldwide — totaling roughly 800 participants. My responsibilities encompassed committee coordination, logistics planning, and ensuring the smooth end-to-end execution of the contest.'
      ]
    }
  ]
};

// ── Experience: logo helper ───────────────────────────────────
function expLogoHtml(item, cls) {
  const initial = item.company[0].toUpperCase();
  return `<div class="exp-logo ${cls}">
    <img src="assets/${item.logo}" alt="${item.company}"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
    <span class="exp-logo-initial">${initial}</span>
  </div>`;
}

// ── Experience: render list ───────────────────────────────────
let expActiveTab = 'work';

function expRenderList(tab) {
  const listView = document.getElementById('exp-list-view');
  listView.innerHTML = expData[tab].map((item, i) => `
    <div class="exp-list-item" data-index="${i}">
      ${expLogoHtml(item, 'exp-logo-sm')}
      <div class="exp-list-left">
        <span class="exp-list-company">${item.company}</span>
        <span class="exp-list-role">${item.role}</span>
      </div>
      <div class="exp-list-right">
        <span class="exp-list-duration">${item.duration}</span>
        <i class="fa-solid fa-chevron-right exp-list-arrow"></i>
      </div>
    </div>
  `).join('');

  listView.querySelectorAll('.exp-list-item').forEach(el => {
    el.addEventListener('click', () => expShowDetail(tab, parseInt(el.dataset.index)));
  });
}

// ── Experience: show detail ───────────────────────────────────
function expShowDetail(tab, index) {
  const item = expData[tab][index];
  const detailContent = document.getElementById('exp-detail-content');
  detailContent.innerHTML = `
    <div class="exp-detail-header">
      <div class="exp-detail-logo-row">
        ${expLogoHtml(item, 'exp-logo-lg')}
        <div>
          <div class="exp-detail-company">${item.company}</div>
          <div class="exp-detail-role">${item.role}</div>
          <div class="exp-detail-duration">${item.duration}</div>
        </div>
      </div>
    </div>
    <div class="exp-detail-body">
      ${item.desc.map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
  document.getElementById('exp-list-view').style.display = 'none';
  const detailView = document.getElementById('exp-detail-view');
  detailView.classList.remove('hidden');
  detailView.style.animation = 'none';
  detailView.getBoundingClientRect();
  detailView.style.animation = '';
  document.getElementById('exp-right-scroll').scrollTop = 0;
}

// ── Experience: back button ───────────────────────────────────
document.getElementById('exp-back-btn').addEventListener('click', () => {
  document.getElementById('exp-list-view').style.display = '';
  document.getElementById('exp-detail-view').classList.add('hidden');
  document.getElementById('exp-right-scroll').scrollTop = 0;
});

// ── Experience: vertical tabs ─────────────────────────────────
document.querySelectorAll('.exp-vtab').forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    expActiveTab = key;

    document.querySelectorAll('.exp-vtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.exp-img').forEach(i => i.classList.remove('active'));
    document.getElementById('img-' + key).classList.add('active');

    document.getElementById('exp-list-view').style.display = '';
    document.getElementById('exp-detail-view').classList.add('hidden');
    document.getElementById('exp-right-scroll').scrollTop = 0;

    expRenderList(key);
  });
});

// Initial render
expRenderList('work');

// ─── Gallery ────────────────────────────────────────────────────────────────

const skillsData = [
  {
    label: 'Product & Leadership',
    items: [
      'Product Thinking', 'Operations Management',
      'Cross-functional Coordination', 'Team Leadership'
    ]
  },
  {
    label: 'Web Technologies',
    items: [
      'HTML5', 'CSS3', 'JavaScript', 'PHP', 'Laravel',
      'Bootstrap', 'jQuery', 'Angular', 'MySQL', 'REST APIs'
    ]
  },
  {
    label: 'Design',
    items: ['Figma', 'Adobe Photoshop', 'Canva']
  },
  {
    label: 'Video & Media',
    items: ['Adobe Premiere Pro', 'OBS Studio']
  },
  {
    label: 'Dev Tools',
    items: ['Git', 'draw.io']
  },
  {
    label: 'Languages',
    items: ['Bahasa Indonesia (Native)', 'English — C1 Professional Proficiency']
  }
];

const photos = [
  { src: 'assets/gallery/1.png',  alt: 'Maliq & Essentials merch tee',        title: 'The Journey of Signed Merch: Complete' },
  { src: 'assets/gallery/2.png',  alt: 'Wall of blue-lit clocks',              title: 'All the Time in the World' },
  { src: 'assets/gallery/3.png',  alt: 'Upper Clift Resort & Cafe signage',    title: 'Upper Clift: One Fine Day in Sentul' },
  { src: 'assets/gallery/4.png',  alt: 'Eagle owl perched on a branch',        title: 'burunghantu.' },
  { src: 'assets/gallery/5.png',  alt: 'Orange tabby kitten looking up',       title: "siskaeee (that's literally the cat's name)" },
  { src: 'assets/gallery/6.png',  alt: 'Film camera on a stack of books',      title: 'Film Never Dies' },
  { src: 'assets/gallery/7.png',  alt: 'Bronze abstract sculpture in gallery', title: 'Form in Motion' },
  { src: 'assets/gallery/8.png',  alt: 'Close-up of black car headlight',      title: 'face to face' },
  { src: 'assets/gallery/9.png',  alt: 'Roller coaster loop against blue sky', title: 'while(fun){do-fun}' },
  { src: 'assets/gallery/10.png', alt: 'Train station platform',                title: 'On the Platform' },
  { src: 'assets/gallery/11.png', alt: 'Sunset through car windshield',         title: 'Chasing the Last Light' },
  { src: 'assets/gallery/12.png', alt: 'Sports court at dusk',                  title: 'ada cinta di sma.' },
  { src: 'assets/gallery/13.png', alt: 'Two cars on a clifftop valley view',    title: 'forza over the london horizon' },
  { src: 'assets/gallery/14.png', alt: 'Boy on horseback at the beach',         title: 'harbor of the queens (and horses)' },
];

const videos = [
  { id: '1cQxbMe6cag', title: 'tolerance',                    year: '2019', role: 'Chief Editor, Producer' },
  { id: '68MXHjq9Z38', title: 'hitamputih',                   year: '2019', role: 'Editor' },
  { id: 'KzJ2iA-RO-s', title: 'FANTASTIC A',                  year: '2020', role: 'Supervisor, Chief Editor' },
  { id: '33jTB0oPtXQ', title: 'IGNITEVENT.ID Online Seminar', year: '2022', role: 'Technical Officer' },
  { id: 'eskWTBBFFes', title: 'HISHOT 2020 Online Seminar',   year: '2020', role: 'Chief Editor, Producer' },
  { id: 'hP-YYyNugdI', title: 'BENJIRO',                      year: '2017', role: 'Music Supervisor, Director of Photography, Editor' },
  { id: 'WGN2or5zRCA', title: 'Reduce Plastic Usage',         year: '2020', role: 'Director, Chief Editor, Producer, Director of Photography' },
  { id: '7pNeyIMZ7xg', title: 'Profile Summary',              year: '2019', role: 'Solo Project' },
];

function renderChips() {
  const container = document.getElementById('skills-groups');
  if (!container) return;
  container.innerHTML = skillsData.map(group => `
    <div class="skill-group">
      <h3 class="skill-group-label">${group.label}</h3>
      <div class="skill-chips">
        ${group.items.map(s => `<span class="skill-chip">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  if (photos.length === 0) {
    grid.innerHTML = '<p class="gallery-empty">Photos coming soon.</p>';
    return;
  }
  grid.innerHTML = photos.map((p, i) =>
    `<button class="photo-btn" data-index="${i}" aria-label="View photo ${i + 1}">
       <img src="${p.src}" alt="${p.alt}" loading="lazy">
     </button>`
  ).join('');
  grid.querySelectorAll('.photo-btn').forEach(btn => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });
}

function renderVideoGrid() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  if (videos.length === 0) {
    grid.innerHTML = '<p class="gallery-empty">Videos coming soon.</p>';
    return;
  }
  grid.innerHTML = videos.map(v =>
    `<button class="video-thumb" data-id="${v.id}" aria-label="Play: ${v.title}">
       <div class="video-thumb-img">
         <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
         <span class="play-icon" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
       </div>
       <div class="video-info">
         <p class="video-info-title">${v.title} <span class="video-info-year">${v.year}</span></p>
         <p class="video-info-role">${v.role}</p>
       </div>
     </button>`
  ).join('');
  grid.querySelectorAll('.video-thumb').forEach(btn => {
    btn.addEventListener('click', () => openVideoModal(btn.dataset.id));
  });
}

// Gallery tabs
document.querySelectorAll('.gallery-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gallery-tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.gallery-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('gallery-' + btn.dataset.tab).classList.add('active');
  });
});

// Lightbox
let lbIndex = 0;
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbTitle  = document.getElementById('lb-title');

function lbShow() {
  const p = photos[lbIndex];
  lbImg.src        = p.src;
  lbImg.alt        = p.alt;
  lbTitle.textContent = p.title || '';
}

function openLightbox(index) {
  lbIndex = index;
  lbShow();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.getElementById('lb-close').focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + photos.length) % photos.length;
  lbShow();
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => lbStep(-1));
document.getElementById('lb-next').addEventListener('click', () => lbStep(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Video modal
const videoModal = document.getElementById('video-modal');
const ytFrame    = document.getElementById('yt-frame');

function openVideoModal(id) {
  ytFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.getElementById('vm-close').focus();
}

function closeVideoModal() {
  ytFrame.src = '';
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
}

document.getElementById('vm-close').addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });

// ESC closes both overlays
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('open'))    closeLightbox();
    if (videoModal.classList.contains('open'))  closeVideoModal();
  }
  if (lightbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  }
});

renderChips();
renderPhotoGrid();
renderVideoGrid();

// Photo grid expand / collapse
const photoGridWrap  = document.getElementById('photo-grid-wrap');
const photoExpandBtn = document.getElementById('photo-expand-btn');

photoExpandBtn.addEventListener('click', () => {
  const isExpanded = photoGridWrap.classList.contains('expanded');
  if (isExpanded) {
    photoGridWrap.style.maxHeight = '400px';
    photoGridWrap.classList.remove('expanded');
    photoExpandBtn.classList.remove('expanded');
    photoExpandBtn.querySelector('span').textContent = 'See More';
    photoGridWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    photoGridWrap.style.maxHeight = photoGridWrap.scrollHeight + 'px';
    photoGridWrap.classList.add('expanded');
    photoExpandBtn.classList.add('expanded');
    photoExpandBtn.querySelector('span').textContent = 'Show Less';
  }
});
