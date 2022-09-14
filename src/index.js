import Notiflix from 'notiflix';
import { markap } from './markap';
import { getImages } from './API';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  loadMoreThumb: document.querySelector('.loadMoreThumb'),
  gallery: document.querySelector('.gallery'),
  endOfGalleryMsg: document.querySelector('.endOfGalleryMsg'),
};

let searchQuery;
let page = 1;

refs.searchForm.addEventListener('submit', onSubmitHdlr);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnHdlr);

function onSubmitHdlr(e) {
  e.preventDefault();
  refs.loadMoreThumb.hidden = true;
  searchQuery = e.currentTarget.elements.searchQuery.value;

  getImages(searchQuery).then(resp => {
    if (resp.data.hits.length) {
      return (refs.gallery.innerHTML = markap(resp.data.hits));
    }
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  });
  page = 1;
  refs.endOfGalleryMsg.hidden = true;
  e.currentTarget.reset();
}

function onLoadMoreBtnHdlr() {
  page += 1;
  console.log(page);
  let renderNextGallery;

  getImages(searchQuery, page).then(resp => {
    renderNextGallery = refs.gallery.insertAdjacentHTML(
      'beforeend',
      markap(resp.data.hits)
    );
    if (resp.data.totalHits / resp.config.params.per_page <= page) {
      refs.loadMoreThumb.hidden = true;
      refs.endOfGalleryMsg.hidden = false;
    }
  });
  return renderNextGallery;
}
