/* Add immutable cards published to GitHub to the editor's template picker. */
(() => {
  const repositoryContents = 'https://api.github.com/repos/gurulinkindia-jpg/g10-educational-platform-Add/contents/';
  const filePattern = /^g10-edited-(\d+)-[a-f0-9]{8}\.html$/;
  const templateSelect = document.getElementById('template');
  const refreshButton = document.createElement('button');
  const status = document.createElement('p');
  let publishedCards = [];

  refreshButton.id = 'refreshPublishedTemplates';
  refreshButton.type = 'button';
  refreshButton.textContent = 'Refresh GitHub templates';
  status.id = 'publishedTemplateStatus';
  status.className = 'hint';
  status.setAttribute('role', 'status');
  status.textContent = 'Loading cards saved in GitHub…';
  templateSelect.after(refreshButton, status);

  const originalDefaults = defaults;
  defaults = function publishedDefaults(card) {
    const value = originalDefaults(card);
    if (card.publishedImage) {
      value.publishedImage = card.publishedImage;
      value.publishedPage = card.publishedPage;
      value.format = card.publishedFormat || 'landscape';
    }
    return value;
  };

  const originalDraw = draw;
  draw = function drawPublishedCard() {
    if (!state?.publishedImage) {
      originalDraw();
      return;
    }
    hitBoxes = [];
    const wide = state.format === 'landscape';
    canvas.width = wide ? 1200 : 1080;
    canvas.height = wide ? 630 : state.format === 'portrait' ? 1350 : 1920;
    ctx.fillStyle = '#071d40';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!photo?.naturalWidth) return;
    const ratio = Math.min(canvas.width / photo.naturalWidth, canvas.height / photo.naturalHeight);
    const width = photo.naturalWidth * ratio;
    const height = photo.naturalHeight * ratio;
    ctx.drawImage(photo, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  };

  const originalLoad = load;
  load = function loadPublishedCard(id) {
    originalLoad(id);
    if (state?.publishedImage) {
      document.getElementById('status').textContent = 'Loaded saved GitHub card. It is a flattened image; choose a built-in template to edit individual text and colours.';
    }
  };

  const originalShareFallback = shareFallback;
  shareFallback = function sharePublishedCard() {
    originalShareFallback();
    if (state?.publishedPage) {
      document.getElementById('facebookLink').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(state.publishedPage);
    }
  };

  async function cardDetails(entry) {
    const pageUrl = new URL(entry.name, location.href).href;
    const imageName = entry.name.replace(/\.html$/, '.png');
    let headline = 'Saved GitHub card';
    let format = 'landscape';
    try {
      const response = await fetch(pageUrl, { cache: 'no-store', signal: AbortSignal.timeout(12000) });
      if (response.ok) {
        const documentCopy = new DOMParser().parseFromString(await response.text(), 'text/html');
        headline = documentCopy.querySelector('h1')?.textContent?.trim() || headline;
        const width = Number(documentCopy.querySelector('meta[property="og:image:width"]')?.content);
        const height = Number(documentCopy.querySelector('meta[property="og:image:height"]')?.content);
        format = height > width * 1.5 ? 'story' : height > width ? 'portrait' : 'landscape';
      }
    } catch {}
    return {
      id: `published:${entry.name.replace(/\.html$/, '')}`,
      headline,
      eyebrow: 'Saved in GitHub',
      sub: '',
      note: '',
      bg: '#071d40',
      accent: '#6acfff',
      gold: '#ffda70',
      cta: 'VIEW FEE STRUCTURE >',
      buttonColor: '#1764dc',
      buttonText: '#ffffff',
      publishedImage: new URL(imageName, location.href).href,
      publishedPage: pageUrl,
      publishedFormat: format,
      publishedAt: Number(entry.name.match(filePattern)?.[1] || 0),
    };
  }

  async function refreshPublishedTemplates() {
    refreshButton.disabled = true;
    status.textContent = 'Looking for cards saved in GitHub…';
    try {
      const response = await fetch(repositoryContents, {
        cache: 'no-store',
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('GitHub did not return the saved-card list');
      const entries = await response.json();
      const files = new Set(entries.filter((entry) => entry.type === 'file').map((entry) => entry.name));
      const pages = entries
        .filter((entry) => filePattern.test(entry.name) && files.has(entry.name.replace(/\.html$/, '.png')))
        .sort((left, right) => Number(right.name.match(filePattern)?.[1] || 0) - Number(left.name.match(filePattern)?.[1] || 0))
        .slice(0, 50);
      const details = await Promise.all(pages.map(cardDetails));

      for (const card of publishedCards) {
        const index = cards.findIndex((candidate) => candidate.id === card.id);
        if (index >= 0) cards.splice(index, 1);
      }
      publishedCards = details;
      cards.push(...publishedCards);
      document.getElementById('publishedTemplateGroup')?.remove();
      const group = document.createElement('optgroup');
      group.id = 'publishedTemplateGroup';
      group.label = 'Published from GitHub';
      for (const card of publishedCards) {
        const option = document.createElement('option');
        option.value = card.id;
        const savedDate = card.publishedAt ? new Date(card.publishedAt).toLocaleString() : '';
        option.textContent = `Saved · ${card.headline}${savedDate ? ` · ${savedDate}` : ''}`;
        group.append(option);
      }
      templateSelect.prepend(group);
      status.textContent = publishedCards.length
        ? `${publishedCards.length} GitHub-saved card${publishedCards.length === 1 ? '' : 's'} added at the top of the Template list.`
        : 'No published GitHub cards were found yet.';
    } catch (error) {
      status.textContent = `${error.message || 'Could not load GitHub templates'}. Try Refresh GitHub templates.`;
    } finally {
      refreshButton.disabled = false;
    }
  }

  refreshButton.addEventListener('click', refreshPublishedTemplates);
  refreshPublishedTemplates();
})();
