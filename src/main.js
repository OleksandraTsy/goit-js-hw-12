import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getDataFromAPI } from './js/pixabay-api';
import './css/loader.css';
import {
  renderGallery,
  galleryEl,
  showResultMessage,
} from './js/render-functions';


const searchForm = document.querySelector('.form');
const inputElement = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

hideLoader();

let page = 1;
let userQuery = '';
const perPage = 15;

searchForm.addEventListener('submit', submitHandle);

async function submitHandle(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  userQuery = inputElement.value.trim();
  page = 1;

  if (userQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in the field for search!',
      position: 'topCenter',
    });
    hideLoadMoreBtn();

    return;
  }

  endOfCollectionMessage();

  showLoader();

  try {
    const images = await getDataFromAPI(userQuery, page, perPage);
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      galleryEl.innerHTML = '';
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
      
      hideLoadMoreBtn();
      return;
    } else {
      renderGallery(images.hits);
      inputElement.value = '';
      showLoadMoreBtn();
    }
    if (perPage * page >= totalHits) {
      hideLoadMoreBtn();
      showResultMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again.',
      position: 'topCenter',
    });

  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  try {
    if (loadMoreBtn) {
      page += 1;
    }
    const images = await getDataFromAPI(userQuery, page, perPage);
    const totalHits = images.totalHits;

    renderGallery(images.hits);
    showLoader();
    if (perPage * page >= totalHits) {
      hideLoadMoreBtn();
      showResultMessage();
    }

    const galleryCardHeight =
      galleryEl.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: galleryCardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
    });
  } finally {
    hideLoader();
  }
});

// ==== L O A D E R ===== //
function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

// ==== L O A D   M O R E   C A R D S ===== //
function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

// ==== M E S S A G E ==== //
function endOfCollectionMessage() {
  const resultMessage = document.querySelector('.result-message');
  if (resultMessage) {
    resultMessage.remove();
  }
}