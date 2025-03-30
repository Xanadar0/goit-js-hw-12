import iziToast from "izitoast";
import { findPhotos } from "./js/pixabay-api";
import SimpleLightbox from "simplelightbox";
import { createGalleryCardTemplate } from "./js/render-functions";

const searchFormEl = document.querySelector('.form-search');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const lightbox  = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: 'alt',
    overlayOpacity: 1,
});
let currentPage = 1;
let searchedValue = '';
let quantityElements = 0;

const searchFormSubmit = async event => {
    try {
    event.preventDefault();

    searchedValue = searchFormEl.elements["search-text"].value.trim();

    if (searchedValue === '') {
        iziToast.warning({
            message: 'Please enter a search query.',
            position: 'bottomRight',
        });
        return;
        }
        galleryEl.innerHTML = ''; 
        quantityElements = 0;
        loadMoreBtnEl.classList.add('is-hidden');
        loaderEl.classList.remove('is-hidden'); 
        currentPage = 1;
        const response = await findPhotos(searchedValue, currentPage); 
        const data = response.data; 

        if (!data.hits || data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'bottomRight'
                });
                galleryEl.innerHTML = '';
                searchFormEl.reset();
                loaderEl.classList.add('is-hidden'); 
                loadMoreBtnEl.classList.add('is-hidden');
                return;
            }

            const galleryCardsTemplate = data.hits
                .map(imgDetails => createGalleryCardTemplate(imgDetails))
                .join('');
            galleryEl.innerHTML = galleryCardsTemplate;
            lightbox.refresh();
            loadMoreBtnEl.classList.remove('is-hidden');
            searchFormEl.reset();
            quantityElements += response.data.hits.length;
    }   catch (err) {
            console.log(err);
            iziToast.error({
                message: 'An error occurred. Please try again later.',
                position: 'bottomRight',
            });
        }   finally {
            loaderEl.classList.add('is-hidden');
    }
};

const onLoadMorePhoto = async () => {
    try {
        loaderEl.classList.remove('is-hidden');
        currentPage++;
        const response = await findPhotos(searchedValue, currentPage); 
        const data = response.data;

        if (!data.hits || data.hits.length === 0) {
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
            loadMoreBtnEl.classList.add('is-hidden');  
            return;
        }
        const galleryCardsTemplate = data.hits
            .map(imgDetails => createGalleryCardTemplate(imgDetails))
            .join('');
            galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
            lightbox.refresh();

        const firstCard = galleryEl.firstElementChild;
        const { height: cardHeight } = firstCard.getBoundingClientRect();
        
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
        quantityElements += response.data.hits.length;

        if (Math.ceil(data.totalHits / 15) === currentPage) {
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
            loadMoreBtnEl.classList.add('is-hidden');
        }
    } catch (err) {
        console.log(err);
    } finally {
        loaderEl.classList.add('is-hidden');
    }
};
    
searchFormEl.addEventListener('submit', searchFormSubmit);

loadMoreBtnEl.addEventListener('click', onLoadMorePhoto);