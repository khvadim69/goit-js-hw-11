import './css/styles.css';
import { pixabayAPI } from './js/fetchPhoto.js';
import Notiflix from 'notiflix';
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.input');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.load-more');

const pixabayApi = new pixabayAPI();
let total = 0;

const handleSubmit = async event => {
  event.preventDefault();
  total = 0;
  total += pixabayApi.perPage;
  console.log(total);
  if (inputEl.value === '') {
    return;
  }
  pixabayApi.page = 1;
  pixabayApi.photo = inputEl.value.trim();
  try {
    const { data } = await pixabayApi.fetchPhoto();
    console.log(data);

    const arrayPhoto = data.hits;
    galleryEl.innerHTML = makePhoto(arrayPhoto);

    if (data.totalHits === 0) {
      loadMoreEl.classList.add('is-hidden');
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data.totalHits < pixabayApi.perPage || data.totalHits === 0) {
      loadMoreEl.classList.add('is-hidden');
      galleryEl.insertAdjacentHTML(
        'beforeend',
        `"We're sorry, but you've reached the end of search results."`
      );
      return;
    }
    loadMoreEl.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

function makePhoto(arrayPhoto) {
  const photo = arrayPhoto
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px"height="300px"/>
  <div class="info">
    <p class="info-item">
      <b>likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>views ${views}</b>
    </p>
    <p class="info-item">
      <b>comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>downloads ${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  return photo;
}

const handleloadMore = async () => {
  pixabayApi.page += 1;
  try {
    const { data } = await pixabayApi.fetchPhoto();
    total += pixabayApi.perPage;
    console.log(total);

    const arrayPhoto = data.hits;
    galleryEl.insertAdjacentHTML('beforeend', makePhoto(arrayPhoto));

    if (data.totalHits < total) {
      loadMoreEl.classList.add('is-hidden');
      galleryEl.insertAdjacentHTML(
        'beforeend',
        `"We're sorry, but you've reached the end of search results."`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener('submit', handleSubmit);
loadMoreEl.addEventListener('click', handleloadMore);
