// =============================================
// ALAA ABULMAGD PORTFOLIO — script.js
// =============================================

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover states
document.querySelectorAll('a, button, .category-card, .client-card, .masonry-item, .service-card, .case-card, .blog-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorFollower.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorFollower.classList.remove('cursor-hover');
  });
});

// --- NAVBAR SCROLL BEHAVIOR ---
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  // Scroll direction
  if (scrollY > lastScrollY && scrollY > 100) {
    navbar.classList.add('navbar-hidden');
  } else {
    navbar.classList.remove('navbar-hidden');
  }
  
  // Scrolled state styling
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = scrollY;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observer_nav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observer_nav.observe(sec));

// --- SCROLL REVEAL ANIMATIONS ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-section, .service-card, .testimonial-card, .case-card, .blog-card').forEach(el => {
  revealObserver.observe(el);
});

// Hero staggered reveals
const heroEls = document.querySelectorAll('[class*="reveal-hero"]');
heroEls.forEach((el, i) => {
  setTimeout(() => el.classList.add('revealed'), 200 + i * 150);
});

// --- FILTER BAR (PORTFOLIO CATEGORIES) ---
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    if (currentState === 'categories') {
      // Filter categories grid
      document.querySelectorAll('.category-card').forEach(card => {
        const cats = card.dataset.categories ? card.dataset.categories.split(',') : ['all'];
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    }
  });
});

// --- HELPER: generate 20 placeholder images for a client ---
function placeholderImages(seed, label) {
  // Vary dimensions for natural masonry layout: square, portrait, landscape
  const dims = [
    [800,800],[800,1060],[800,640],[800,1000],[800,720],
    [800,800],[800,960],[800,640],[800,1100],[800,760],
    [800,800],[800,1020],[800,660],[800,900],[800,740],
    [800,800],[800,980],[800,620],[800,1040],[800,700]
  ];
  return dims.map((d, i) => ({
    src: `https://picsum.photos/seed/${seed}_${i}/${d[0]}/${d[1]}`,
    alt: `${label} — design project ${i + 1} by Alaa Abulmagd`
  }));
}

