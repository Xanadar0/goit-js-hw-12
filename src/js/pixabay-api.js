import axios from 'axios';

const API_KEY = '49462102-62c5bd388bb9085ad52d727ed';

export async function findPhotos(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  return await axios(`https://pixabay.com/api/?${params}`);
}