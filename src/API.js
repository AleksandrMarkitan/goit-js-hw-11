const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(q, page = 1) {
  try {
    const imagesArray = await axios.get(`${BASE_URL}`, {
      params: {
        key: '29884952-0a1ce1203a17cb22a427e3a5c',
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 100,
      },
    });
    return imagesArray;
  } catch (error) {
    console.error(error.message);
  }
}
