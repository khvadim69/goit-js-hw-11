import axios from 'axios';

export class pixabayAPI {
  photo = null;
  page = 1;
  perPage = 40;
  async fetchPhoto() {
    try {
      return await axios.get(
        `https://pixabay.com/api/?key=34957415-93d84ab2394a2a56ca546a14b&q=${this.photo}&per_page=${this.perPage}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

// #BASE_URL = 'https://pixabay.com/api';
// #API_KEY = '34957415-93d84ab2394a2a56ca546a14b';

// page = 1;
// photo = null;
// perPage = 40;

// async fetchPhotos() {
//   try {
//     return await axios.get(
//       `${this.#BASE_URL}/?key=${this.#API_KEY}&q=${this.photo}&per_page=${
//         this.perPage
//       }&page=${
//         this.page
//       }&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//   } catch (err) {
//     throw new Error(err.message);

// return await axios.get(`${this.#BASE_URL}/search/photos`, {
//   params: {
//     q: this.q,
//     page: this.page,
//     per_page: 40,
//     image_type: 'photo',
//     orientation: horizontal,
//     safesearch: true,
//     client_id: this.#API_KEY,
//   },
// });
