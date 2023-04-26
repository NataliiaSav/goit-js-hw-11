import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchimages';
import { renderGallery } from './render-img';

const searchForm = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');

buttonLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onFormSubmit);
buttonLoadMore.addEventListener('click', onBtnLoad);
let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let page = 1;
const perPage = 40;
function onFormSubmit(e) {
  e.preventDefault();
  query = e.currentTarget.searchQuery.value.trim();
  if (query === '') {
    Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(data.hits);
        lightbox.refresh();
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

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      lightbox.refresh();
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
