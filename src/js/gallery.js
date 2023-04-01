
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
