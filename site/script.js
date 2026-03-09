/* ============================================================
   PANGEA LUNCH & LEARN — Parallax Storybook
   Vanilla JS: parallax engine, scroll reveals, animations
   Zero dependencies
   ============================================================ */

(function () {
  'use strict';

  // --- Feature Detection ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = window.innerWidth <= 768;
  const parallaxEnabled = !prefersReducedMotion && !isTouchDevice && !isMobile;

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = 'scaleX(' + progress + ')';
  }

  // --- Parallax Engine ---
  const parallaxLayers = document.querySelectorAll('.parallax-bg[data-speed]');

  function updateParallax() {
    if (!parallaxEnabled) return;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    parallaxLayers.forEach(function (layer) {
      var section = layer.parentElement;
      var rect = section.getBoundingClientRect();

      // Only process visible sections (with generous margin)
      if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;

      var speed = parseFloat(layer.dataset.speed) || 0.2;
      // Calculate offset relative to section's center in viewport
      var sectionCenter = rect.top + rect.height / 2;
      var viewportCenter = viewportHeight / 2;
      var offset = (sectionCenter - viewportCenter) * speed;

      layer.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  // --- Orb floating animation via parallax ---
  // Orbs within parallax-bg layers already move with the layer.
  // Add subtle individual movement for extra depth.
  const orbs = document.querySelectorAll('.orb');
  function updateOrbs() {
    if (!parallaxEnabled) return;

    var scrollTop = window.scrollY;
    orbs.forEach(function (orb, i) {
      // Each orb gets a slightly different speed based on index
      var speed = 0.02 + (i % 5) * 0.008;
      var direction = i % 2 === 0 ? 1 : -1;
      var offset = scrollTop * speed * direction;
      var horizontalDrift = Math.sin(scrollTop * 0.001 + i) * 10;
      orb.style.transform = 'translate(' + horizontalDrift + 'px, ' + offset + 'px)';
    });
  }

  // --- Showcase scroll-driven phases ---
  var showcaseScroll = document.getElementById('showcase');
  var showcaseLayers, showcasePhaseNames, showcaseCurrentPhase;
  var showcaseDots;
  if (showcaseScroll) {
    showcaseLayers = [
      document.getElementById('phase0'),
      document.getElementById('phase1'),
      document.getElementById('phase2')
    ];
    showcaseDots = document.getElementById('showcaseDots');
    showcasePhaseNames = ['The Problem', 'The Hack', 'The AI-Coded Solution'];
    showcaseCurrentPhase = -1;
  }

  // Flying dots: hero thumbnails converge from tree to pivot row
  function animateDotsConverge() {
    if (!showcaseDots) return;

    // Source: hero thumb positions in phase 0 (read while phase 0 is still visible)
    var heroThumbs = showcaseLayers[0].querySelectorAll('.fb-tree-ad--hero .fb-thumb--hero');
    // Target: hero thumb position in phase 1
    var targetThumb = showcaseLayers[1].querySelector('.xl-row--hero .xl-thumb');
    if (!heroThumbs.length || !targetThumb) return;

    var stickyEl = showcaseScroll.querySelector('.showcase-sticky');
    var stickyRect = stickyEl.getBoundingClientRect();

    // Collect source positions before phase swap hides them
    var sources = [];
    heroThumbs.forEach(function (thumb) {
      var r = thumb.getBoundingClientRect();
      sources.push({
        x: r.left - stickyRect.left,
        y: r.top - stickyRect.top
      });
    });

    // We need phase 1 visible to get target rect — it's about to become active,
    // so briefly force it visible
    showcaseLayers[1].style.opacity = '1';
    showcaseLayers[1].style.transform = 'translateY(0)';
    var tRect = targetThumb.getBoundingClientRect();
    var targetX = tRect.left - stickyRect.left + tRect.width / 2 - 14;
    var targetY = tRect.top - stickyRect.top + tRect.height / 2 - 14;
    showcaseLayers[1].style.opacity = '';
    showcaseLayers[1].style.transform = '';

    sources.forEach(function (src, i) {
      var dot = document.createElement('div');
      dot.className = 'showcase-dot';
      // Position at source using transform (GPU-composited)
      dot.style.left = '0';
      dot.style.top = '0';
      dot.style.transform = 'translate(' + src.x + 'px, ' + src.y + 'px)';
      showcaseDots.appendChild(dot);

      var delay = i * 60;
      var duration = 650;

      dot.animate([
        {
          transform: 'translate(' + src.x + 'px, ' + src.y + 'px) scale(1)',
          opacity: 1
        },
        {
          transform: 'translate(' + targetX + 'px, ' + targetY + 'px) scale(0.7)',
          opacity: 0,
          offset: 0.85
        },
        {
          transform: 'translate(' + targetX + 'px, ' + targetY + 'px) scale(0)',
          opacity: 0
        }
      ], {
        duration: duration,
        delay: delay,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });
    });

    // Clean up after all dots are done
    var totalTime = sources.length * 60 + 700;
    setTimeout(function () {
      showcaseDots.innerHTML = '';
    }, totalTime);
  }

  function updateShowcase() {
    if (!showcaseScroll) return;
    var rect = showcaseScroll.getBoundingClientRect();
    var scrollHeight = showcaseScroll.offsetHeight - window.innerHeight;
    var scrolled = -rect.top;
    var progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

    var phase;
    if (progress < 0.3) phase = 0;
    else if (progress < 0.6) phase = 1;
    else phase = 2;

    if (phase !== showcaseCurrentPhase) {
      var prevPhase = showcaseCurrentPhase;
      showcaseCurrentPhase = phase;

      // Trigger flying dots on 0→1 transition
      if (prevPhase === 0 && phase === 1) {
        animateDotsConverge();
      }

      showcaseLayers.forEach(function (l, i) {
        if (i === phase) {
          l.classList.add('showcase-layer--active');
        } else {
          l.classList.remove('showcase-layer--active');
        }
      });

    }
  }

  // --- Scroll Handler (throttled via rAF) ---
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateParallax();
        updateOrbs();
        updateShowcase();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Scroll Reveal (Intersection Observer) ---
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Showcase: initial state ---
  updateShowcase();

  // --- Context Window Panel Pulse ---
  var overflowPanel = document.getElementById('ctxPanel3');
  if (overflowPanel) {
    var pulseObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            overflowPanel.style.animation = 'pulse-border 2s ease-in-out infinite';
          }
        });
      },
      { threshold: 0.5 }
    );
    pulseObserver.observe(overflowPanel);
  }

  // Add pulse keyframes
  var style = document.createElement('style');
  style.textContent =
    '@keyframes pulse-border {' +
    '0%, 100% { border-color: var(--coral); box-shadow: 0 0 0 0 rgba(255, 107, 92, 0); }' +
    '50% { border-color: var(--coral); box-shadow: 0 0 20px 4px rgba(255, 107, 92, 0.15); }' +
    '}';
  document.head.appendChild(style);

  // --- Expand/Collapse ---
  window.toggleExpand = function (btn) {
    btn.classList.toggle('open');
    var content = btn.nextElementSibling;
    content.classList.toggle('open');
  };

  // --- Magnetic Repulsion on Stickers ---
  // Stickers flee from the cursor like reverse-polarity magnets
  var stickers = document.querySelectorAll('.sticker');
  if (stickers.length && !isTouchDevice && !isMobile) {
    var REPEL_RADIUS = 180;   // px — how close before they react
    var REPEL_STRENGTH = 40;  // px — max displacement at closest range
    var EASE_BACK = 0.08;     // how fast they drift back (0–1, lower = softer)

    // Store each sticker's resting offset and current displacement
    var stickerState = [];
    stickers.forEach(function (s, i) {
      stickerState.push({ dx: 0, dy: 0, phase: i * 2.1 });
      // Disable CSS animation — JS handles bob + repulsion
      s.style.animation = 'none';
      s.style.willChange = 'transform';
    });

    var mouseX = -9999, mouseY = -9999;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // When mouse leaves the viewport, let stickers drift home
    document.addEventListener('mouseleave', function () {
      mouseX = -9999;
      mouseY = -9999;
    });

    function tickRepel() {
      stickers.forEach(function (s, i) {
        var rect = s.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;

        var distX = cx - mouseX;
        var distY = cy - mouseY;
        var dist = Math.sqrt(distX * distX + distY * distY);

        var state = stickerState[i];

        if (dist < REPEL_RADIUS && dist > 0) {
          // Inverse falloff: closer = stronger push
          var force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          var angle = Math.atan2(distY, distX);
          state.dx += (Math.cos(angle) * force - state.dx) * 0.15;
          state.dy += (Math.sin(angle) * force - state.dy) * 0.15;
        } else {
          // Ease back to resting position
          state.dx *= (1 - EASE_BACK);
          state.dy *= (1 - EASE_BACK);
        }

        // Kill sub-pixel jitter
        if (Math.abs(state.dx) < 0.1 && Math.abs(state.dy) < 0.1) {
          state.dx = 0;
          state.dy = 0;
        }

        // Gentle bob (replaces CSS float animation)
        var bob = Math.sin(Date.now() * 0.001 + state.phase) * 8;

        s.style.transform =
          'rotate(var(--rotate, 0deg)) translate(' +
          state.dx.toFixed(1) + 'px, ' +
          (state.dy + bob).toFixed(1) + 'px)';
      });
      requestAnimationFrame(tickRepel);
    }
    requestAnimationFrame(tickRepel);
  }

  // --- Initial state ---
  updateProgress();
  if (parallaxEnabled) {
    updateParallax();
    updateOrbs();
  }

  // --- Handle resize (recalc mobile detection) ---
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Note: parallaxEnabled is set once on load.
      // For a resize from desktop to mobile, a page reload would be needed.
      // This is acceptable per spec (graceful degradation on load).
    }, 250);
  });
})();
