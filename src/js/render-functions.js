import SimpleLightbox from 'simplelightbox';

export const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

lightbox.refresh();

export function renderGallery(images) {

  const galleryMarkup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="card">
        <a href="${largeImageURL}" class="link">
          <img src="${webformatURL}" alt="${tags}">
          <ul class="list-container">
          <li class="item-description"><h3>Likes</h3> <p>${likes}</p></li>
          <li class="item-description"><h3>Views</h3> <p>${views}</p></li>
          <li class="item-description"><h3>Comments</h3> <p>${comments}</p></li>
          <li class="item-description"><h3>Downloads</h3> <p>${downloads}</p></li>
        </ul>
        </a>
      </li>
    `
  })
    .join('');
  
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  
  lightbox.refresh();
}

export function showResultMessage() {
  const resultMessage = document.createElement('p');
  resultMessage.classList.add('result-message');
  resultMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  galleryEl.insertAdjacentElement('afterend', resultMessage);
}