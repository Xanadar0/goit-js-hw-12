import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

export const createGalleryCardTemplate = photoInfo => {
  const markup = photoInfo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-img"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
      </a>
      <ul class="gallery-info">
        <li class="gallery-info-item">
          <p class="gallery-info-title">Likes</p>
          <p class="gallery-info-text">${likes}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Views</p>
          <p class="gallery-info-text">${views}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Comments</p>
          <p class="gallery-info-text">${comments}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Downloads</p>
          <p class="gallery-info-text">${downloads}</p>
        </li>
      </ul>
    </li>`
    )
    .join('');
  
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

export function  clearGallery() {
  gallery.innerHTML = '';
};

export function  showLoader() {
  loader.classList.remove('is-hidden');
};

export function  hideLoader() {
  loader.classList.add('is-hidden');
};

export function  showLoadMoreBtn() {
  loadMoreBtnEl.classList.remove('is-hidden');
};

export function  hideLoadMoreBtn() {
  loadMoreBtnEl.classList.add('is-hidden');
};
