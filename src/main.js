import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconError from './img/error.svg';
import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

document.querySelector('.span').classList.remove('loader');

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn.visually-hidden');

let page = 1;
let query;
let maxPages;

const errorMessage = {
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  messageColor: '#ffffff',
  iconUrl: iconError,
  iconColor: '#ffffff',
  backgroundColor: '#B51B1B',
};

const errorServerConnection = {
  title: 'ERROR',
  titleColor: '#ffffff',
  message: 'Error connecting to server',
  messageColor: '#ffffff',
  iconUrl: iconError,
  iconColor: '#ffffff',
  backgroundColor: '#B51B1B',
};

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function handleSubmit(event) {
  event.preventDefault();

  hideLoadMoreButton();
  clearGallery();
  page = 1;

  query = event.target.elements.text.value.trim();

  if (!query || query === ' ') {
    iziToast.show(errorMessage);
    form.reset();
    return;
  }

  showLoader();

  getImagesByQuery(query, page)
    .then(response => {
      const array = response.data.hits;
      maxPages = Math.ceil(response.data.totalHits / array.length);

      if (!array.length) {
        noData();
        return;
      }
      hideLoader();
      createGallery(array);

      if (page < maxPages) {
        showLoadMoreButton();
      }
    })
    .catch(error => {
      console.log(error.message);
      hideLoader();
      iziToast.show(errorServerConnection);
    });

  form.reset();
}

function noData() {
  iziToast.show(errorMessage);
  clearGallery();
  hideLoader();
}

async function onLoadMore() {
  hideLoadMoreButton();
  showLoader();
  page++;

  try {
    const response = await getImagesByQuery(query, page);

    createGallery(response.data.hits);
    hideLoader();

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page >= maxPages) {
      errorMessage.message =
        "We're sorry, but you've reached the end of search results.";
      iziToast.show(errorMessage);
      hideLoader();
      return;
    }

    showLoadMoreButton();
  } catch (error) {
    alert(error.message);
    hideLoader();
  }
}