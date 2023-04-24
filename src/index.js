import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);
buttonLoadMore.addEventListener('click', onBtnLoadMore);
