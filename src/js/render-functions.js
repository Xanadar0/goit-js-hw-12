export const createGalleryCardTemplate = photoInfo => {
    return `<li class="gallery-item">
  <a class="gallery-link" href="${photoInfo.largeImageURL}">
    <img
      class="gallery-img"
      src="${photoInfo.webformatURL}"
      alt="${photoInfo.tags}"
      loading="lazy"
    />
  </a>
  <ul class="gallery-info">
    <li class="gallery-info-item">
      <p class="gallery-info-title">Likes</p>
      <p class="gallery-info-text">${photoInfo.likes}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Views</p>
      <p class="gallery-info-text">${photoInfo.views}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Comments</p>
      <p class="gallery-info-text">${photoInfo.comments}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Downloads</p>
      <p class="gallery-info-text">${photoInfo.downloads}</p>
    </li>
  </ul>
</li>`;
};