import iziToast from "izitoast";
import { findPhotos } from "./js/pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
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

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

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

  clearGallery();
  quantityElements = 0;
  hideLoadMoreBtn();
  showLoader();
  currentPage = 1;

  try {
    const response = await findPhotos(searchedValue, currentPage);
    const data = response.data;

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
      searchFormEl.reset();
      return;
    }

    const markup = createGalleryCardTemplate(data.hits);
    galleryEl.innerHTML = markup;
    lightbox.refresh();

    showLoadMoreBtn();
    searchFormEl.reset();
    quantityElements += data.hits.length;

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
    const response = await findPhotos(searchedValue, currentPage);
    const data = response.data;

    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    }

    const markup = createGalleryCardTemplate(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const firstCard = galleryEl.firstElementChild;
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    quantityElements += data.hits.length;

    if (Math.ceil(data.totalHits / 15) === currentPage) {
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
