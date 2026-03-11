/* ============================================================
   ANNOTATION OVERLAY
   Press Shift+C to toggle annotation mode.
   Click any element to leave a comment. Comments save to
   localStorage and can be exported as JSON for Claude.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'pangea-annotations';
  var active = false;
  var annotations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  var pins = [];
  var panel = null;
  var hoverOutline = null;

  // --- Unique selector for an element ---
  function getSelector(el) {
    if (el.id) return '#' + el.id;
    var path = [];
    while (el && el !== document.body && el !== document.documentElement) {
      var tag = el.tagName.toLowerCase();
      var parent = el.parentElement;
      if (parent) {
        var siblings = Array.from(parent.children).filter(function (c) {
          return c.tagName === el.tagName;
        });
        if (siblings.length > 1) {
          tag += ':nth-of-type(' + (siblings.indexOf(el) + 1) + ')';
        }
      }
      path.unshift(tag);
      el = parent;
    }
    return path.join(' > ');
  }

  // --- Get visible text preview ---
  function getPreview(el) {
    var text = el.textContent || '';
    text = text.replace(/\s+/g, ' ').trim();
    return text.length > 80 ? text.substring(0, 80) + '...' : text;
  }

  // --- Save to localStorage ---
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
  }

  // --- Create hover outline ---
  function createHoverOutline() {
    hoverOutline = document.createElement('div');
    hoverOutline.style.cssText =
      'position:fixed;pointer-events:none;border:2px solid #FF6B5C;border-radius:4px;' +
      'background:rgba(255,107,92,0.08);z-index:99998;display:none;transition:all 0.1s ease;';
    document.body.appendChild(hoverOutline);
  }

  // --- Create pin on element ---
  function createPin(annotation, index) {
    var target = document.querySelector(annotation.selector);
    if (!target) return;

    var pin = document.createElement('div');
    pin.className = 'anno-pin';
    pin.textContent = index + 1;
    pin.title = annotation.comment;
    pin.style.cssText =
      'position:absolute;width:24px;height:24px;background:#FF6B5C;color:#fff;' +
      'border-radius:50%;font-size:12px;font-weight:700;display:flex;align-items:center;' +
      'justify-content:center;cursor:pointer;z-index:99997;box-shadow:0 2px 8px rgba(0,0,0,0.3);' +
      'font-family:Inter,system-ui,sans-serif;line-height:1;';

    // Position relative to target
    function positionPin() {
      var rect = target.getBoundingClientRect();
      pin.style.position = 'fixed';
      pin.style.left = (rect.left - 12) + 'px';
      pin.style.top = (rect.top - 12) + 'px';
    }
    positionPin();

    pin.addEventListener('click', function (e) {
      e.stopPropagation();
      showEditDialog(annotation, index);
    });

    document.body.appendChild(pin);
    pins.push({ el: pin, target: target, reposition: positionPin });
  }

  // --- Reposition all pins on scroll ---
  function repositionPins() {
    pins.forEach(function (p) { p.reposition(); });
  }

  // --- Render all pins ---
  function renderPins() {
    pins.forEach(function (p) { p.el.remove(); });
    pins = [];
    annotations.forEach(function (a, i) { createPin(a, i); });
  }

  // --- Show comment input dialog ---
  function showCommentDialog(el) {
    var existing = document.getElementById('anno-dialog');
    if (existing) existing.remove();

    var dialog = document.createElement('div');
    dialog.id = 'anno-dialog';
    dialog.style.cssText =
      'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'background:#1a1a2e;color:#f0f0f0;padding:24px;border-radius:12px;z-index:100001;' +
      'width:400px;max-width:90vw;font-family:Inter,system-ui,sans-serif;' +
      'box-shadow:0 20px 60px rgba(0,0,0,0.5);';

    var preview = getPreview(el);
    dialog.innerHTML =
      '<div style="font-size:12px;color:#888;margin-bottom:4px;">Commenting on:</div>' +
      '<div style="font-size:14px;color:#FF6B5C;margin-bottom:16px;font-style:italic;">"' +
      preview.replace(/</g, '&lt;') + '"</div>' +
      '<textarea id="anno-input" placeholder="Your comment..." style="' +
      'width:100%;height:80px;background:#0d0d1a;color:#f0f0f0;border:1px solid #333;' +
      'border-radius:8px;padding:12px;font-size:14px;font-family:Inter,system-ui,sans-serif;' +
      'resize:vertical;box-sizing:border-box;"></textarea>' +
      '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button id="anno-save" style="flex:1;padding:10px;background:#FF6B5C;color:#fff;' +
      'border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">Save</button>' +
      '<button id="anno-cancel" style="flex:1;padding:10px;background:#333;color:#aaa;' +
      'border:none;border-radius:8px;font-size:14px;cursor:pointer;">Cancel</button>' +
      '</div>';

    // Backdrop
    var backdrop = document.createElement('div');
    backdrop.id = 'anno-backdrop';
    backdrop.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:100000;';

    document.body.appendChild(backdrop);
    document.body.appendChild(dialog);

    var input = document.getElementById('anno-input');
    input.focus();

    function cleanup() {
      dialog.remove();
      backdrop.remove();
    }

    document.getElementById('anno-save').addEventListener('click', function () {
      var comment = input.value.trim();
      if (comment) {
        annotations.push({
          selector: getSelector(el),
          tag: el.tagName.toLowerCase(),
          preview: preview,
          comment: comment,
          timestamp: new Date().toISOString()
        });
        save();
        renderPins();
        updatePanel();
      }
      cleanup();
    });

    document.getElementById('anno-cancel').addEventListener('click', cleanup);
    backdrop.addEventListener('click', cleanup);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        document.getElementById('anno-save').click();
      }
      if (e.key === 'Escape') cleanup();
    });
  }

  // --- Edit/delete dialog ---
  function showEditDialog(annotation, index) {
    var existing = document.getElementById('anno-dialog');
    if (existing) existing.remove();

    var dialog = document.createElement('div');
    dialog.id = 'anno-dialog';
    dialog.style.cssText =
      'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'background:#1a1a2e;color:#f0f0f0;padding:24px;border-radius:12px;z-index:100001;' +
      'width:400px;max-width:90vw;font-family:Inter,system-ui,sans-serif;' +
      'box-shadow:0 20px 60px rgba(0,0,0,0.5);';

    dialog.innerHTML =
      '<div style="font-size:12px;color:#888;margin-bottom:4px;">Comment #' + (index + 1) + ':</div>' +
      '<div style="font-size:14px;color:#FF6B5C;margin-bottom:16px;font-style:italic;">"' +
      annotation.preview.replace(/</g, '&lt;') + '"</div>' +
      '<textarea id="anno-input" style="' +
      'width:100%;height:80px;background:#0d0d1a;color:#f0f0f0;border:1px solid #333;' +
      'border-radius:8px;padding:12px;font-size:14px;font-family:Inter,system-ui,sans-serif;' +
      'resize:vertical;box-sizing:border-box;">' + annotation.comment + '</textarea>' +
      '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button id="anno-save" style="flex:1;padding:10px;background:#FF6B5C;color:#fff;' +
      'border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">Update</button>' +
      '<button id="anno-delete" style="padding:10px 16px;background:#661a1a;color:#ff8888;' +
      'border:none;border-radius:8px;font-size:14px;cursor:pointer;">Delete</button>' +
      '<button id="anno-cancel" style="padding:10px 16px;background:#333;color:#aaa;' +
      'border:none;border-radius:8px;font-size:14px;cursor:pointer;">Cancel</button>' +
      '</div>';

    var backdrop = document.createElement('div');
    backdrop.id = 'anno-backdrop';
    backdrop.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:100000;';

    document.body.appendChild(backdrop);
    document.body.appendChild(dialog);
    document.getElementById('anno-input').focus();

    function cleanup() { dialog.remove(); backdrop.remove(); }

    document.getElementById('anno-save').addEventListener('click', function () {
      var comment = document.getElementById('anno-input').value.trim();
      if (comment) {
        annotations[index].comment = comment;
        save();
        renderPins();
        updatePanel();
      }
      cleanup();
    });

    document.getElementById('anno-delete').addEventListener('click', function () {
      annotations.splice(index, 1);
      save();
      renderPins();
      updatePanel();
      cleanup();
    });

    document.getElementById('anno-cancel').addEventListener('click', cleanup);
    backdrop.addEventListener('click', cleanup);
  }

  // --- Side panel ---
  function createPanel() {
    panel = document.createElement('div');
    panel.id = 'anno-panel';
    panel.style.cssText =
      'position:fixed;right:0;top:0;width:320px;height:100vh;background:#1a1a2e;' +
      'color:#f0f0f0;z-index:99999;overflow-y:auto;transform:translateX(100%);' +
      'transition:transform 0.3s ease;font-family:Inter,system-ui,sans-serif;' +
      'box-shadow:-4px 0 20px rgba(0,0,0,0.3);';
    document.body.appendChild(panel);
    updatePanel();
  }

  function updatePanel() {
    if (!panel) return;
    var html =
      '<div style="padding:20px;border-bottom:1px solid #333;display:flex;align-items:center;justify-content:space-between;">' +
      '<div><strong style="font-size:16px;">Comments</strong> <span style="color:#888;">(' + annotations.length + ')</span></div>' +
      '<div style="display:flex;gap:8px;">' +
      '<button id="anno-export" style="padding:6px 12px;background:#333;color:#aaa;border:none;' +
      'border-radius:6px;font-size:12px;cursor:pointer;" title="Export JSON">Export</button>' +
      '<button id="anno-clear" style="padding:6px 12px;background:#661a1a;color:#ff8888;border:none;' +
      'border-radius:6px;font-size:12px;cursor:pointer;" title="Clear all">Clear</button>' +
      '</div></div>';

    if (annotations.length === 0) {
      html += '<div style="padding:20px;color:#666;font-size:14px;">Click any element on the page to leave a comment.</div>';
    } else {
      annotations.forEach(function (a, i) {
        html +=
          '<div class="anno-list-item" data-index="' + i + '" style="padding:16px 20px;border-bottom:1px solid #222;cursor:pointer;">' +
          '<div style="font-size:12px;color:#FF6B5C;margin-bottom:4px;">' + a.tag + '</div>' +
          '<div style="font-size:13px;color:#888;font-style:italic;margin-bottom:8px;">"' +
          a.preview.replace(/</g, '&lt;').substring(0, 60) + '"</div>' +
          '<div style="font-size:14px;line-height:1.4;">' + a.comment.replace(/</g, '&lt;') + '</div>' +
          '</div>';
      });
    }

    panel.innerHTML = html;

    // Wire up buttons
    var exportBtn = document.getElementById('anno-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var blob = new Blob([JSON.stringify(annotations, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'annotations.json';
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    var clearBtn = document.getElementById('anno-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Clear all comments?')) {
          annotations = [];
          save();
          renderPins();
          updatePanel();
        }
      });
    }

    // Click list items to scroll to element
    panel.querySelectorAll('.anno-list-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var idx = parseInt(item.getAttribute('data-index'));
        var target = document.querySelector(annotations[idx].selector);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.style.outline = '3px solid #FF6B5C';
          target.style.outlineOffset = '4px';
          setTimeout(function () {
            target.style.outline = '';
            target.style.outlineOffset = '';
          }, 2000);
        }
      });
    });
  }

  // --- Toggle annotation mode ---
  function toggle() {
    active = !active;

    if (active) {
      if (!panel) createPanel();
      if (!hoverOutline) createHoverOutline();
      panel.style.transform = 'translateX(0)';
      hoverOutline.style.display = 'block';
      renderPins();
      document.body.style.cursor = 'crosshair';
      showBadge(true);
    } else {
      if (panel) panel.style.transform = 'translateX(100%)';
      if (hoverOutline) hoverOutline.style.display = 'none';
      pins.forEach(function (p) { p.el.remove(); });
      pins = [];
      document.body.style.cursor = '';
      showBadge(false);
    }
  }

  // --- Mode badge ---
  var badge = null;
  function showBadge(on) {
    if (!badge) {
      badge = document.createElement('div');
      badge.style.cssText =
        'position:fixed;top:12px;left:50%;transform:translateX(-50%);padding:8px 16px;' +
        'background:#FF6B5C;color:#fff;border-radius:20px;font-size:13px;font-weight:600;' +
        'font-family:Inter,system-ui,sans-serif;z-index:100002;pointer-events:none;' +
        'transition:opacity 0.2s;box-shadow:0 4px 12px rgba(255,107,92,0.4);';
      document.body.appendChild(badge);
    }
    badge.textContent = on ? 'COMMENT MODE — Click any element (Ctrl+. to exit)' : '';
    badge.style.opacity = on ? '1' : '0';
  }

  // --- Event listeners ---
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === '.') {
      e.preventDefault();
      toggle();
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (!active || !hoverOutline) return;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el === document.body || el === document.documentElement ||
        el.closest('#anno-panel') || el.closest('#anno-dialog') ||
        el.closest('#anno-backdrop') || el.classList.contains('anno-pin')) {
      hoverOutline.style.display = 'none';
      return;
    }
    var rect = el.getBoundingClientRect();
    hoverOutline.style.display = 'block';
    hoverOutline.style.left = rect.left - 2 + 'px';
    hoverOutline.style.top = rect.top - 2 + 'px';
    hoverOutline.style.width = rect.width + 4 + 'px';
    hoverOutline.style.height = rect.height + 4 + 'px';
  });

  document.addEventListener('click', function (e) {
    if (!active) return;
    var el = e.target;
    if (el.closest('#anno-panel') || el.closest('#anno-dialog') ||
        el.closest('#anno-backdrop') || el.classList.contains('anno-pin')) return;

    e.preventDefault();
    e.stopPropagation();
    showCommentDialog(el);
  }, true);

  window.addEventListener('scroll', function () {
    if (active) repositionPins();
  }, { passive: true });

  // --- Log instructions to console ---
  console.log(
    '%c ANNOTATIONS %c Press Ctrl+. to toggle comment mode',
    'background:#FF6B5C;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;',
    'color:#888;'
  );
})();