// --- PORTFOLIO DATA ---
const portfolioData = [
  {
    id: "social-media",
    title: "Social Media",
    description: "Creative campaigns, posts, reels covers, and digital content.",
    filterTags: ["social"],
    clients: [
      { 
        id: "me-career", name: "ME Career", 
        cover: "images/mecareer.jpg", 
        coverAlt: "ME Career — career coaching brand social media post design by Alaa Abulmagd",
        description: "LinkedIn-style career growth content system",
        images: [
          { src: "images/mecareer.jpg", alt: "ME Career — career coaching social media post, bold typography and professional color palette" },
          ...placeholderImages("mecareer", "ME Career")
        ]
      },
      { 
        id: "cortigiano", name: "Cortigiano", 
        cover: "images/cortigiano.jpg", 
        coverAlt: "Cortigiano restaurant — Italian dining social media campaign photography, Alexandria Egypt",
        description: "Luxury Italian dining visual social presence",
        images: [
          { src: "images/cortigiano.jpg", alt: "Cortigiano restaurant — cinematic food photography and brand post design for Italian restaurant in Alexandria" },
          ...placeholderImages("cortigiano", "Cortigiano")
        ]
      },
      { 
        id: "dr-filetto", name: "Dr Filetto", 
        cover: "images/drfiletto.jpg", 
        coverAlt: "Dr Filetto premium butchery — social media branding and product photography by Alaa Abulmagd",
        description: "Premium butchery brand with upscale social presence",
        images: [
          { src: "images/drfiletto.jpg", alt: "Dr Filetto butchery — premium meat product photography and dark luxury social media aesthetic" },
          ...placeholderImages("drfiletto", "Dr Filetto")
        ]
      },
      { 
        id: "meat-farm", name: "Meat Farm", 
        cover: "images/meatfarm.jpg", 
        coverAlt: "Meat Farm — food brand social media content design and product photography",
        description: "Monthly content package for meat delivery brand",
        images: [
          { src: "images/meatfarm.jpg", alt: "Meat Farm — bold food photography with strong graphic design for social media marketing campaign" },
          ...placeholderImages("meatfarm", "Meat Farm")
        ]
      },
      { 
        id: "sueno", name: "Sueno",
        cover: "https://picsum.photos/seed/sueno_c/600/400",
        coverAlt: "Sueno — café & lifestyle brand social media design",
        description: "Café & lifestyle brand identity",
        images: placeholderImages("sueno", "Sueno")
      },
      { 
        id: "fusion", name: "Fusion",
        cover: "https://picsum.photos/seed/fusion_c/600/400",
        coverAlt: "Fusion restaurant — modern dining social media content",
        description: "Modern fusion dining content",
        images: placeholderImages("fusion", "Fusion")
      },
      { 
        id: "sky-sushi", name: "Sky Sushi",
        cover: "https://picsum.photos/seed/skysushi_c/600/400",
        coverAlt: "Sky Sushi — Japanese restaurant visual identity & social media",
        description: "Japanese dining visual identity",
        images: placeholderImages("skysushi", "Sky Sushi")
      },
      { 
        id: "fins", name: "Fins",
        cover: "https://picsum.photos/seed/fins_c/600/400",
        coverAlt: "Fins — premium seafood brand content design",
        description: "Premium seafood brand content",
        images: placeholderImages("fins", "Fins")
      },
      { 
        id: "care", name: "Care",
        cover: "https://picsum.photos/seed/care_c/600/400",
        coverAlt: "Care — healthcare brand communication design",
        description: "Healthcare brand communication",
        images: placeholderImages("care", "Care")
      },
      { 
        id: "holiday-saudi", name: "Holiday Saudi",
        cover: "https://picsum.photos/seed/holiday_c/600/400",
        coverAlt: "Holiday Saudi — travel & tourism content design",
        description: "Travel & tourism content",
        images: placeholderImages("holiday", "Holiday Saudi")
      },
      { 
        id: "dentix", name: "Dentix",
        cover: "https://picsum.photos/seed/dentix_c/600/400",
        coverAlt: "Dentix dental clinic — social media & brand design",
        description: "Dental clinic brand & content",
        images: placeholderImages("dentix", "Dentix")
      },
      { 
        id: "ctell", name: "CTell",
        cover: "https://picsum.photos/seed/ctell_c/600/400",
        coverAlt: "CTell — telecom brand digital content design",
        description: "Telecom brand digital content",
        images: placeholderImages("ctell", "CTell")
      },
      { 
        id: "kotobna", name: "Kotobna", 
        cover: "images/kotobna.jpg", 
        coverAlt: "Kotobna Arabic book subscription — social media rebrand by Alaa Abulmagd, book culture visual identity",
        description: "Book culture brand with rich editorial aesthetic",
        images: [
          { src: "images/kotobna.jpg", alt: "Kotobna — Arabic book subscription service social media redesign, editorial layout with warm tones and literary typography" },
          ...placeholderImages("kotobna", "Kotobna")
        ]
      },
      { 
        id: "abdelaziz", name: "M.AbdelAziz Pharmacy",
        cover: "https://picsum.photos/seed/pharma_c/600/400",
        coverAlt: "M. AbdelAziz Pharmacy — health brand social media design",
        description: "Pharmacy brand & health content",
        images: placeholderImages("pharma", "M.AbdelAziz Pharmacy")
      }
    ]
  },
  {
    id: "branding",
    title: "Branding",
    description: "Visual identity systems including logos, typography, and brand strategy.",
    filterTags: ["branding"],
    clients: [
      { 
        id: "brand-1", name: "Brand Identity Vol.1",
        cover: "https://picsum.photos/seed/brand1_c/600/400",
        coverAlt: "Brand identity project — full visual identity system",
        description: "Full visual identity system",
        images: placeholderImages("brand1", "Brand Identity")
      },
      { 
        id: "brand-2", name: "Brand Identity Vol.2",
        cover: "https://picsum.photos/seed/brand2_c/600/400",
        coverAlt: "Brand identity project — logo, typography and brand guidelines",
        description: "Logo, typography & guidelines",
        images: placeholderImages("brand2", "Brand Identity")
      }
    ]
  },
  {
    id: "photography",
    title: "Photography",
    description: "Food photography, portraits, products, and commercial shoots.",
    filterTags: ["photography"],
    clients: [
      { 
        id: "photo-food", name: "Food Photography",
        cover: "https://picsum.photos/seed/photo_food_c/600/400",
        coverAlt: "Commercial food photography by Alaa Abulmagd",
        description: "Commercial food & product shoots",
        images: placeholderImages("photofood", "Food Photography")
      },
      { 
        id: "photo-portrait", name: "Portraits",
        cover: "https://picsum.photos/seed/photo_port_c/600/400",
        coverAlt: "Portrait photography by Alaa Abulmagd",
        description: "Professional portrait sessions",
        images: placeholderImages("photoportrait", "Portraits")
      }
    ]
  },
  {
    id: "printing",
    title: "Printings",
    description: "Flyers, menus, brochures, banners, and print-ready designs.",
    filterTags: ["branding"],
    clients: [
      { 
        id: "print-1", name: "Print Designs",
        cover: "https://picsum.photos/seed/print1_c/600/400",
        coverAlt: "Print design — menus, flyers, banners and brochures",
        description: "Menus, flyers & banners",
        images: placeholderImages("print1", "Print Design")
      }
    ]
  },
  {
    id: "videos",
    title: "Videos",
    description: "Commercial reels, cinematic edits, and promotional videos.",
    filterTags: ["video"],
    clients: [
      { 
        id: "video-1", name: "Commercial Reels",
        cover: "https://picsum.photos/seed/video1_c/600/400",
        coverAlt: "Commercial video editing and cinematic reels by Alaa Abulmagd",
        description: "Cinematic brand films & reels",
        images: placeholderImages("video1", "Commercial Reels")
      }
    ]
  }
];

// --- STATE ---
let currentState = 'categories';
let activeCategory = null;
let activeClient = null;

