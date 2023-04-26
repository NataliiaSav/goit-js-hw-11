import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35723786-fd99b6f58bc17a38a4a1132d3';

async function fetchImages(query, page, perPage) {
  return await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
}
export { fetchImages };
