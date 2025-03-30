import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const findPhotos =  (searchedValue, page) => {
    const axiosOptions = {
        params: {
            key: '49462102-62c5bd388bb9085ad52d727ed',
            q: searchedValue,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 15,
        },
    };

        return axios.get('', axiosOptions); 
};