// --- DOM ---
const workContainer = document.getElementById('work-container');
const workTitle = document.getElementById('work-title');
const workSubtitle = document.getElementById('work-subtitle');
const workNav = document.getElementById('work-nav');
const backBtn = document.getElementById('back-btn');
const backText = document.getElementById('back-text');
const filterBar = document.getElementById('filter-bar');

// --- RENDER CATEGORIES ---
function renderCategories() {
  currentState = 'categories';
  workTitle.innerText = "My Work";
  workSubtitle.innerText = "PORTFOLIO";
  workNav.style.display = "none";
  filterBar.style.display = "flex";

  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  
  let html = `<div class="categories-grid fade-in">`;
  portfolioData.forEach(cat => {
    const hidden = activeFilter !== 'all' && !cat.filterTags.includes(activeFilter) ? 'style="display:none"' : '';
    html += `
      <div class="category-card" data-categories="${cat.filterTags.join(',')}" onclick="openCategory('${cat.id}')" ${hidden}>
        <h3>${cat.title}</h3>
        <p>${cat.description}</p>
      </div>
    `;
  });
  html += `</div>`;
  workContainer.innerHTML = html;

  // Re-attach cursor hover for new elements
  attachCursorHovers();
}

// --- RENDER CLIENTS ---
window.openCategory = function(categoryId) {
  const category = portfolioData.find(c => c.id === categoryId);
  if (!category) return;

  currentState = 'clients';
  activeCategory = category;
  filterBar.style.display = "none";
  
  workTitle.innerText = category.title;
  workSubtitle.innerText = "SELECT A CLIENT";
  workNav.style.display = "block";
  backText.innerText = "Back to Categories";

  let html = `<div class="clients-grid fade-in">`;
  if (category.clients.length === 0) {
    html += `<p style="color:#777; width:100%; text-align:center; padding: 60px 0;">Projects coming soon...</p>`;
  } else {
    category.clients.forEach(client => {
      html += `
        <div class="client-card" onclick="openGallery('${category.id}', '${client.id}')">
          <img 
            src="${client.cover}" 
            alt="${client.coverAlt || client.name + ' — portfolio project by Alaa Abulmagd'}" 
            loading="lazy"
            width="400" height="260"
          >
          <div class="client-info">
            <h3>${client.name}</h3>
            <p class="client-desc">${client.description}</p>
            <span class="card-btn">View Projects</span>
          </div>
        </div>
      `;
    });
  }
  html += `</div>`;
  workContainer.innerHTML = html;
  document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  attachCursorHovers();
};

// --- RENDER GALLERY ---
window.openGallery = function(categoryId, clientId) {
  const category = portfolioData.find(c => c.id === categoryId);
  const client = category.clients.find(c => c.id === clientId);
  if (!client) return;

  currentState = 'gallery';
  activeClient = client;

  workTitle.innerText = client.name;
  workSubtitle.innerText = category.title.toUpperCase();
  backText.innerText = `Back to ${category.title}`;

  currentGalleryImages = client.images;

  if (client.images.length === 0) {
    workContainer.innerHTML = `<p class="fade-in" style="text-align:center;color:#777;margin-top:50px;padding:60px 0;">Projects coming soon for ${client.name}...</p>`;
    return;
  }

  let html = `<div class="masonry-gallery fade-in">`;
  client.images.forEach((img, index) => {
    html += `
      <div class="masonry-item" onclick="openLightbox(${index})">
        <img 
          src="${img.src}" 
          loading="lazy" 
          alt="${img.alt}"
        >
        <div class="masonry-caption">${img.alt.split('—')[0].trim()}</div>
      </div>
    `;
  });
  html += `</div>`;
  workContainer.innerHTML = html;
  document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  attachCursorHovers();
};

// --- BACK BUTTON ---
backBtn.addEventListener('click', () => {
  if (currentState === 'gallery') {
    openCategory(activeCategory.id);
  } else if (currentState === 'clients') {
    renderCategories();
  }
});

function attachCursorHovers() {
  document.querySelectorAll('.category-card, .client-card, .masonry-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorFollower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorFollower.classList.remove('cursor-hover');
    });
  });
}

// --- LIGHTBOX ---
let currentGalleryImages = [];
let currentImageIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const overlay = document.querySelector('.lightbox-overlay');

window.openLightbox = function(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = "hidden";
};

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = "auto";
}

function updateLightboxImage() {
  const img = currentGalleryImages[currentImageIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  if (lightboxCaption) lightboxCaption.textContent = img.alt;
}

function showNextImg() {
  currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
  updateLightboxImage();
}

function showPrevImg() {
  currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  updateLightboxImage();
}

// Touch swipe support for lightbox
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? showNextImg() : showPrevImg();
});

closeBtn.addEventListener('click', closeLightbox);
overlay.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImg);
prevBtn.addEventListener('click', showPrevImg);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImg();
  if (e.key === 'ArrowLeft') showPrevImg();
});

