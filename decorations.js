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
    <label for="designShapeStyle">Shape style</label>
    <select id="designShapeStyle">
      <option value="solid">Solid fill</option>
      <option value="outline">Outline only</option>
      <option value="dashed">Dashed outline</option>
      <option value="dotted">Dotted outline</option>
    </select>
    <label for="designLine">Add a line</label>
    <div class="row">
      <select id="designLine" style="flex:1">
        <option value="solid">Solid line</option>
        <option value="dashed">Dashed line</option>
        <option value="dotted">Dotted line</option>
        <option value="arrow">Arrow</option>
        <option value="double">Double line</option>
      </select>
      <button id="addDesignLine" type="button">Add line</button>
    </div>
    <label for="designSubject">Add a subject graphic</label>
    <div class="row">
      <select id="designSubject" style="flex:1">
        <option value="atom">Physics · Atom</option>
        <option value="lightning">Physics · Energy</option>
        <option value="flask">Chemistry · Flask</option>
        <option value="dna">Biology · DNA</option>
        <option value="leaf">Biology · Leaf</option>
        <option value="pi">Mathematics · Pi</option>
        <option value="geometry">Mathematics · Geometry</option>
        <option value="microscope">Science · Microscope</option>
      </select>
      <button id="addDesignSubject" type="button">Add graphic</button>
    </div>
    <label for="designEmojiPicker">Emoji and symbol library</label>
    <select id="designEmojiPicker">
      <option value="">Choose an item to add…</option>
      <optgroup label="Education">
        <option value="🎓">🎓 Graduation cap</option><option value="📚">📚 Books</option><option value="📖">📖 Open book</option><option value="✏️">✏️ Pencil</option><option value="📝">📝 Notes</option><option value="🏫">🏫 School</option><option value="🧑‍🏫">🧑‍🏫 Teacher</option><option value="🧠">🧠 Brain</option><option value="💡">💡 Idea</option><option value="🏆">🏆 Trophy</option><option value="✅">✅ Completed</option><option value="📌">📌 Pin</option>
      </optgroup>
      <optgroup label="Science and Physics">
        <option value="⚛️">⚛️ Atom</option><option value="🔬">🔬 Microscope</option><option value="🔭">🔭 Telescope</option><option value="⚡">⚡ Energy</option><option value="🧲">🧲 Magnet</option><option value="🔋">🔋 Battery</option><option value="🌡️">🌡️ Temperature</option><option value="☀️">☀️ Sun</option><option value="🌊">🌊 Wave</option><option value="🛰️">🛰️ Satellite</option><option value="🚀">🚀 Rocket</option><option value="🌌">🌌 Space</option>
      </optgroup>
      <optgroup label="Chemistry">
        <option value="🧪">🧪 Test tube</option><option value="⚗️">⚗️ Flask</option><option value="🧫">🧫 Petri dish</option><option value="🧑‍🔬">🧑‍🔬 Scientist</option><option value="💧">💧 Drop</option><option value="🫧">🫧 Bubbles</option><option value="🔥">🔥 Flame</option><option value="❄️">❄️ Crystal</option>
      </optgroup>
      <optgroup label="Biology and Nature">
        <option value="🧬">🧬 DNA</option><option value="🦠">🦠 Microbe</option><option value="🫀">🫀 Heart</option><option value="🫁">🫁 Lungs</option><option value="🌱">🌱 Seedling</option><option value="🌿">🌿 Plant</option><option value="🍃">🍃 Leaf</option><option value="🌸">🌸 Flower</option><option value="🐝">🐝 Bee</option><option value="🦋">🦋 Butterfly</option><option value="🌍">🌍 Earth</option><option value="♻️">♻️ Recycle</option>
      </optgroup>
      <optgroup label="Mathematics">
        <option value="π">π Pi</option><option value="∑">∑ Sum</option><option value="√">√ Square root</option><option value="∞">∞ Infinity</option><option value="≈">≈ Approximately</option><option value="≠">≠ Not equal</option><option value="≤">≤ Less than or equal</option><option value="≥">≥ Greater than or equal</option><option value="±">± Plus or minus</option><option value="÷">÷ Division</option><option value="×">× Multiplication</option><option value="%">% Percent</option><option value="½">½ Fraction</option><option value="∠">∠ Angle</option><option value="🧮">🧮 Abacus</option><option value="📐">📐 Set square</option><option value="📏">📏 Ruler</option><option value="📊">📊 Chart</option>
      </optgroup>
      <optgroup label="Shapes and marks">
        <option value="●">● Solid circle</option><option value="○">○ Circle outline</option><option value="■">■ Solid square</option><option value="□">□ Square outline</option><option value="▲">▲ Solid triangle</option><option value="△">△ Triangle outline</option><option value="◆">◆ Solid diamond</option><option value="◇">◇ Diamond outline</option><option value="★">★ Solid star</option><option value="☆">☆ Star outline</option><option value="♥">♥ Heart</option><option value="♡">♡ Heart outline</option><option value="✓">✓ Tick</option><option value="✕">✕ Cross</option><option value="!">! Exclamation</option><option value="?">? Question</option>
      </optgroup>
      <optgroup label="Arrows">
        <option value="←">← Left</option><option value="↑">↑ Up</option><option value="→">→ Right</option><option value="↓">↓ Down</option><option value="↔">↔ Left and right</option><option value="↕">↕ Up and down</option><option value="↗">↗ Up right</option><option value="↘">↘ Down right</option><option value="➜">➜ Arrow</option><option value="➤">➤ Pointer</option><option value="⬅️">⬅️ Left button</option><option value="➡️">➡️ Right button</option>
      </optgroup>
      <optgroup label="Communication and business">
        <option value="📞">📞 Telephone</option><option value="☎️">☎️ Phone</option><option value="📱">📱 Mobile</option><option value="💬">💬 Message</option><option value="📢">📢 Loudspeaker</option><option value="📣">📣 Megaphone</option><option value="📧">📧 Email</option><option value="🌐">🌐 Website</option><option value="🔗">🔗 Link</option><option value="📍">📍 Location</option><option value="🗓️">🗓️ Calendar</option><option value="⏰">⏰ Time</option><option value="💰">💰 Fees</option><option value="🎯">🎯 Target</option>
      </optgroup>
      <optgroup label="Celebration and motivation">
        <option value="🎉">🎉 Celebration</option><option value="🎊">🎊 Confetti</option><option value="🎈">🎈 Balloon</option><option value="🎁">🎁 Gift</option><option value="✨">✨ Sparkles</option><option value="🌟">🌟 Glowing star</option><option value="🙏">🙏 Greeting</option><option value="🪔">🪔 Diya</option><option value="🎄">🎄 Christmas tree</option><option value="🥳">🥳 Party face</option><option value="👏">👏 Applause</option><option value="💪">💪 Strength</option><option value="👍">👍 Thumbs up</option><option value="❤️">❤️ Red heart</option>
      </optgroup>
    </select>
    <p class="hint" style="margin:5px 0 8px">Choose an item above to add it immediately.</p>
    <label for="designEmoji">Or type any emoji or symbol</label>
    <div class="row">
      <input id="designEmoji" type="text" value="⭐" maxlength="8" aria-label="Emoji or symbol" style="width:90px">
      <button id="addDesignEmoji" type="button">Add typed item</button>
    </div>
    <label for="designSize">Selected element size <output id="designSizeValue">120 px</output></label>
    <input id="designSize" type="range" min="30" max="420" step="5" value="120">
    <label for="designRotation">Selected element rotation <output id="designRotationValue">0°</output></label>
    <input id="designRotation" type="range" min="-180" max="180" step="5" value="0">
    <div class="row">
      <button id="removeDesignElement" type="button">Remove selected element</button>
      <button id="clearDesignElements" type="button">Clear designs</button>
    </div>
    <p class="hint">Click any shape, line, subject graphic or emoji on the card, then drag it. Use the style, size, rotation, colour and opacity controls to customise it.</p>
  `;
  controls.insertBefore(panel, fields);

  const pattern = document.getElementById('designPattern');
  const frame = document.getElementById('designFrame');
  const color = document.getElementById('designColor');
  const opacity = document.getElementById('designOpacity');
  const shape = document.getElementById('designShape');
  const shapeStyle = document.getElementById('designShapeStyle');
  const line = document.getElementById('designLine');
  const subject = document.getElementById('designSubject');
  const emojiPicker = document.getElementById('designEmojiPicker');
  const emoji = document.getElementById('designEmoji');
  const size = document.getElementById('designSize');
  const sizeValue = document.getElementById('designSizeValue');
  const rotation = document.getElementById('designRotation');
  const rotationValue = document.getElementById('designRotationValue');

  function designState() {
    state.design ||= {
      pattern: 'none',
      frame: 'none',
      color: '#ffda70',
      opacity: 75,
      size: 120,
      shapeStyle: 'solid',
      rotation: 0,
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
    shapeStyle.value = element?.style || design.shapeStyle || 'solid';
    rotation.value = element?.rotation ?? design.rotation ?? 0;
    sizeValue.value = `${size.value} px`;
    rotationValue.value = `${rotation.value}°`;
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

  function drawSubjectGraphic(kind, elementSize, ink) {
    const half = elementSize / 2;
    const stroke = Math.max(4, elementSize / 22);
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = stroke;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (kind === 'atom') {
      for (const angle of [0, Math.PI / 3, -Math.PI / 3]) {
        ctx.save(); ctx.rotate(angle); ctx.beginPath(); ctx.ellipse(0, 0, half, half * .38, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0, 0, Math.max(7, elementSize * .08), 0, Math.PI * 2); ctx.fill();
    } else if (kind === 'flask') {
      ctx.beginPath();
      ctx.moveTo(-half * .2, -half); ctx.lineTo(half * .2, -half); ctx.lineTo(half * .2, -half * .25);
      ctx.lineTo(half * .72, half * .72); ctx.quadraticCurveTo(0, half, -half * .72, half * .72);
      ctx.lineTo(-half * .2, -half * .25); ctx.closePath(); ctx.stroke();
      ctx.save(); ctx.globalAlpha *= .45; ctx.beginPath(); ctx.moveTo(-half * .55, half * .35); ctx.quadraticCurveTo(0, half * .1, half * .55, half * .35); ctx.lineTo(half * .72, half * .72); ctx.quadraticCurveTo(0, half, -half * .72, half * .72); ctx.closePath(); ctx.fill(); ctx.restore();
      for (const [x, y, radius] of [[-.35, -.05, .07], [.05, .22, .06], [.35, .02, .09]]) { ctx.beginPath(); ctx.arc(half * x, half * y, elementSize * radius, 0, Math.PI * 2); ctx.stroke(); }
    } else if (kind === 'dna') {
      ctx.beginPath();
      for (let step = -10; step <= 10; step++) { const y = step * half / 10; const x = Math.sin(step * Math.PI / 5) * half * .45; if (step === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke(); ctx.beginPath();
      for (let step = -10; step <= 10; step++) { const y = step * half / 10; const x = -Math.sin(step * Math.PI / 5) * half * .45; if (step === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
      for (let step = -8; step <= 8; step += 4) { const y = step * half / 10; const x = Math.sin(step * Math.PI / 5) * half * .45; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(-x, y); ctx.stroke(); }
    } else if (kind === 'leaf') {
      ctx.beginPath(); ctx.moveTo(-half * .8, half * .65); ctx.bezierCurveTo(-half * .75, -half * .75, half * .65, -half, half * .8, -half * .7); ctx.bezierCurveTo(half * .9, half * .45, -half * .15, half * .9, -half * .8, half * .65); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-half * .7, half * .58); ctx.lineTo(half * .58, -half * .58); ctx.stroke();
      for (const t of [-.35, 0, .35]) { ctx.beginPath(); ctx.moveTo(t * half, -t * half); ctx.lineTo((t - .25) * half, (-t - .28) * half); ctx.stroke(); }
    } else if (kind === 'pi') {
      ctx.font = `bold ${elementSize * .95}px Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('π', 0, 0);
      ctx.font = `bold ${elementSize * .2}px Arial`; ctx.fillText('x² + y²', 0, half * .82);
    } else if (kind === 'geometry') {
      ctx.beginPath(); ctx.moveTo(-half * .85, half * .72); ctx.lineTo(half * .78, half * .72); ctx.lineTo(half * .28, -half * .7); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(-half * .4, half * .35, half * .26, -Math.PI / 3, 0); ctx.stroke();
      ctx.beginPath(); ctx.arc(half * .28, -half * .7, Math.max(5, stroke), 0, Math.PI * 2); ctx.fill();
    } else if (kind === 'microscope') {
      ctx.beginPath(); ctx.arc(-half * .05, -half * .05, half * .42, -Math.PI * .35, Math.PI * .75); ctx.stroke();
      ctx.save(); ctx.rotate(-Math.PI / 4); ctx.strokeRect(-half * .2, -half * .88, half * .4, half * .72); ctx.restore();
      ctx.beginPath(); ctx.moveTo(-half * .55, half * .2); ctx.lineTo(half * .55, half * .2); ctx.moveTo(0, half * .2); ctx.lineTo(half * .28, half * .72); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-half * .65, half * .78); ctx.lineTo(half * .65, half * .78); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(half * .05, -half); ctx.lineTo(-half * .55, half * .05); ctx.lineTo(-half * .08, half * .05); ctx.lineTo(-half * .35, half); ctx.lineTo(half * .62, -half * .2); ctx.lineTo(half * .15, -half * .2); ctx.closePath(); ctx.fill();
    }
  }

  function applyOutlineStyle(style, elementSize, ink) {
    ctx.fillStyle = ink;
    ctx.strokeStyle = ink;
    ctx.lineWidth = Math.max(4, elementSize / 18);
    ctx.lineJoin = 'round';
    ctx.lineCap = style === 'dotted' ? 'round' : 'butt';
    ctx.setLineDash(style === 'dashed' ? [elementSize * .12, elementSize * .08] : style === 'dotted' ? [1, elementSize * .1] : []);
  }

  function drawElements(design) {
    for (const element of design.elements) {
      const key = `design:${element.id}`;
      const movement = offset(key);
      const x = canvas.width * (element.x ?? .5) + movement.x;
      const y = canvas.height * (element.y ?? .5) + movement.y;
      const elementSize = Number(element.size) || 120;
      const ink = element.color || design.color || '#ffda70';
      ctx.save();
      ctx.globalAlpha = Math.max(.1, Math.min(1, (element.opacity ?? 75) / 100));
      ctx.translate(x, y);
      ctx.rotate((Number(element.rotation) || 0) * Math.PI / 180);
      if (element.kind === 'emoji') {
        ctx.font = `${elementSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(element.value || '⭐', 0, 0);
      } else if (element.kind === 'line') {
        applyOutlineStyle(element.value, elementSize, ink);
        const half = elementSize / 2;
        if (element.value === 'double') {
          ctx.beginPath(); ctx.moveTo(-half, -ctx.lineWidth); ctx.lineTo(half, -ctx.lineWidth); ctx.moveTo(-half, ctx.lineWidth); ctx.lineTo(half, ctx.lineWidth); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(-half, 0); ctx.lineTo(half, 0); ctx.stroke();
          if (element.value === 'arrow') {
            ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(half, 0); ctx.lineTo(half - elementSize * .18, -elementSize * .12); ctx.moveTo(half, 0); ctx.lineTo(half - elementSize * .18, elementSize * .12); ctx.stroke();
          }
        }
      } else if (element.kind === 'subject') {
        drawSubjectGraphic(element.value, elementSize, ink);
      } else {
        const style = element.style || 'solid';
        applyOutlineStyle(style, elementSize, ink);
        shapePath(element.kind, 0, 0, elementSize);
        if (style === 'solid') ctx.fill(); else ctx.stroke();
      }
      ctx.restore();
      register(key, x - elementSize / 2, y - elementSize / 2, elementSize, elementSize);
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
      element.style = shapeStyle.value;
      element.rotation = Number(rotation.value);
    } else {
      design.color = color.value;
      design.opacity = Number(opacity.value);
      design.size = Number(size.value);
      design.shapeStyle = shapeStyle.value;
      design.rotation = Number(rotation.value);
    }
    sizeValue.value = `${size.value} px`;
    rotationValue.value = `${rotation.value}°`;
    draw();
  }

  pattern.addEventListener('change', () => { designState().pattern = pattern.value; draw(); });
  frame.addEventListener('change', () => { designState().frame = frame.value; draw(); });
  color.addEventListener('input', updateStyle);
  opacity.addEventListener('input', updateStyle);
  size.addEventListener('input', updateStyle);
  shapeStyle.addEventListener('change', updateStyle);
  rotation.addEventListener('input', updateStyle);

  document.getElementById('addDesignShape').addEventListener('click', () => {
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: shape.value, x: .5, y: .5, size: design.size, color: design.color, opacity: design.opacity, style: design.shapeStyle || 'solid', rotation: design.rotation || 0 });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Shape added. Drag it to position it on the card.';
  });

  document.getElementById('addDesignLine').addEventListener('click', () => {
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: 'line', value: line.value, x: .5, y: .5, size: design.size, color: design.color, opacity: design.opacity, rotation: design.rotation || 0 });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Line added. Drag it into place, then use rotation to change its angle.';
  });

  document.getElementById('addDesignSubject').addEventListener('click', () => {
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: 'subject', value: subject.value, x: .5, y: .5, size: design.size, color: design.color, opacity: design.opacity, rotation: design.rotation || 0 });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Subject graphic added. Drag it to position it on the card.';
  });

  function addEmojiElement(rawValue) {
    const value = rawValue.trim();
    if (!value) return;
    const design = designState();
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    design.elements.push({ id, kind: 'emoji', value, x: .5, y: .5, size: design.size, opacity: design.opacity, rotation: design.rotation || 0 });
    selected = `design:${id}`;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = `${value} added. Drag it to position it on the card.`;
  }

  emojiPicker.addEventListener('change', () => {
    if (!emojiPicker.value) return;
    emoji.value = emojiPicker.value;
    addEmojiElement(emojiPicker.value);
    emojiPicker.value = '';
  });

  document.getElementById('addDesignEmoji').addEventListener('click', () => addEmojiElement(emoji.value));

  document.getElementById('removeDesignElement').addEventListener('click', () => {
    const element = selectedElement();
    if (!element) { document.getElementById('status').textContent = 'Select a design element on the card first.'; return; }
    designState().elements = designState().elements.filter((candidate) => candidate.id !== element.id);
    delete positions()[`design:${element.id}`];
    selected = null; syncDesignControls(); draw();
  });

  document.getElementById('clearDesignElements').addEventListener('click', () => {
    const design = designState();
    for (const element of design.elements) delete positions()[`design:${element.id}`];
    design.elements = []; design.pattern = 'none'; design.frame = 'none'; selected = null;
    syncDesignControls(); draw();
    document.getElementById('status').textContent = 'Patterns, frames, shapes, lines, graphics and emojis cleared.';
  });

  canvas.addEventListener('pointerup', () => setTimeout(syncDesignControls));
  canvas.addEventListener('keydown', () => setTimeout(syncDesignControls));
  syncDesignControls();
  draw();
})();
