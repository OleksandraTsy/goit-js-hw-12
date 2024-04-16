import axios from 'axios';

export async function getDataFromAPI(searchQuery, page, perPage) {
  const baseURL = 'https://pixabay.com/api/';
  const params = {
    key: '42941472-1aaa1e5ed1787820ede60bd86',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  const response = await axios.get(baseURL, { params });
  return response.data;
}