// --- CASE STUDIES ---
const caseStudyData = {
  mecareer: {
    title: "ME Career — Building Authority Through Consistent Content",
    tags: ["Social Media", "Content Strategy", "Alexandria → Cairo"],
    intro: "ME Career came to me with a problem familiar to many Egyptian startups: a strong product and a weak visual presence. Their LinkedIn and Instagram content was inconsistent — different fonts, clashing colors, no clear brand voice. They were posting, but not building.",
    challenge: "The challenge wasn't just design — it was architecture. ME Career needed a content system that a small team could operate consistently, that felt premium without being cold, and that converted followers into customers. I had 90 days to prove the concept.",
    process: [
      "Conducted a full brand audit across all platforms, documenting inconsistencies and audience response patterns.",
      "Developed a complete visual language: 3 primary templates, 2 accent colors, a single display font, and a photography brief for any user-generated content.",
      "Built a monthly content calendar with 24 posts per month covering 4 content pillars: education, inspiration, social proof, and offers.",
      "Designed a 'signature post' style — bold typographic layouts with minimal imagery — that became instantly recognizable in the feed."
    ],
    result: "In 90 days: 3× average engagement rate, 12,000 new followers across platforms, and a partnership inquiry from a major Egyptian HR company who discovered the brand through the redesigned content.",
    image: "images/mecareer.jpg",
    imageAlt: "ME Career social media post designs — bold typographic layouts and consistent brand identity by Alaa Abulmagd"
  },
  cortigiano: {
    title: "Cortigiano — Luxury Italian Dining Comes to Alexandria",
    tags: ["Branding", "Food Photography", "Restaurant", "Alexandria"],
    intro: "Restaurant openings are won or lost before the first customer walks through the door. When Cortigiano — a new upscale Italian restaurant in Alexandria — approached me two months before opening, the brief was clear: make people feel they simply must visit.",
    challenge: "Build a complete brand identity from zero, then execute an opening-night photography campaign that could sustain months of social media content. The brand needed to feel authentically Italian, unmistakably premium, and grounded enough to feel accessible — not intimidating.",
    process: [
      "Developed full visual identity: logo system, color palette (deep burgundy, warm cream, muted gold), custom menu typography, and brand standards document.",
      "Art directed a 3-hour opening-night shoot — 4 dishes, 2 drinks, ambient restaurant photography, and team portraits.",
      "Delivered 60+ edited images optimized for social formats (square, portrait, story) and print.",
      "Created the first 30 days of social media content — designed and scheduled before launch."
    ],
    result: "The opening weekend sold out entirely. The first Instagram post reached 15,000 people organically. Within 30 days, Cortigiano had 2,400 Instagram followers and was featured in a local lifestyle blog as 'Alexandria's most anticipated opening of the year.'",
    image: "images/cortigiano.jpg",
    imageAlt: "Cortigiano restaurant brand identity and food photography — luxury Italian dining visual design by Alaa Abulmagd, Alexandria Egypt"
  },
  kotobna: {
    title: "Kotobna — Making Arabic Book Culture Instagram-Worthy",
    tags: ["Social Media", "Brand Refresh", "Editorial Design"],
    intro: "Kotobna is beloved by Arabic book lovers across Egypt and the wider Arab world. But their social media didn't reflect the magic of what they were doing. Text-heavy posts, inconsistent design, no visual identity. They had the audience. They needed the aesthetic.",
    challenge: "The challenge was cultural as much as visual: create a design language that honored Arabic typography and reading culture while working natively on Instagram and Facebook. The content needed to feel like a beautifully curated magazine, not a bookstore flyer.",
    process: [
      "Researched Arabic editorial design references — print magazines, publishing houses, contemporary Arab designers — to build a culturally grounded visual language.",
      "Developed a warm, literary color palette: aged paper tones, ink black, dusty rose, and sage green — all working in light and dark variants.",
      "Created 5 post templates covering book recommendations, quotes, reviews, author spotlights, and monthly themes.",
      "Produced a 3-month content launch plan with A/B testing for cover images and caption styles."
    ],
    result: "The first month under the new visual system: 5× increase in post saves, 2,000+ shares on the first major 'Book of the Month' post, and engagement doubling compared to the previous 3-month average. Kotobna's audience repeatedly commented on the new look in the first weeks.",
    image: "images/kotobna.jpg",
    imageAlt: "Kotobna Arabic book platform — editorial social media redesign with warm literary color palette by Alaa Abulmagd"
  }
};

window.openCaseStudy = function(id) {
  const cs = caseStudyData[id];
  if (!cs) return;

  const body = document.getElementById('case-modal-body');
  body.innerHTML = `
    <div class="cs-header">
      <div class="cs-tags">${cs.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <h2>${cs.title}</h2>
    </div>
    <img src="${cs.image}" alt="${cs.imageAlt}" class="cs-hero-img" loading="lazy">
    <div class="cs-text">
      <h3>Overview</h3>
      <p>${cs.intro}</p>
      <h3>The Challenge</h3>
      <p>${cs.challenge}</p>
      <h3>My Process</h3>
      <ul>${cs.process.map(p => `<li>${p}</li>`).join('')}</ul>
      <h3>The Result</h3>
      <p class="cs-result">${cs.result}</p>
    </div>
    <div class="cs-cta">
      <p>Want results like this for your brand?</p>
      <a href="#contact" class="primary-btn" onclick="closeCaseModal()">Start a Project →</a>
    </div>
  `;

  document.getElementById('case-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeCaseModal = function() {
  document.getElementById('case-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCaseModal();
});

// --- CONTACT FORM (FORMSPREE) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    const formSuccess = document.getElementById('form-success');

    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        formSuccess.style.display = 'block';
        submitBtn.style.display = 'none';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      submitText.style.display = 'inline';
      submitLoading.style.display = 'none';
      submitBtn.disabled = false;
      alert('Something went wrong. Please try reaching me on WhatsApp instead.');
    }
  });
}

