import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '40879465-06aabe94cbc0a82e6b53565eb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getAllPosts = () => {
  return instance.get('/');
};

// export const searchPosts = (q, _page) => {
//   // return instance.get(`/?q=${q}&_limit=6&_page=${_page}`);
//   return instance.get('/', {
//     params: {
//       q,
//       _page,
//     },
//   });
// };

export const searchPosts = (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '40879465-06aabe94cbc0a82e6b53565eb';

  let params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  try {
    const response = axios.get(`${BASE_URL}/?${params}`);
    return response;
  } catch (error) {
    throw error;
  }
};
