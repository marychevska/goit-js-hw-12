import axios from 'axios';

const API_KEY = '49626853-35a7cc777388834eb6e89d08d';

export default async function getImagesByQuery(query, page) {
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