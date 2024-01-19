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

export const searchPosts = (q, _page = 1) => {
  // return instance.get(`/?q=${q}&_limit=6&_page=${_page}`)
  return instance.get('/', {
    params: {
      q,
      _limit: 6,
      _page,
    },
  });
};
