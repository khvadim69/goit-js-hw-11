import axios from 'axios';
// BASE_URL = 'https://pixabay.com/api';
// API_KEY = '34957415-93d84ab2394a2a56ca546a14b';

export class pixabayAPI {
  photo = null;
  page = 1;
  perPage = 40;
  async fetchPhoto() {
    try {
      return await axios.get(`
      https://pixabay.com/api/?key=34957415-93d84ab2394a2a56ca546a14b&q=${this.photo}&per_page=${this.perPage}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
// ${BASE_URL}/?key=${API_KEY}