// --- A/B TEST CTA COPY ---
const ctaVariants = [
  { main: "Explore My Work", secondary: "Start a Project" },
  { main: "See My Portfolio", secondary: "Book a Free Call" },
  { main: "View Case Studies", secondary: "Let's Talk" }
];

const variant = ctaVariants[Math.floor(Math.random() * ctaVariants.length)];
const mainCta = document.querySelector('.primary-btn[data-ab="cta-main"]');
const secondaryCta = document.querySelector('.secondary-btn[data-ab="cta-secondary"]');
if (mainCta) mainCta.textContent = variant.main;
if (secondaryCta) secondaryCta.textContent = variant.secondary;

// Track variant (Plausible custom event if available)
if (typeof plausible !== 'undefined') {
  plausible('CTA Variant', { props: { variant: variant.secondary } });
}

// --- LATEST WORK CAROUSEL ---
function buildCarouselItems() {
  // Collect all images from all clients across all categories
  const allItems = [];
  portfolioData.forEach(category => {
    category.clients.forEach(client => {
      client.images.forEach(img => {
        allItems.push({
          src: img.src,
          alt: img.alt,
          clientName: client.name,
          clientDesc: client.description,
          clientId: client.id,
          categoryId: category.id,
          categoryTitle: category.title
        });
      });
    });
  });
  return allItems;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let carouselItems = [];
let carouselOffset = 0;
let carouselVisible = 3;
let carouselTotal = 0;
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;

function getCarouselVisible() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function initCarousel() {
  const allItems = buildCarouselItems();
  // Pick 18 random items ensuring variety
  carouselItems = shuffleArray(allItems).slice(0, 18);
  carouselTotal = carouselItems.length;
  carouselVisible = getCarouselVisible();
  carouselOffset = 0;
  renderCarousel();
}

function renderCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  track.innerHTML = carouselItems.map((item, i) => `
    <div class="carousel-card" onclick="openCarouselLightbox(${i})">
      <div style="position:relative;overflow:hidden;">
        <img class="carousel-card-img" src="${item.src}" alt="${item.alt}" loading="lazy">
        <div class="carousel-card-overlay"></div>
        <span class="carousel-card-tag">${item.categoryTitle}</span>
      </div>
      <div class="carousel-card-info">
        <div class="carousel-card-client">${item.clientName}</div>
        <div class="carousel-card-title">${item.clientDesc}</div>
      </div>
    </div>
  `).join('');

  // Dots
  const totalDots = Math.ceil(carouselTotal / carouselVisible);
  dotsContainer.innerHTML = Array.from({length: totalDots}, (_, i) => `
    <button class="carousel-dot${i === 0 ? ' active' : ''}" onclick="goToCarouselPage(${i})"></button>
  `).join('');

  updateCarouselTransform();
  attachCursorHovers();
}

function updateCarouselTransform() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  const cardWidth = track.children[0]?.offsetWidth || 0;
  const gap = 24;
  const shift = (cardWidth + gap) * carouselOffset;
  track.style.transform = `translateX(-${shift}px)`;

  // Update dots
  const activePage = Math.floor(carouselOffset / carouselVisible);
  dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activePage);
  });
}

window.goToCarouselPage = function(page) {
  carouselOffset = page * carouselVisible;
  carouselOffset = Math.max(0, Math.min(carouselOffset, carouselTotal - carouselVisible));
  updateCarouselTransform();
};

document.getElementById('carouselNext')?.addEventListener('click', () => {
  const max = carouselTotal - carouselVisible;
  carouselOffset = Math.min(carouselOffset + carouselVisible, max);
  updateCarouselTransform();
});

document.getElementById('carouselPrev')?.addEventListener('click', () => {
  carouselOffset = Math.max(carouselOffset - carouselVisible, 0);
  updateCarouselTransform();
});

// Touch swipe for carousel
const carouselTrack = document.getElementById('carouselTrack');
let carouselTouchStart = 0;
carouselTrack?.addEventListener('touchstart', e => { carouselTouchStart = e.touches[0].clientX; }, {passive:true});
carouselTrack?.addEventListener('touchend', e => {
  const diff = carouselTouchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      carouselOffset = Math.min(carouselOffset + 1, carouselTotal - carouselVisible);
    } else {
      carouselOffset = Math.max(carouselOffset - 1, 0);
    }
    updateCarouselTransform();
  }
});

window.addEventListener('resize', () => {
  carouselVisible = getCarouselVisible();
  carouselOffset = 0;
  updateCarouselTransform();
});

