import { getFromLS } from "../services/LS";
import { fetchImages } from "../services/API";
import { applyInfoBlock, applyNewContent } from "../render";

export function infiniteScroll(container) {
  let canScroll = true;
  let isLoading = false;
  let resizeTimeout;
  let count = 1;
  const threshold = 1;

  window.onscroll = () => {
    if(!canScroll || isLoading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
      isLoading = true;
      canScroll = false;
      count += 1;
      infiniteScrollCreateData(count, container)
      .then(() => {
        isLoading = false;
        canScroll = true;
      })
      .catch((error) => {
        console.error(error);
        isLoading = false;
        canScroll = true;
      })
    }
  }

  window.addEventListener('resize', (event) => {
    canScroll = false;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      canScroll = true;
    }, 1000);
  })
}


async function infiniteScrollCreateData(page, container) {
  const queryData = getFromLS();
  const data = await fetchImages(queryData.query, page, 9, queryData.color);
  if (data.total_pages === page) {
    applyInfoBlock(container, `No more images found for your search :(`);
    return;
  }
  if(data) {
    applyNewContent(data.results, container, true);
  }
}
