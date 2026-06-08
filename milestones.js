document.addEventListener('DOMContentLoaded', () => {
  // 1. MASTER CERTIFICATION DATA REGISTRY (23 CARDS VERBATIM)
  const masterRegistry = [
    {
      image: "certificates/Img_10.jpeg",
      title: "Aryabhatta National Maths Competition - 2025",
      subtitle: "AICTSD | Round 1 Score - 96.67%",
      category: "Mathematics"
    },
    {
      image: "certificates/Img_11.jpeg",
      title: "Aryabhatta National Maths Competition - 2025",
      subtitle: "AICTSD | All India Rank - 41",
      category: "Mathematics"
    },
    {
      image: "certificates/Img_12.jpeg",
      title: "Design Thinking - A Primer",
      subtitle: "NPTEL Online Certification (IIT Madras) | Elite Tag - 81%",
      category: "Design Thinking"
    },
    {
      image: "certificates/Img_13.jpeg",
      title: "Introduction to Internet of Things",
      subtitle: "NPTEL Online Certification (IIT Kharagpur) | Elite Tag - 82%",
      category: "Internet of Things"
    },
    {
      image: "certificates/Img_14.jpeg",
      title: "TECHATHON'24 — Paper Pursuit",
      subtitle: "Sri Ramakrishna Institute of Technology | Department of ECE",
      category: "Exhibition"
    },
    {
      image: "certificates/Img_15.jpeg",
      title: "ASME TN-NOVATE",
      subtitle: "ASME Tamil Nadu Section | Certificate of Appreciation",
      category: "Professional Community"
    },
    {
      image: "certificates/Img_16.jpeg", // Correct extension match (.jpg)
      title: "Intellectual Property UTSAV",
      subtitle: "MIC & AICTE | Masterclass Series",
      category: "Governance"
    },
    {
      image: "certificates/Img_17.jpeg",
      title: "WWT All India Women Only Hackathon",
      subtitle: "Shooting Stars Foundation & WWT | Team: Code Warriors",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_18.jpeg",
      title: "Internal Smart India Hackathon 2025",
      subtitle: "Selected as TOP TEAM (Hardware Track) | Team HackHIVE",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_19.jpeg",
      title: "Adobe India Hackathon",
      subtitle: "Unstop & Adobe | Team: HackHarmonics (Round 1)",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_20.jpeg",
      title: "Bharatiya Antariksh Hackathon 2025",
      subtitle: "ISRO & Hack2Skill | National Space Idea Submission",
      category: "Aerospace"
    },
    {
      image: "certificates/Img_21.jpeg",
      title: "NASA International Space Apps Challenge",
      subtitle: "NASA Galactic Problem Solver | Global Initiative",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_22.jpeg",
      title: "IIC Regional Meet 2025",
      subtitle: "MoE's Innovation Cell & AICTE | Hosted by PSG College",
      category: "Ecosystem"
    },
    {
      image: "certificates/Img_23.jpeg",
      title: "Visa 24hrs AI Hackathon — Shaastra 2026",
      subtitle: "IIT Madras & Unstop | Fast-Paced AI Innovation Challenge",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_24.jpeg",
      title: "KRUU GRASP Hackathon 2026",
      subtitle: "Powered by ASME India & KRUU | Grassroots Innovation",
      category: "Hackathon"
    },
    {
      image: "certificates/Img_25.jpeg",
      title: "ASME EFx SRIT 2026",
      subtitle: "American Society of Mechanical Engineers | National Assembly",
      category: "National Gathering"
    },
    {
      image: "certificates/Img_26.jpeg",
      title: "ASME EFx SJCET Palai",
      subtitle: "American Society of Mechanical Engineers | National Engineering Festival (Kerala)",
      category: "National Gathering"
    },
    {
      image: "certificates/Img_27.jpeg",
      title: "FOSSEE Open Source Hardware Hackathon 2026",
      subtitle: "IIT Bombay | Open Source Initiative",
      category: "Research"
    },
    {
      image: "certificates/Img_28.jpeg",
      title: "The FEME Collective",
      subtitle: "ASME Women in Engineering Interest Group | Global Summit",
      category: "Leadership"
    },
    {
      image: "certificates/Img_29.jpeg",
      title: "TN-IMPACT 2026 — Special Expert Sessions",
      subtitle: "TANCAM (Dassault Systèmes & TIDCO) | Industrial Hackathon at KIT",
      category: "Manufacturing"
    },
    {
      image: "certificates/Img_32.jpeg",
      title: "National Buildathon 2026",
      subtitle: "Forge India & Unstop | Participation (Team Rudhra)",
      category: "Buildathon"
    },
    {
      image: "certificates/Img_31.jpeg",
      title: "National Buildathon 2026 — Development Submission",
      subtitle: "Forge India & Unstop | Advanced Milestone",
      category: "Buildathon"
    },
    {
      image: "certificates/Img_9.jpeg",
      title: "ASME EFx SRIT 2026 — Oral Competition",
      subtitle: "ASME India | Technical Presentation Digital Badge",
      category: "Accolade"
    }
  ];

  const container = document.getElementById('coverflow-container');
  const prevBtn = document.getElementById('coverflow-prev');
  const nextBtn = document.getElementById('coverflow-next');
  const counterDisplay = document.getElementById('coverflow-counter');

  if (!container) return;

  let activeIndex = 0;
  const slideCount = masterRegistry.length;

  // Render elements dynamically
  masterRegistry.forEach((data, index) => {
    const slide = document.createElement('div');
    slide.className = 'coverflow-slide';
    slide.setAttribute('data-index', index);
    slide.setAttribute('tabindex', '0');

    slide.innerHTML = `
      <div class="slide-image-frame">
        <img src="${data.image}" alt="${data.title}" class="slide-img" referrerPolicy="no-referrer" loading="lazy">
      </div>
      <div class="slide-details-pane">
        <span class="slide-category-badge">${data.category}</span>
        <h3 class="slide-title">${data.title}</h3>
        <p class="slide-subtitle">${data.subtitle}</p>
      </div>
    `;

    slide.addEventListener('click', () => {
      if (index !== activeIndex) {
        activeIndex = index;
        updateCoverflow();
      }
    });

    slide.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activeIndex = index;
        updateCoverflow();
      }
    });

    container.appendChild(slide);
  });

  const slides = container.querySelectorAll('.coverflow-slide');

  function updateCoverflow() {
    slides.forEach((slide, index) => {
      const offset = index - activeIndex;
      const absOffset = Math.abs(offset);

      if (offset === 0) {
        slide.style.transform = `translateX(0) translateZ(150px) rotateY(0deg)`;
        slide.style.zIndex = '100';
        slide.style.opacity = '1';
        slide.style.filter = 'none';
        slide.classList.add('active-slide');
      } else if (offset < 0) {
        const xOffset = offset * 130 - 30;
        slide.style.transform = `translateX(${xOffset}px) translateZ(0px) rotateY(45deg)`;
        slide.style.zIndex = `${100 - absOffset}`;
        slide.style.opacity = absOffset > 3 ? '0' : '0.65';
        slide.style.filter = 'brightness(0.55) blur(1px)';
        slide.classList.remove('active-slide');
      } else {
        const xOffset = offset * 130 + 30;
        slide.style.transform = `translateX(${xOffset}px) translateZ(0px) rotateY(-45deg)`;
        slide.style.zIndex = `${100 - absOffset}`;
        slide.style.opacity = absOffset > 3 ? '0' : '0.65';
        slide.style.filter = 'brightness(0.55) blur(1px)';
        slide.classList.remove('active-slide');
      }
    });

    if (counterDisplay) {
      counterDisplay.textContent = `${activeIndex + 1} / ${slideCount}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeIndex > 0) {
        activeIndex--;
      } else {
        activeIndex = slideCount - 1;
      }
      updateCoverflow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeIndex < slideCount - 1) {
        activeIndex++;
      } else {
        activeIndex = 0;
      }
      updateCoverflow();
    });
  }

  document.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inViewport) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeIndex > 0) {
          activeIndex--;
          updateCoverflow();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeIndex < slideCount - 1) {
          activeIndex++;
          updateCoverflow();
        }
      }
    }
  });

  // Drag and Swipe logic
  let startX = 0;
  let isDragging = false;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 75) {
      if (diff > 0 && activeIndex > 0) {
        activeIndex--;
      } else if (diff < 0 && activeIndex < slideCount - 1) {
        activeIndex++;
      }
      updateCoverflow();
      isDragging = false;
    }
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 55) {
      if (diff > 0 && activeIndex > 0) {
        activeIndex--;
      } else if (diff < 0 && activeIndex < slideCount - 1) {
        activeIndex++;
      }
      updateCoverflow();
      isDragging = false;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => { isDragging = false; });

  updateCoverflow();
});