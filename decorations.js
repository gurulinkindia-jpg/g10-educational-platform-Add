/* Lightweight Canva-style patterns, frames, shapes and emoji overlays. */
(() => {
  const controls = document.querySelector('.controls');
  const fields = document.getElementById('fields');
  const panel = document.createElement('section');
  panel.className = 'field';
  panel.innerHTML = `
    <h2 style="font-size:17px;margin:14px 0 8px">Design elements</h2>
    <label for="designPattern">Background pattern</label>
    <select id="designPattern">
      <option value="none">None</option>
      <option value="dots">Dots</option>
      <option value="grid">Grid</option>
      <option value="diagonal">Diagonal lines</option>
      <option value="confetti">Confetti</option>
      <option value="waves">Waves</option>
    </select>
    <label for="designFrame">Frame</label>
    <select id="designFrame">
      <option value="none">None</option>
      <option value="simple">Simple</option>
      <option value="double">Double</option>
      <option value="corners">Corner accents</option>
      <option value="rounded">Rounded</option>
    </select>
    <div class="row">
      <label>Design colour <input id="designColor" type="color" value="#ffda70"></label>
      <label>Opacity <input id="designOpacity" type="number" min="10" max="100" value="75" style="width:66px">%</label>
    </div>
    <label for="designShape">Add a shape</label>
    <div class="row">
      <select id="designShape" style="flex:1">
        <option value="circle">Circle</option>
        <option value="rectangle">Rounded rectangle</option>
        <option value="triangle">Triangle</option>
        <option value="star">Star</option>
        <option value="heart">Heart</option>
        <option value="speech">Speech bubble</option>
      </select>
      <button id="addDesignShape" type="button">Add shape</button>
    </div>
    <label for="designEmoji">Add emoji or symbol</label>
    <div class="row">
      <input id="designEmoji" type="text" value="⭐" maxlength="8" aria-label="Emoji or symbol" style="width:90px">
      <button id="addDesignEmoji" type="button">Add emoji</button>
    </div>
    <label for="designSize">Selected element size <output id="designSizeValue">120 px</output></label>
    <input id="designSize" type="range" min="30" max="420" step="5" value="120">
    <div class="row">
      <button id="removeDesignElement" type="button">Remove selected element</button>
      <button id="clearDesignElements" type="button">Clear designs</button>
    </div>
    <p class="hint">Click a shape or emoji on the card, then drag it. Use the size, colour and opacity controls to customise the selected element.</p>
  `;
  controls.insertBefore(panel, fields);

  const pattern = document.getElementById('designPattern');
  const frame = document.getElementById('designFrame');
  const color = document.getElementById('designColor');
  const opacity = document.getElementById('designOpacity');
  const shape = document.getElementById('designShape');
  const emoji = document.getElementById('designEmoji');
  const size = document.getElementById('designSize');
  const sizeValue = document.getElementById('designSizeValue');

  function designState() {
    state.design ||= {
      pattern: 'none',
      frame: 'none',
      color: '#ffda70',
      opacity: 75,
      size: 120,
      elements: [],
    };
    state.design.elements ||= [];
    return state.design;
  }

  function selectedElement() {
    if (!selected?.startsWith('design:')) return null;
    return designState().elements.find((element) => `design:${element.id}` === selected) || null;
  }

  function syncDesignControls() {
    if (!state) return;
    const design = designState();
    const element = selectedElement();
    pattern.value = design.pattern || 'none';
    frame.value = design.frame || 'none';
    color.value = element?.color || design.color || '#ffda70';
    opacity.value = element?.opacity ?? design.opacity ?? 75;
    size.value = element?.size || design.size || 120;
    sizeValue.value = `${size.value} px`;
  }

  function rgba(hex, alpha) {
    const value = hex.replace('#', '');
    const number = Number.parseInt(value.length === 3 ? value.split('').map((part) => part + part).join('') : value, 16);
    return `rgba(${(number >> 16) & 255},${(number >> 8) & 255},${number & 255},${alpha})`;
  }

  function drawPattern(design) {
    if (!design.pattern || design.pattern === 'none') return;
    const ink = rgba(design.color || '#ffda70', Math.min(.32, (design.opacity || 75) / 400));
    ctx.save();
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = Math.max(2, canvas.width / 600);
    if (design.pattern === 'dots') {
      const gap = Math.max(42, Math.round(canvas.width / 22));
      for (let y = gap / 2; y < canvas.height; y += gap) {
        for (let x = gap / 2; x < canvas.width; x += gap) {
          ctx.beginPath();
          ctx.arc(x, y, Math.max(3, canvas.width / 320), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (design.pattern === 'grid') {
      const gap = Math.max(55, Math.round(canvas.width / 16));
      for (let x = 0; x <= canvas.width; x += gap) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y <= canvas.height; y += gap) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
    } else if (design.pattern === 'diagonal') {
      const gap = Math.max(50, Math.round(canvas.width / 18));
      for (let start = -canvas.height; start < canvas.width; start += gap) {
        ctx.beginPath(); ctx.moveTo(start, canvas.height); ctx.lineTo(start + canvas.height, 0); ctx.stroke();
      }
    } else if (design.pattern === 'confetti') {
      const count = Math.max(40, Math.round(canvas.width * canvas.height / 15000));
      for (let index = 0; index < count; index++) {
        const x = (index * 97 + 31) % canvas.width;
        const y = (index * 173 + 47) % canvas.height;
        ctx.save(); ctx.translate(x, y); ctx.rotate((index % 12) * Math.PI / 12);
        ctx.fillRect(-6, -2, 12, 4); ctx.restore();
      }
    } else if (design.pattern === 'waves') {
      const gap = Math.max(70, Math.round(canvas.height / 8));
      for (let y = gap / 2; y < canvas.height; y += gap) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 12) {
          const waveY = y + Math.sin(x / 55) * 12;
          if (x === 0) ctx.moveTo(x, waveY); else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function shapePath(kind, x, y, elementSize) {
    const half = elementSize / 2;
    ctx.beginPath();
    if (kind === 'circle') {
      ctx.arc(x, y, half, 0, Math.PI * 2);
    } else if (kind === 'rectangle') {
      ctx.roundRect(x - half, y - half * .65, elementSize, elementSize * .65, Math.max(12, elementSize * .12));
    } else if (kind === 'triangle') {
      ctx.moveTo(x, y - half); ctx.lineTo(x + half, y + half); ctx.lineTo(x - half, y + half); ctx.closePath();
    } else if (kind === 'star') {
      for (let point = 0; point < 10; point++) {
        const radius = point % 2 ? half * .45 : half;
        const angle = -Math.PI / 2 + point * Math.PI / 5;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else if (kind === 'heart') {
      ctx.moveTo(x, y + half * .8);
      ctx.bezierCurveTo(x - half * 1.25, y, x - half * .85, y - half, x, y - half * .25);
      ctx.bezierCurveTo(x + half * .85, y - half, x + half * 1.25, y, x, y + half * .8);
      ctx.closePath();
    } else {
      ctx.roundRect(x - half, y - half * .55, elementSize, elementSize * .72, Math.max(12, elementSize * .12));
      ctx.moveTo(x - half * .35, y + half * .17); ctx.lineTo(x - half * .55, y + half * .7); ctx.lineTo(x, y + half * .17); ctx.closePath();
    }
  }

  function drawElements(design) {
    for (const element of design.elements) {
      const key = `design:${element.id}`;
      const movement = offset(key);
      const x = canvas.width * (element.x ?? .5) + movement.x;
      const y = canvas.height * (element.y ?? .5) + movement.y;
      const elementSize = Number(element.size) || 120;
      ctx.save();
      ctx.globalAlpha = Math.max(.1, Math.min(1, (element.opacity ?? 75) / 100));
      if (element.kind === 'emoji') {
        ctx.font = `${elementSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(element.value || '⭐', x, y);
        register(key, x - elementSize / 2, y - elementSize / 2, elementSize, elementSize);
      } else {
        ctx.fillStyle = element.color || design.color || '#ffda70';
        shapePath(element.kind, x, y, elementSize);
        ctx.fill();
        register(key, x - elementSize / 2, y - elementSize / 2, elementSize, elementSize);
      }
      ctx.restore();
    }
  }

  function drawFrame(design) {
    if (!design.frame || design.frame === 'none') return;
    const margin = Math.max(16, canvas.width / 45);
    const line = Math.max(5, canvas.width / 180);
    ctx.save();
    ctx.strokeStyle = rgba(design.color || '#ffda70', Math.max(.25, (design.opacity || 75) / 100));
    ctx.lineWidth = line;
    if (design.frame === 'simple') {
      ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
    } else if (design.frame === 'double') {
      ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
      ctx.lineWidth = Math.max(2, line / 2);
      ctx.strokeRect(margin * 1.7, margin * 1.7, canvas.width - margin * 3.4, canvas.height - margin * 3.4);
    } else if (design.frame === 'rounded') {
      ctx.beginPath();
      ctx.roundRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2, margin * 1.2);
      ctx.stroke();
    } else {
      const length = Math.min(canvas.width, canvas.height) * .16;
      for (const [x, y, dx, dy] of [[margin, margin, 1, 1], [canvas.width - margin, margin, -1, 1], [margin, canvas.height - margin, 1, -1], [canvas.width - margin, canvas.height - margin, -1, -1]]) {
        ctx.beginPath(); ctx.moveTo(x + dx * length, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * length); ctx.stroke();
      }
    }
    ctx.restore();
  }

  const originalDraw = draw;
  draw = function drawWithDesigns() {
    originalDraw();
    if (!state) return;
    const design = designState();
    drawPattern(design);
    drawElements(design);
    drawFrame(design);
    selectionOutline();
  };

  const originalSync = sync;
  sync = function syncWithDesigns() {
    originalSync();
    syncDesignControls();
  };

  function updateStyle() {
    const design = designState();
    const element = selectedElement();
    if (element) {
      element.color = color.value;
      element.opacity = Number(opacity.value);
      element.size = Number(size.value);
    } else {
      design.color = color.value;
      design.opacity = Number(opacity.value);
      design.size = Number(size.value);
    }
    sizeValue.value = `${size.value} px`;
    draw();
  }

  pattern.addEventListener('change', () => { designState().pattern = pattern.value; draw(); });
  frame.addEventListener('change', () => { designState().frame = frame.value; draw(); });
  color.addEventListener('input', updateStyle);
  opacity.addEventListener('input', updateStyle);
  size.addEventListener('input', updateStyle);

  document.getElementById('addDesignShape').addEventListener('click', () => {
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: shape.value, x: .5, y: .5, size: design.size, color: design.color, opacity: design.opacity });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Shape added. Drag it to position it on the card.';
  });

  document.getElementById('addDesignEmoji').addEventListener('click', () => {
    const value = emoji.value.trim();
    if (!value) return;
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: 'emoji', value, x: .5, y: .5, size: design.size, opacity: design.opacity });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Emoji added. Drag it to position it on the card.';
  });

  document.getElementById('removeDesignElement').addEventListener('click', () => {
    const element = selectedElement();
    if (!element) { document.getElementById('status').textContent = 'Select a shape or emoji on the card first.'; return; }
    designState().elements = designState().elements.filter((candidate) => candidate.id !== element.id);
    delete positions()[`design:${element.id}`];
    selected = null; syncDesignControls(); draw();
  });

  document.getElementById('clearDesignElements').addEventListener('click', () => {
    const design = designState();
    for (const element of design.elements) delete positions()[`design:${element.id}`];
    design.elements = []; design.pattern = 'none'; design.frame = 'none'; selected = null;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Patterns, frames, shapes and emojis cleared.';
  });

  canvas.addEventListener('pointerup', () => setTimeout(syncDesignControls));
  canvas.addEventListener('keydown', () => setTimeout(syncDesignControls));
  syncDesignControls();
  draw();
})();
