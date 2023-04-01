import '../css/styles.css';
import { pixabayAPI } from './fetchPhoto.js';
import Notiflix from 'notiflix';
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.input');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.load-more');

const pixabayAPI = new pixabayAPI();
let total = 0;
const handleSubmit = async event => {
  event.preventDefault();
  total = 0;
  total += pixabayAPI.perPage;
  console.log(total);
  if (inputEl.value === '') {
    return;
  }
  pixabayAPI.page = 1;
  pixabayAPI.photo = inputEl.value.trim();
  try {
    const { data } = await pixabayAPI.fetchPhoto();
    console.log(data);
    const arrayPhoto = data.hits;
    galleryEl.innerHTML = makePhoto(arrayPhoto);
    if (data.totalHits === 0) {
      loadMoreEl.classList.add('is-hidden');
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data.totalHits < pixabayAPI.perPage || data.totalHits === 0) {
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
  pixabayAPI.page += 1;
  try {
    const { data } = await pixabayAPI.fetchPhoto();
    total += pixabayAPI.perPage;
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

// import { pixabayAPI } from './pixabay-api';
// import createGalleryCards from '../templates/gallery-card.hbs';

// const searchFormEl = document.querySelector('.js-search-form');
// const galleryListEl = document.querySelector('.js-gallery');
// const loadMoreBtnEl = document.querySelector('.js-load-more');

// const pixabayApi = new pixabayAPI();

// const handleSearchFormSubmit = async event => {
//   event.preventDefault();

//   const searchQuery = event.currentTarget.elements['user-search-query'].value;
//   pixabayApi.query = searchQuery;

//   try {
//     const { data } = await pixabayApi.fetchPhotos();

//     if (!data.results.length) {
//       console.log('Images not found!');
//       return;
//     }

//     galleryListEl.innerHTML = createGalleryCards(data.results);
//     loadMoreBtnEl.classList.remove('is-hidden');
//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleLoadMoreBtnClick = async () => {
//   pixabayApi.page += 1;

//   try {
//     const { data } = await pixabayApi.fetchPhotos();

//     if (pixabayApi.page === data.total_pages) {
//       loadMoreBtnEl.classList.add('is-hidden');
//     }

//     galleryListEl.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCards(data.results)
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// searchFormEl.addEventListener('submit', handleSearchFormSubmit);
// loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
