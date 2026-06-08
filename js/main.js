/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME MANAGEMENT (Light / Dark Mode)
  initTheme();

  // 2. MOBILE OUTLET MANAGEMENT
  initMobileMenu();

  // 3. HOME PAGE HERO CANVAS (Particle / Node Vector Grid)
  initHeroCanvas();

  // 4. PROJECTS FILTER MANAGEMENT (Projects Page)
  initProjectFilters();

  // 5. PROCEDURAL GRAPH SERVICES FOR CARDS (Creative Coding Project Thumbnails)
  initProjectCardCanvases();

  // 6. CONTACT TERMINAL MODULE (Form submission tracking & visual alerts)
  initContactInteractivity();

  // 7. ACADEMIC BLUEPRINT TIMELINE CONSTRAINT (video_0.gif style scroll sync)
  initAcademicBlueprintTimeline();
});

/**
 * Robust theme toggle using CSS variable attributes on :root (html element)
 * and state persistence in localStorage.
 */
function initTheme() {
  // Always enforce dark theme
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('portfolio-theme', 'dark');
}

/**
 * Mobile Drawer Menu triggers
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle-btn');
  const overlay = document.getElementById('mobile-menu-overlay');
  
  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = overlay.classList.contains('is-active');
    if (isActive) {
      overlay.classList.remove('is-active');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      `;
    } else {
      overlay.classList.add('is-active');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
      `;
    }
  });

  // Close overlay on nav link press
  const mobileLinks = overlay.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('is-active');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      `;
    });
  });
}

/**
 * Creative Constellation System for Hero background - Performance Optimized
 * Scales correctly for high DPI retina platforms and uses RequestAnimationFrame cleanly
 */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = 0;
  let height = 0;
  let particles = [];
  
  const dpr = window.devicePixelRatio || 1;
  const mouse = { x: null, y: null, radius: 140 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    
    // Scale canvas pixels for high density devices, keep CSS dimensions fixed
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic density particle count adjustment
    const particleCount = Math.min(65, Math.floor((width * height) / 14000));
    createParticles(particleCount);
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.baseRadius = Math.random() * 2 + 1;
      this.radius = this.baseRadius;
    }

    update() {
      // Boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Update positions
      this.x += this.vx;
      this.y += this.vy;

      // Mouse pulling interactivity behavior
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Magnetize and grow subtly
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
          this.radius = this.baseRadius + force * 2;
        } else {
          if (this.radius > this.baseRadius) {
            this.radius -= 0.1;
          }
        }
      }
    }

    draw() {
      // Pick accent-based color computed at runtime
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const createParticles = (count) => {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  };

  const drawConnections = () => {
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const maxDist = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = ((maxDist - dist) / maxDist) * (isDark ? 0.16 : 0.08);
          ctx.strokeStyle = `rgba(${accentColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Particle calculations
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  };

  // Mouse move tracks positioning relative to Hero bounding box
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Attach ResizeObserver for performance over direct window.resize bindings
  const resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(canvas.parentElement);

  // Setup loop
  resize();
  animate();
}

/**
 * Filters the project card list with fluid, smooth opacity changes via custom transition delays.
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const showcaseGrid = document.querySelector('.projects-showcase-grid');
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Button active selection toggling
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-filter');

      // 2. Wrap visibility transition within requestAnimationFrame matching standard frames
      showcaseGrid.style.opacity = '0.3';
      
      setTimeout(() => {
        let visibleCount = 0;
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          
          if (targetCategory === 'all' || categories.includes(targetCategory)) {
            card.classList.remove('is-hidden');
            visibleCount++;
          } else {
            card.classList.add('is-hidden');
          }
        });
        
        showcaseGrid.style.opacity = '1';
      }, 200);
    });
  });
}

/**
 * Creative Coding Project Thumbnails:
 * Draws gorgeous, lightweight mathematical / vector wireframes on individual project cards dynamically
 * using direct Canvas API calls. Fits themes perfectly and creates the "Architect Elite" look.
 */
function initProjectCardCanvases() {
  const canvases = document.querySelectorAll('.vector-art-canvas');
  if (canvases.length === 0) return;

  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const seed = parseInt(canvas.getAttribute('data-seed') || '1', 10);
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Extract dynamic CSS variables matching the calculated UI theme state
    const styles = getComputedStyle(document.documentElement);
    const accentColor = styles.getPropertyValue('--accent').trim();
    const textMuted = styles.getPropertyValue('--text-muted').trim();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Set subtle grid backgrounds on the thumbnail
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
    ctx.lineWidth = 1;
    const gridSpacing = 20;

    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Mathematical creative graphics depending on the seed configured
    ctx.lineWidth = 1.5;
    
    if (seed === 1) {
      // Wave generator (AI / Vision style math mesh)
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      for (let x = 15; x < width - 15; x += 3) {
        const amplitude = 35;
        const freqMultiplier = 0.025;
        const y = height / 2 + Math.sin(x * freqMultiplier) * Math.cos(x * 0.005) * amplitude;
        if (x === 15) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary shifted phase wave
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
      ctx.beginPath();
      for (let x = 15; x < width - 15; x += 3) {
        const amplitude = 25;
        const freqMultiplier = 0.030;
        const y = height / 2 + Math.sin(x * freqMultiplier + Math.PI / 3) * amplitude;
        if (x === 15) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Floating data nodes
      ctx.fillStyle = accentColor;
      for (let n = 0; n < 4; n++) {
        const nx = 40 + n * 65;
        const ny = height / 2 + Math.sin(nx * 0.025) * 35;
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

    } else if (seed === 2) {
      // Circular polar alignment geometry (Robotics control visualization)
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = 60;

      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
      for (let r = 20; r <= maxRadius; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Main tracking scanning vector line
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const angle = -Math.PI / 4;
      const tx = cx + Math.cos(angle) * maxRadius;
      const ty = cy + Math.sin(angle) * maxRadius;
      ctx.lineTo(tx, ty);
      ctx.stroke();

      // Tracker hub node
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Sweep arc details
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius - 10, -Math.PI / 2, angle, false);
      ctx.stroke();

    } else if (seed === 3) {
      // Connected node clusters (Quantum computing / Web engines architecture state)
      const nodes = [
        { x: width * 0.25, y: height * 0.4 },
        { x: width * 0.5, y: height * 0.25 },
        { x: width * 0.75, y: height * 0.35 },
        { x: width * 0.4, y: height * 0.7 },
        { x: width * 0.65, y: height * 0.65 },
      ];

      // Draw meshes
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
      }
      ctx.stroke();

      // Highlight core operational pipeline route
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[4].x, nodes[4].y);
      ctx.stroke();

      // Node rings
      ctx.lineWidth = 1;
      nodes.forEach((n, idx) => {
        ctx.fillStyle = idx === 1 || idx === 4 ? accentColor : textMuted;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = idx === 1 || idx === 4 ? accentColor : 'transparent';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      });

    } else if (seed === 4) {
      // Abstract Grid Array Matrix (Distributed systems / Database nodes visualization)
      const cols = 6;
      const rows = 3;
      const xStart = (width - (cols - 1) * 30) / 2;
      const yStart = (height - (rows - 1) * 30) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = xStart + c * 30;
          const py = yStart + r * 30;
          
          // Draw connecting pipeline traces
          ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
          if (c < cols - 1) {
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 30, py); ctx.stroke();
          }
          if (r < rows - 1) {
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 30); ctx.stroke();
          }

          // Procedural status indicators
          const isActive = (c + r * cols) % 3 === 1 || (c + r * cols) === 8;
          ctx.fillStyle = isActive ? accentColor : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)');
          ctx.beginPath();
          ctx.arc(px, py, isActive ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

    } else if (seed === 5) {
      // Isometric technical box grid projection (Infrastructure engineering)
      const cx = width / 2;
      const cy = height * 0.55;
      const size = 35;

      const drawIsoBox = (x, y, sz, fillTop, fillRight) => {
        // Draw bottom to top vertical projection vectors
        ctx.strokeStyle = fillTop;
        ctx.beginPath();
        ctx.moveTo(x, y - sz);
        ctx.lineTo(x + sz * 1.2, y - sz * 0.4);
        ctx.lineTo(x, y + sz * 0.2);
        ctx.lineTo(x - sz * 1.2, y - sz * 0.4);
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = fillRight;
        ctx.beginPath();
        ctx.moveTo(x - sz * 1.2, y - sz * 0.4);
        ctx.lineTo(x - sz * 1.2, y + sz * 0.6);
        ctx.lineTo(x, y + sz * 1.2);
        ctx.lineTo(x, y + sz * 0.2);
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(x + sz * 1.2, y - sz * 0.4);
        ctx.lineTo(x + sz * 1.2, y + sz * 0.6);
        ctx.lineTo(x, y + sz * 1.2);
        ctx.lineTo(x, y + sz * 0.2);
        ctx.closePath();
        ctx.stroke();
      };

      drawIsoBox(cx, cy, size, textMuted, isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)');
      drawIsoBox(cx - 45, cy - 25, size * 0.6, accentColor, textMuted);
      drawIsoBox(cx + 45, cy - 10, size * 0.6, textMuted, accentColor);

    } else if (seed === 9) {
      // Dynamic spiral vector field (representing signals / communication waves)
      const cx = width / 2;
      const cy = height * 0.52;
      
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 110; i++) {
        const angle = 0.12 * i;
        const radius = 0.7 * i;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Satellite node clusters orbiting spiral core
      ctx.fillStyle = textMuted;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI * 2) / 4;
        const radiusDist = 48;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * radiusDist, cy + Math.sin(a) * radiusDist, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
        ctx.beginPath();
        ctx.arc(cx, cy, radiusDist, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbital tracker hubs
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(1.2) * 48, cy + Math.sin(1.2) * 48, 4, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // Fallback Seed (Abstract elegant waves)
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

/**
 * Premium Interactive Module for Contact Screen:
 * Custom category selections, live key tracking, simulated processing latency,
 * and high-fidelity confirmation logs.
 */
function initContactInteractivity() {
  const form = document.getElementById('portfolio-interactive-form');
  if (!form) return;

  const categoryPills = document.querySelectorAll('#context-category-pills .category-pill');
  const hiddenInput = document.getElementById('selected-form-category');
  const submitBtn = document.getElementById('form-submit-trigger');
  const toast = document.getElementById('form-feedback-toast');
  const toastMsg = toast ? toast.querySelector('.toast-message') : null;

  // Category Selector Pills functionality
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active status from sibling wrappers
      categoryPills.forEach(p => p.classList.remove('active'));
      
      // Add active to current click target
      pill.classList.add('active');
      
      // Sync hidden selector input
      const value = pill.getAttribute('data-category') || 'General';
      if (hiddenInput) {
        hiddenInput.value = value;
      }
    });

    // Support keyboard selection activation
    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pill.click();
      }
    });
  });

  // Interactivity Submit handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('sender-name') ? document.getElementById('sender-name').value.trim() : '';
    const emailVal = document.getElementById('sender-email') ? document.getElementById('sender-email').value.trim() : '';
    const subjectVal = document.getElementById('sender-subject') ? document.getElementById('sender-subject').value.trim() : '';
    const contextType = hiddenInput ? hiddenInput.value : 'General';

    // Disable button to prevent multi-submit
    if (submitBtn) {
      submitBtn.disabled = true;
      const initialContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span>Processing Packet...</span>
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      `;

      // Premium engineering latency simulation (1.2 seconds)
      setTimeout(() => {
        // Build success feedback toast content
        if (toast && toastMsg) {
          toastMsg.innerHTML = `Secure channel established. Message on <strong>"${subjectVal}"</strong> under category <strong>[${contextType}]</strong> transmitted for <strong>${nameVal}</strong> (${emailVal}).`;
          
          // Slides top or bottom depending on rules
          toast.classList.add('show');

          // Auto trigger collapse of notification toast after 7000ms
          setTimeout(() => {
            toast.classList.remove('show');
          }, 7000);
        }

        // Reset inputs
        form.reset();
        
        // Return selector pills default to first item
        categoryPills.forEach((p, idx) => {
          if (idx === 0) {
            p.classList.add('active');
            if (hiddenInput) hiddenInput.value = p.getAttribute('data-category') || 'Consulting';
          } else {
            p.classList.remove('active');
          }
        });

        // Restore original button setup
        submitBtn.disabled = false;
        submitBtn.innerHTML = initialContent;
      }, 1200);
    }
  });
}

/**
 * Interactive Accordion Dropdown Timeline behavior.
 * Handles accordion row clicks, smooth CSS panel expansions via scrollHeight,
 * chevron rotation toggling, and closing/collapsing inactive rows.
 */
function initAcademicBlueprintTimeline() {
  const section = document.getElementById('academic-accordion-timeline');
  if (!section) return;

  const rows = section.querySelectorAll('.accordion-row');

  rows.forEach((row) => {
    const trigger = row.querySelector('.accordion-trigger');
    const panel = row.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    // Handle initial state of predefined active row
    if (row.classList.contains('active')) {
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      trigger.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = row.classList.contains('active');

      // Collapse all other rows
      rows.forEach((otherRow) => {
        if (otherRow !== row) {
          otherRow.classList.remove('active');
          const otherTrigger = otherRow.querySelector('.accordion-trigger');
          const otherPanel = otherRow.querySelector('.accordion-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = '0px';
        }
      });

      // Toggle current row
      if (isActive) {
        row.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0px';
      } else {
        row.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Handle window resize to dynamically calibrate max-height targets
  window.addEventListener('resize', () => {
    rows.forEach((row) => {
      if (row.classList.contains('active')) {
        const panel = row.querySelector('.accordion-panel');
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    });
  });
}


