import axios from 'axios';

const API_KEY = '49462102-62c5bd388bb9085ad52d727ed';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}
