/* Send the current canvas to the secure LMS publisher without removing manual sharing. */
const lmsPublisherButton = document.createElement('button');
lmsPublisherButton.id = 'lmsPublisher';
lmsPublisherButton.type = 'button';
lmsPublisherButton.textContent = 'Use in LMS publisher';
lmsPublisherButton.style.cssText = 'background:#e9bd40;color:#302300;border-color:#e9bd40;font-weight:700';
document.getElementById('prepareGithub').before(lmsPublisherButton);

lmsPublisherButton.addEventListener('click', async () => {
  lmsPublisherButton.disabled = true;
  try {
    if (window.parent === window) {
      throw new Error('Open this editor inside the LMS Advertisement Studio first.');
    }
    await logo.decode();
    exporting = true;
    draw();
    const blob = await new Promise((resolve, reject) => canvas.toBlob(
      (value) => value ? resolve(value) : reject(new Error('Could not prepare image')),
      'image/jpeg',
      0.92,
    ));
    exporting = false;
    draw();
    const image = await blob.arrayBuffer();
    window.parent.postMessage({
      type: 'g10-advertisement-card',
      image,
      mimeType: 'image/jpeg',
      fileName: `g10-advertisement-${Date.now()}.jpg`,
      caption: shareCaption(),
    }, 'https://learn.g10educationalplatformindia.co.in', [image]);
    document.getElementById('status').textContent = 'Card sent to the LMS direct publisher above.';
  } catch (error) {
    exporting = false;
    draw();
    document.getElementById('status').textContent = error.message || 'Could not send the card to the LMS publisher.';
  } finally {
    lmsPublisherButton.disabled = false;
  }
});
