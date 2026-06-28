const galleries = document.querySelectorAll('.gallery');

galleries.forEach(gallery => {
  const images = Array.from(gallery.querySelectorAll('img'));
  images.forEach((img, startIndex) => {
    img.addEventListener('click', () => openLightbox(images, startIndex));
  });
});

function openLightbox(images, startIndex){
  let index = startIndex;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lbClose" aria-label="Inchide">×</button>
    <button class="lbPrev" aria-label="Poza anterioara">‹</button>
    <img src="" alt="">
    <button class="lbNext" aria-label="Poza urmatoare">›</button>
    <div class="lightboxCounter"></div>
  `;
  const photo = lb.querySelector('img');
  const counter = lb.querySelector('.lightboxCounter');
  const show = () => {
    photo.src = images[index].src;
    photo.alt = images[index].alt || 'BTA Apartments photo';
    counter.textContent = `${index + 1} / ${images.length}`;
  };
  const next = () => { index = (index + 1) % images.length; show(); };
  const prev = () => { index = (index - 1 + images.length) % images.length; show(); };

  lb.querySelector('.lbClose').addEventListener('click', () => lb.remove());
  lb.querySelector('.lbNext').addEventListener('click', next);
  lb.querySelector('.lbPrev').addEventListener('click', prev);
  lb.addEventListener('click', e => { if(e.target === lb) lb.remove(); });
  document.addEventListener('keydown', function keys(e){
    if(!document.body.contains(lb)){ document.removeEventListener('keydown', keys); return; }
    if(e.key === 'Escape') lb.remove();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });
  show();
  document.body.appendChild(lb);
}
