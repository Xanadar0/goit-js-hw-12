import iziToast from "izitoast";
import getImagesByQuery from "./js/pixabay-api";

import {
  createGalleryCardTemplate,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from "./js/render-functions";

const searchFormEl = document.querySelector('.form-search');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let currentPage = 1;
let searchedValue = '';
let quantityElements = 0;
let totalHits = 0;

const searchFormSubmit = async event => {
  event.preventDefault();

  searchedValue = searchFormEl.elements["search-text"].value.trim();

  if (searchedValue === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'bottomRight',
    });
    return;
  }

  quantityElements = 0;
  currentPage = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(searchedValue, currentPage);
    

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
      searchFormEl.reset();
      return;
    }

    totalHits = data.totalHits;
    createGalleryCardTemplate(data.hits);

    quantityElements += data.hits.length;

    if (quantityElements < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }

    searchFormEl.reset();

  } catch (err) {
    console.log(err);
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      position: 'bottomRight',
    });
  } finally {
    hideLoader();
  }
};

const onLoadMorePhoto = async () => {
  try {
    showLoader();
    currentPage++;

    const data = await getImagesByQuery(searchedValue, currentPage);

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    }

    createGalleryCardTemplate(data.hits);

    const firstCard = galleryEl.firstElementChild;
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    quantityElements += data.hits.length;

    if (quantityElements >= totalHits) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreBtn();
    }

  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

searchFormEl.addEventListener('submit', searchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMorePhoto);
