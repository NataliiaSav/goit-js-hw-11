import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchimages';
import { renderGallery } from './render-img';

const searchForm = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onFormSubmit);
buttonLoadMore.addEventListener('click', onBtnLoad);
function onFormSubmit(e) {
  e.preventDefault();
  let lightbox;
  let page = 1;
  const perPage = 40;
  query = e.currentTarget.searchQuery.value.trim();
  buttonLoadMore.classList.add('is-hidden');

  if (query === '') {
    Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallery(data.hits);
        lightbox = new SimpleLightbox('.gallery a').refresh;
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        if (data.totalHits > perPage) {
          buttonLoadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function onBtnLoad() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        buttonLoadMore.classList.add('is-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}
