const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<a class="gallery-item" href="${largeImageURL}" >
  <div class="gallery-item-img">
    <img
      class="gallery-img"
      src="${webformatURL}"
      alt="${tags}"
      loading="lazy"
    />
    <div class="info">
      <p class="info-item">
        <span>Likes:</span>${likes}
      </p>
      <p class="info-item">
        <span>Views:</span>${views}
      </p>
      <p class="info-item">
        <span>Comments:</span>${comments}
      </p>
      <p class="info-item">
        <span>Downloads:</span>${downloads}
      </p>
    </div>
  </div>
</a>`;
    })
    .join('');

  // console.log(markup);
  gallery.insertAdjacentHTML('beforeend', markup);
}
export { renderGallery };