// CAROUSEL LIGHTBOX
const carouselLightbox = document.getElementById('carouselLightbox');
const carouselLbOverlay = document.getElementById('carouselLbOverlay');
const carouselLbClose = document.getElementById('carouselLbClose');
const carouselLbImg = document.getElementById('carouselLbImg');
const carouselLbClient = document.getElementById('carouselLbClient');
const carouselLbDesc = document.getElementById('carouselLbDesc');
const carouselLbBtn = document.getElementById('carouselLbBtn');

window.openCarouselLightbox = function(index) {
  const item = carouselItems[index];
  if (!item) return;
  carouselLbImg.src = item.src;
  carouselLbImg.alt = item.alt;
  carouselLbClient.textContent = `${item.clientName} · ${item.categoryTitle}`;
  carouselLbDesc.textContent = item.clientDesc;
  // Button links to specific client in portfolio
  carouselLbBtn.onclick = () => {
    closeCarouselLightbox();
    setTimeout(() => {
      openCategory(item.categoryId);
      setTimeout(() => openGallery(item.categoryId, item.clientId), 400);
    }, 350);
  };
  carouselLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeCarouselLightbox() {
  carouselLightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

carouselLbClose?.addEventListener('click', closeCarouselLightbox);
carouselLbOverlay?.addEventListener('click', closeCarouselLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCarouselLightbox();
});

// Update lightbox to show client hint when viewing gallery
const originalOpenLightbox = window.openLightbox;
window.openLightbox = function(index) {
  originalOpenLightbox(index);
  const hint = document.getElementById('lightbox-client-hint');
  const hintLabel = document.getElementById('lightbox-hint-label');
  if (hint && activeClient) {
    hintLabel.textContent = `${activeClient.name} · ${activeClient.description}`;
    hint.style.display = 'flex';
  }
};

window.closeLightboxAndGo = function() {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// --- BLOG CAROUSEL ---
let blogCarouselOffset = 0;
const blogCarouselTrack = document.getElementById('blogCarouselTrack');

function getBlogCarouselVisible() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateBlogCarousel() {
  if (!blogCarouselTrack) return;
  const cards = blogCarouselTrack.querySelectorAll('.blog-card');
  if (!cards.length) return;
  const cardW = cards[0].offsetWidth;
  const gap = 24;
  blogCarouselTrack.style.transform = `translateX(-${(cardW + gap) * blogCarouselOffset}px)`;
}

document.getElementById('blogCarouselNext')?.addEventListener('click', () => {
  const visible = getBlogCarouselVisible();
  const total = blogCarouselTrack?.querySelectorAll('.blog-card').length || 0;
  blogCarouselOffset = Math.min(blogCarouselOffset + 1, total - visible);
  updateBlogCarousel();
});

document.getElementById('blogCarouselPrev')?.addEventListener('click', () => {
  blogCarouselOffset = Math.max(blogCarouselOffset - 1, 0);
  updateBlogCarousel();
});

// Touch swipe for blog carousel
let blogTouchStart = 0;
blogCarouselTrack?.addEventListener('touchstart', e => { blogTouchStart = e.touches[0].clientX; }, {passive:true});
blogCarouselTrack?.addEventListener('touchend', e => {
  const diff = blogTouchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    const visible = getBlogCarouselVisible();
    const total = blogCarouselTrack?.querySelectorAll('.blog-card').length || 0;
    if (diff > 0) blogCarouselOffset = Math.min(blogCarouselOffset + 1, total - visible);
    else blogCarouselOffset = Math.max(blogCarouselOffset - 1, 0);
    updateBlogCarousel();
  }
});

window.addEventListener('resize', updateBlogCarousel);

// --- BLOG POST DATA ---
const blogPostData = {
  'cortigiano-shoot': {
    tag: 'Photography',
    title: 'How I Shot the Cortigiano Opening Night Campaign',
    meta: '8 min read · Food Photography',
    body: `
      <h3>The Brief</h3>
      <p>When Cortigiano reached out two weeks before their opening night, the ask was simple but high-stakes: photograph every dish on the menu, capture the atmosphere, and make sure we had enough content to fuel the first three months of social media. In one evening.</p>
      <h3>The Setup</h3>
      <p>I arrived two hours before guests — enough time to walk every corner of the restaurant, test lighting conditions, and set up my portable diffuser near the windows. Natural light was dying fast, so I set up a single continuous LED with a warm diffusion panel to mimic candlelight. The goal wasn't perfect studio lighting. It was restaurant light that looked intentional.</p>
      <ul>
        <li>Camera: Sony A7 IV with 35mm f/1.8 and 85mm f/1.4</li>
        <li>Lighting: One Godox SL60W + warm diffusion panel + silver bounce card</li>
        <li>Post: Lightroom custom preset, minimal retouching</li>
      </ul>
      <div class="blog-post-pullquote">"The food looked best when it looked alive — steam wisping, sauces still glistening. Speed matters more than perfection in food photography."</div>
      <h3>The Shoot</h3>
      <p>Over three hours I photographed 4 pasta dishes, 2 starters, 3 desserts, and 6 drinks — each in multiple angles for Instagram square, portrait story, and print. Between dishes I grabbed ambient shots: empty chairs, candlelight details, the bar being set up.</p>
      <h3>The Edit</h3>
      <p>I delivered 60 edited images within 48 hours. The edit kept shadows deep and warm, highlights creamy — a film-influenced look that matched the brand's luxury Italian positioning. Every image was exported in three crops: 1:1, 4:5, and 9:16.</p>
      <h3>The Result</h3>
      <p>The opening weekend sold out. The first Instagram post hit 15,000 organic reach. The owner called it "the best investment we made before opening." That call made the three-hour sprint worth every minute.</p>
    `
  },
  'fb-visual-identity': {
    tag: 'Branding',
    title: 'Why Egyptian F&B Brands Are Finally Investing in Visual Identity',
    meta: '6 min read · Branding & Strategy',
    body: `
      <h3>Something Has Shifted</h3>
      <p>Three years ago, most Egyptian restaurant owners I spoke to viewed design as decoration — something nice to have once the business was running well. Today, the conversation has completely flipped. Owners are coming to me before they open, sometimes before they've signed the lease.</p>
      <h3>What Changed?</h3>
      <p>Instagram didn't cause this shift — it accelerated one that was already building. The real driver was competition. Alexandria and Cairo have seen an explosion of dining concepts: fast-casual, cloud kitchens, specialty cafés. In a crowded feed, only the visually distinctive survive.</p>
      <ul>
        <li>Customers now judge food quality by photography before they ever taste anything</li>
        <li>Brand recognition compounds — the brands that look consistent get shared more</li>
        <li>Delivery apps have become visual menus, making photography non-negotiable</li>
      </ul>
      <div class="blog-post-pullquote">"A logo alone isn't a brand. A brand is every touchpoint — the menu, the packaging, the Instagram grid, the story filter. Consistency across all of them is what builds trust."</div>
      <h3>What the Smart Brands Are Doing Right</h3>
      <p>The F&B brands pulling ahead in Egypt right now share three things: a distinctive visual signature (usually a strong color system), consistent photography style, and a social media presence that feels curated rather than random. None of this requires enormous budgets — it requires intentional systems.</p>
      <h3>Where to Start</h3>
      <p>If you're a restaurant owner reading this: start with your color palette and one signature photography style. Everything else builds from there. The brands getting it right aren't spending more — they're deciding more clearly.</p>
    `
  },
  'me-career-content': {
    tag: 'Social Media',
    title: 'The 90-Day Content System That Grew ME Career by 12,000 Followers',
    meta: '7 min read · Social Media Strategy',
    body: `
      <h3>The Starting Point</h3>
      <p>When ME Career first approached me, they had an audience that wanted to grow and a content problem that was getting in the way. Their posts were inconsistent — some days nothing, some days three posts. The design varied wildly. The messaging was all over the place.</p>
      <h3>The System I Built</h3>
      <p>The first thing I did was kill the randomness. I built a content calendar structured around four pillars that every brand needs to communicate consistently:</p>
      <ul>
        <li><strong>Education:</strong> Tips and frameworks that prove expertise — 40% of posts</li>
        <li><strong>Inspiration:</strong> Motivational content tied to career growth — 25% of posts</li>
        <li><strong>Social Proof:</strong> Client wins, testimonials, results — 20% of posts</li>
        <li><strong>Offers:</strong> Clear CTAs for services — 15% of posts</li>
      </ul>
      <div class="blog-post-pullquote">"The best content systems are almost boring to manage. You're not reinventing the wheel every week — you're filling proven formats with fresh ideas."</div>
      <h3>The Visual Language</h3>
      <p>I designed three post templates that covered 90% of content needs: a bold text card, an infographic layout, and a quote format. One display font. Two brand colors. One photography rule (light backgrounds only, lifestyle context). Every post was recognizable in under a second.</p>
      <h3>The Results at 90 Days</h3>
      <p>Engagement rate tripled. 12,000 new followers across LinkedIn and Instagram. One post about career transitions reached 340,000 impressions organically — their biggest ever. A major Egyptian HR firm reached out for a partnership after discovering them through the redesigned content.</p>
      <h3>What This Proves</h3>
      <p>Growth isn't about posting more. It's about posting with purpose and looking unmistakably like yourself every single time.</p>
    `
  },
  'food-photography-tips': {
    tag: 'Photography',
    title: '5 Lighting Secrets That Make Food Look Irresistible on Instagram',
    meta: '5 min read · Food Photography',
    body: `
      <h3>Why Lighting Is Everything</h3>
      <p>I've shot food in five-star kitchens and tiny home studios. The single biggest factor that separates a craveable image from a forgettable one isn't the camera, the plate, or the food — it's always the light.</p>
      <h3>Secret 1: Side Light Over Top Light</h3>
      <p>Most people instinctively shoot with the light above the food. This creates flat, shadowless images. Move your light source to the side — 45 to 90 degrees — and suddenly you get texture, depth, and dimension. The sauce glistens. The crust shows its grain.</p>
      <h3>Secret 2: The Golden Bounce Card</h3>
      <p>A simple gold reflector (or even a piece of gold card) placed opposite your light source wraps warm fill light around the food. It's the difference between a dish that looks lit and one that looks alive. I carry a collapsible gold/white reflector on every shoot.</p>
      <div class="blog-post-pullquote">"The cheapest upgrade you can make to your food photography costs less than a meal: a $15 reflector card changes everything."</div>
      <h3>Secret 3: Shoot in the Blue Hour Window</h3>
      <p>Overcast natural light — about 30 minutes after sunrise or before sunset — is the most forgiving and beautiful light for food. It's soft, directional, and warm. If you're shooting near a window during these windows, you barely need anything else.</p>
      <h3>Secret 4: Feather Your Flash</h3>
      <p>If you're using artificial light, don't point it directly at the food. Angle it so the edge of the beam grazes the subject. This "feathering" technique creates a more gradual, natural-looking light fall-off that avoids the harsh look of direct flash.</p>
      <h3>Secret 5: Match the Light to the Brand</h3>
      <p>Warm amber light says indulgence, luxury, warmth. Cool daylight says fresh, clean, healthy. Before I set up any shot, I ask: what feeling should this food create? The lighting answers that question before the camera does.</p>
    `
  },
  'brand-consistency': {
    tag: 'Branding',
    title: 'The Hidden Cost of Inconsistent Branding (and How to Fix It Fast)',
    meta: '6 min read · Branding',
    body: `
      <h3>The Problem Nobody Talks About</h3>
      <p>Business owners talk constantly about getting more customers. Almost nobody talks about the customers they're quietly losing because their brand feels unreliable. Inconsistent branding is an invisible tax on your business — you never see the invoice, but you feel the shortfall.</p>
      <h3>What Inconsistency Actually Costs</h3>
      <p>When your Instagram looks different from your menu, which looks different from your packaging, which looks different from your website — customers can't build a mental model of who you are. They can't refer you confidently. They're not sure if they're dealing with the same business twice.</p>
      <ul>
        <li>Lower word-of-mouth referrals — hard to describe what you don't clearly see</li>
        <li>Reduced perceived quality — inconsistency reads as carelessness</li>
        <li>Higher customer acquisition cost — you're rebuilding trust every time</li>
      </ul>
      <div class="blog-post-pullquote">"Consistency isn't about being boring. It's about being recognizable. Recognition builds trust. Trust drives decisions."</div>
      <h3>The Three-Step Fix</h3>
      <p>I've helped dozens of brands fix this, and it always comes down to three decisions: choose one primary color (and stick to it everywhere), choose one font for headlines (and use it every single time), and define one photography style (and never deviate). That's 80% of brand consistency solved.</p>
      <h3>The One-Week Audit</h3>
      <p>Pull up every touchpoint your brand has: social media, website, business cards, menu, packaging, WhatsApp profile. If a stranger couldn't tell they all belonged to the same business, you have a consistency problem. That audit is always the starting point.</p>
    `
  },
  'reels-strategy': {
    tag: 'Video',
    title: 'Why Short-Form Video Is Now Non-Negotiable for Egyptian Brands',
    meta: '5 min read · Video & Content',
    body: `
      <h3>The Reach Has Shifted</h3>
      <p>In 2022, a well-designed static post from a restaurant in Alexandria could reach 5,000 people organically. Today, that same post might reach 400. The algorithm has changed dramatically — and it's all pointing in one direction: video.</p>
      <h3>Why Reels Work in Egypt Right Now</h3>
      <p>Instagram and TikTok are actively suppressing static content in favor of Reels. This creates a massive opportunity for brands willing to adapt. In Egypt specifically, I've seen Reels from restaurants and clinics consistently reach 20-100x the audience of static posts from the same account.</p>
      <ul>
        <li>Food reveal videos — "the cut" moment for burgers and steaks — consistently go viral</li>
        <li>Behind-the-scenes kitchen content builds authenticity and trust</li>
        <li>Tutorial-style content ("how we make our pasta from scratch") drives saves and shares</li>
      </ul>
      <div class="blog-post-pullquote">"You don't need a film crew. You need a phone, good light, and a clear story. The brands winning on Reels are the ones willing to show up imperfectly."</div>
      <h3>The Format That Consistently Works</h3>
      <p>Based on hundreds of posts I've managed: a 15-25 second reel with a strong visual hook in the first 2 seconds, no talking, trending audio, and a clear product reveal at the end. That format — done consistently — outperforms everything else in F&B and lifestyle content in Egypt.</p>
      <h3>How to Start Without a Budget</h3>
      <p>You already have everything you need: a phone with a decent camera, the food or product, and your space. Start with a weekly "process reel" — 15 seconds of your product being made. Film it by a window. Add trending audio. Post it. That's week one. The skill builds from there.</p>
    `
  }
};

window.openBlogPost = function(id) {
  const post = blogPostData[id];
  if (!post) return;
  const body = document.getElementById('blog-modal-body');
  body.innerHTML = `
    <div>
      <span class="blog-post-tag">${post.tag}</span>
      <h2 class="blog-post-title">${post.title}</h2>
      <p class="blog-post-meta">${post.meta}</p>
      <div class="blog-post-body">${post.body}</div>
    </div>
  `;
  document.getElementById('blog-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeBlogModal = function() {
  document.getElementById('blog-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBlogModal();
});

// --- INITIALIZE ---
renderCategories();
initCarousel();
