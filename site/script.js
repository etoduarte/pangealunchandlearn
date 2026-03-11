/* ============================================================
   PANGEA LUNCH & LEARN — Parallax Storybook
   Vanilla JS: parallax engine, scroll reveals, tooltips
   Zero dependencies
   ============================================================ */

(function () {
  'use strict';

  // --- Feature Detection ---
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var isMobile = window.innerWidth <= 768;
  var parallaxEnabled = !prefersReducedMotion && !isTouchDevice && !isMobile;

  // --- Scroll Progress Bar ---
  var progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = 'scaleX(' + progress + ')';
  }

  // --- Parallax Engine ---
  var parallaxLayers = document.querySelectorAll('.parallax-bg[data-speed]');

  function updateParallax() {
    if (!parallaxEnabled) return;

    var scrollTop = window.scrollY;
    var viewportHeight = window.innerHeight;

    parallaxLayers.forEach(function (layer) {
      var section = layer.parentElement;
      var rect = section.getBoundingClientRect();

      if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;

      var speed = parseFloat(layer.dataset.speed) || 0.2;
      var sectionCenter = rect.top + rect.height / 2;
      var viewportCenter = viewportHeight / 2;
      var offset = (sectionCenter - viewportCenter) * speed;

      layer.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  // --- Orb floating ---
  var orbs = document.querySelectorAll('.orb');
  function updateOrbs() {
    if (!parallaxEnabled) return;

    var scrollTop = window.scrollY;
    orbs.forEach(function (orb, i) {
      var speed = 0.02 + (i % 5) * 0.008;
      var direction = i % 2 === 0 ? 1 : -1;
      var offset = scrollTop * speed * direction;
      var horizontalDrift = Math.sin(scrollTop * 0.001 + i) * 10;
      orb.style.transform = 'translate(' + horizontalDrift + 'px, ' + offset + 'px)';
    });
  }

  // --- Scroll Handler (throttled via rAF) ---
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateParallax();
        updateOrbs();
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

  // --- Signal Map Activation ---
  var smPlot = document.getElementById('smPlot');
  if (smPlot) {
    var smObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('sm-plot--active');
          }
        });
      },
      { threshold: 0.3 }
    );
    smObserver.observe(smPlot);
  }

  // --- Interactive Scoring Demo ---
  var cacSlider = document.getElementById('cacBenchSlider');
  var ctrSlider = document.getElementById('ctrBenchSlider');

  var CAC_ACTUAL = 500; // cents ($5.00)
  var CTR_ACTUAL = 3.41; // percent

  function formatDollars(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  function scoreClass(score) {
    if (score >= 110) return 'score-good';
    if (score >= 90) return 'score-ok';
    return 'score-bad';
  }

  function scoreLabel(score) {
    var ratio = (score / 100).toFixed(1);
    if (score > 100) return ratio + 'x better than benchmark';
    if (score === 100) return 'Matches benchmark exactly';
    return ratio + 'x of benchmark';
  }

  function updateCAC() {
    var benchCents = parseInt(cacSlider.value);
    var score = Math.round((benchCents / CAC_ACTUAL) * 100);

    document.getElementById('cacBenchDisplay').textContent = formatDollars(benchCents);
    document.getElementById('cacFormula').innerHTML =
      '(' + formatDollars(benchCents) + ' / ' + formatDollars(CAC_ACTUAL) + ') &times; 100';

    var scoreEl = document.getElementById('cacScore');
    scoreEl.textContent = score;
    scoreEl.className = 'scoring-result-score ' + scoreClass(score);

    var labelEl = document.getElementById('cacLabel');
    labelEl.textContent = scoreLabel(score);
  }

  function updateCTR() {
    var benchBps = parseInt(ctrSlider.value); // basis points (200 = 2.00%)
    var benchPct = benchBps / 100;
    var score = Math.round((CTR_ACTUAL / benchPct) * 100);

    document.getElementById('ctrBenchDisplay').textContent = benchPct.toFixed(2) + '%';
    document.getElementById('ctrFormula').innerHTML =
      '(' + CTR_ACTUAL.toFixed(2) + '% / ' + benchPct.toFixed(2) + '%) &times; 100';

    var scoreEl = document.getElementById('ctrScore');
    scoreEl.textContent = score;
    scoreEl.className = 'scoring-result-score ' + scoreClass(score);

    var labelEl = document.getElementById('ctrLabel');
    labelEl.textContent = scoreLabel(score);
  }

  if (cacSlider) {
    cacSlider.addEventListener('input', updateCAC);
    updateCAC();
  }
  if (ctrSlider) {
    ctrSlider.addEventListener('input', updateCTR);
    updateCTR();
  }

  // --- Tooltip System ---
  var tooltipData = {
    'context-window': "The AI\u2019s finite working memory. Everything in the conversation \u2014 your messages, its responses, files \u2014 goes into this container. Performance starts degrading well before it fills up.",
    'context-degradation': "Why long AI conversations get worse. Your carefully crafted first message gets buried by iterative back-and-forth. The AI isn\u2019t getting dumber \u2014 your good input is getting drowned out.",
    'brd': "Business Requirements Document. A structured specification of what needs to be built and why \u2014 the output of the Cal meeting.",
    'user-stories': "Development-ready specs written from the user\u2019s perspective: \u2018As a [role], I want [thing] so that [reason].\u2019 The format that bridges business intent and engineering work.",
    'adversarial-review': "A separate AI whose job is to find problems, not be helpful. Structured disagreement with a human mediator deciding what matters.",
    'fence': "Setting boundaries instead of step-by-step instructions. A leash says \u2018go here.\u2019 A fence says \u2018go anywhere, but not past there.\u2019 Freedom within constraints.",
    'sacred-code': "Code protection using non-standard language. Standard comments like // DO NOT MODIFY get ignored because AIs have seen millions of them. Unusual, dramatic language creates friction that makes the AI stop and check.",
    'shared-language': "Metaphors and shorthand that pack more meaning into less context. A single evocative phrase can communicate problem, emotion, and desired action all at once."
  };

  var tooltipPopup = document.getElementById('tooltipPopup');
  var tooltipContent = document.getElementById('tooltipContent');
  var activeTooltipTerm = null;
  var hideTimeout = null;

  function showTooltip(term) {
    var key = term.getAttribute('data-tooltip');
    var text = tooltipData[key];
    if (!text) return;

    activeTooltipTerm = term;
    tooltipContent.textContent = text;

    // Position tooltip above the term
    var rect = term.getBoundingClientRect();
    var popupWidth = 320;
    var margin = 12;

    // Horizontal: center above the term, clamp to viewport
    var left = rect.left + rect.width / 2 - popupWidth / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popupWidth - margin));

    // Vertical: above the term
    tooltipPopup.style.left = left + 'px';
    tooltipPopup.style.width = popupWidth + 'px';

    // Temporarily show to measure height
    tooltipPopup.style.visibility = 'hidden';
    tooltipPopup.classList.add('visible');
    var popupHeight = tooltipPopup.offsetHeight;
    tooltipPopup.classList.remove('visible');
    tooltipPopup.style.visibility = '';

    var top = rect.top - popupHeight - 8;
    // If not enough room above, show below
    if (top < margin) {
      top = rect.bottom + 8;
    }
    tooltipPopup.style.top = top + 'px';

    clearTimeout(hideTimeout);
    tooltipPopup.classList.add('visible');
    tooltipPopup.setAttribute('aria-hidden', 'false');
  }

  function hideTooltip() {
    hideTimeout = setTimeout(function () {
      tooltipPopup.classList.remove('visible');
      tooltipPopup.setAttribute('aria-hidden', 'true');
      activeTooltipTerm = null;
    }, 150);
  }

  // Attach events to all tooltip terms
  document.querySelectorAll('.tooltip-term').forEach(function (term) {
    // Mouse events
    term.addEventListener('mouseenter', function () { showTooltip(term); });
    term.addEventListener('mouseleave', hideTooltip);

    // Touch/click toggle for mobile
    term.addEventListener('click', function (e) {
      e.preventDefault();
      if (activeTooltipTerm === term && tooltipPopup.classList.contains('visible')) {
        tooltipPopup.classList.remove('visible');
        tooltipPopup.setAttribute('aria-hidden', 'true');
        activeTooltipTerm = null;
      } else {
        showTooltip(term);
      }
    });
  });

  // Keep tooltip visible when hovering over it
  if (tooltipPopup) {
    tooltipPopup.addEventListener('mouseenter', function () {
      clearTimeout(hideTimeout);
    });
    tooltipPopup.addEventListener('mouseleave', hideTooltip);
  }

  // Close tooltip on scroll or click elsewhere
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.tooltip-term') && !e.target.closest('.tooltip-popup')) {
      tooltipPopup.classList.remove('visible');
      tooltipPopup.setAttribute('aria-hidden', 'true');
      activeTooltipTerm = null;
    }
  });

  // --- Magnetic Repulsion on Stickers ---
  var stickers = document.querySelectorAll('.sticker');
  if (stickers.length && !isTouchDevice && !isMobile) {
    var REPEL_RADIUS = 180;
    var REPEL_STRENGTH = 40;
    var EASE_BACK = 0.08;

    var stickerState = [];
    stickers.forEach(function (s, i) {
      stickerState.push({ dx: 0, dy: 0, phase: i * 2.1 });
      s.style.animation = 'none';
      s.style.willChange = 'transform';
    });

    var mouseX = -9999, mouseY = -9999;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
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
          var force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          var angle = Math.atan2(distY, distX);
          state.dx += (Math.cos(angle) * force - state.dx) * 0.15;
          state.dy += (Math.sin(angle) * force - state.dy) * 0.15;
        } else {
          state.dx *= (1 - EASE_BACK);
          state.dy *= (1 - EASE_BACK);
        }

        if (Math.abs(state.dx) < 0.1 && Math.abs(state.dy) < 0.1) {
          state.dx = 0;
          state.dy = 0;
        }

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

  // --- Key Concepts Slideshow ---
  (function () {
    var slides = document.querySelectorAll('#kcSlideshow .kc-slide');
    var dots = document.querySelectorAll('#kcSlideshow .kc-dot-nav');
    var prevBtn = document.getElementById('kcPrev');
    var nextBtn = document.getElementById('kcNext');
    if (!slides.length || !prevBtn || !nextBtn) return;

    var current = 0;

    // --- Context Window Animation ---
    var ctxMessages = [
      { type: 'setup', text: '⚙ System prompt loaded' },
      { type: 'user', text: 'Build me a dashboard' },
      { type: 'ai', text: 'Sure! Here\'s the layout...' },
      { type: 'user', text: 'Add a chart to the sidebar' },
      { type: 'ai', text: 'Done. I added a bar chart...' },
      { type: 'user', text: 'Now add filtering by date' },
      { type: 'ai', text: 'Added date picker and filter logic' },
      { type: 'user', text: 'Make the header sticky' },
      { type: 'ai', text: 'Sticky header with shadow on scroll' },
      { type: 'user', text: 'Add dark mode toggle' },
      { type: 'ai', text: 'Done! Toggle in the top right...' },
      { type: 'user', text: 'Why did the sidebar break?' },
      { type: 'ai', text: 'I don\'t see a sidebar in the project...' },
    ];
    var ctxTimer = null;

    function runCtxAnimation() {
      var win = document.getElementById('kcCtxWindow');
      var body = document.getElementById('kcCtxBody');
      var fill = document.getElementById('kcCtxFill');
      var pct = document.getElementById('kcCtxPct');
      if (!win || !body) return;

      // Reset
      clearInterval(ctxTimer);
      body.innerHTML = '';
      win.classList.remove('kc-ctx--overflow');
      fill.style.width = '0%';
      pct.textContent = '0%';

      var step = 0;
      var total = ctxMessages.length;

      ctxTimer = setInterval(function () {
        if (step >= total) {
          clearInterval(ctxTimer);
          return;
        }

        var msg = ctxMessages[step];
        var bubble = document.createElement('div');
        bubble.className = 'kc-ctx-bubble kc-ctx-bubble--' + msg.type;
        bubble.textContent = msg.text;
        body.appendChild(bubble);

        // Scroll to bottom
        body.scrollTop = body.scrollHeight;

        var percent = Math.round(((step + 1) / total) * 100);
        fill.style.width = percent + '%';
        pct.textContent = percent + '%';

        // At 80%+, mark overflow
        if (percent >= 85) {
          win.classList.add('kc-ctx--overflow');
          // Strike through the setup bubble
          var setupBubble = body.querySelector('.kc-ctx-bubble--setup');
          if (setupBubble) {
            setupBubble.classList.add('kc-ctx-bubble--lost');
            setupBubble.textContent = '⚙ System prompt (forgotten)';
          }
        }

        step++;
      }, 600);
    }

    function stopCtxAnimation() {
      clearInterval(ctxTimer);
    }

    var slidesContainer = document.querySelector('.kc-slides');

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Lock current height before swap
      var startHeight = slidesContainer.offsetHeight;
      slidesContainer.style.height = startHeight + 'px';

      slides[current].classList.remove('kc-slide--active');
      dots[current].classList.remove('kc-dot-nav--active');
      current = index;
      slides[current].classList.add('kc-slide--active');
      dots[current].classList.add('kc-dot-nav--active');

      // Measure new height and animate
      var endHeight = slidesContainer.scrollHeight;
      requestAnimationFrame(function () {
        slidesContainer.style.height = endHeight + 'px';
      });
      // Clear fixed height after transition
      slidesContainer.addEventListener('transitionend', function handler() {
        slidesContainer.style.height = '';
        slidesContainer.removeEventListener('transitionend', handler);
      });

      // Trigger context window animation on slide 1
      if (current === 1) {
        runCtxAnimation();
      } else {
        stopCtxAnimation();
      }
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(current - 1);
    });
    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(current + 1);
    });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(parseInt(dot.getAttribute('data-goto')));
      });
    });
  })();

  // --- Plugin Filters ---
  var pluginFilters = document.getElementById('kcPluginFilters');
  if (pluginFilters) {
    pluginFilters.addEventListener('change', function () {
      var checked = [];
      pluginFilters.querySelectorAll('input:checked').forEach(function (cb) {
        checked.push(cb.getAttribute('data-cat'));
      });
      document.querySelectorAll('#kcPluginList .kc-plugin-item').forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        if (checked.indexOf(cat) >= 0) {
          item.style.display = '';
          item.classList.remove('kc-plugin-item--hidden');
        } else {
          item.style.display = 'none';
          item.classList.add('kc-plugin-item--hidden');
        }
      });
    });
  }

  // --- Initial state ---
  updateProgress();
  if (parallaxEnabled) {
    updateParallax();
    updateOrbs();
  }
})();
