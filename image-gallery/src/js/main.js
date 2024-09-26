import fetchData from "./services/API";
import renderImages from "./renderImages";

const PAGE = 1;
const PER_PAGE = 10;
const QUERY = "cats";
const COLOR = "orange";

const app = document.querySelector('#app');
app.innerHTML = `
 <div class="container mx-auto p-4">
    <div class="p-4 ">
      <h1 class="relative text-5xl uppercase text-white z-10">123</h1>
      <div class="flex gap-4 my-2">
      <input id="search-input" class="w-full rounded-2xl p-3 shadow-2xl hover:shadow-lime-300 duration-700 ease-in-out focus:outline-none focus:ring-0 focus:border-lime-600 focus:shadow-lime-300" placeholder="Inter your search"  autofocus autocomplete="off" />
      <button id="search-btn" class="min-w-44 rounded-2xl p-3 shadow-2xl bg-lime-300 hover:bg-lime-700 duration-700 ease-in-out uppercase font-medium">Search</button>
      </div>
    </div>
    <div id="images-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    
    </div>
  </div>
`;

const imagesContainer = document.querySelector('#images-container');


addEventListener('click', (event) => {
  if (event.target.id === 'search-input') {
    const qery = event.target.value;
    console.log(qery)
  }
})

async function startApp() {
  console.log('app started');
  const images = await fetchImages();
  if(images && imagesContainer) {
    renderImages(images.results, imagesContainer);
    console.log(images);
  }
}

async function fetchImages(query = QUERY, page = PAGE, perPage = PER_PAGE, color = COLOR) {
  try {
    const images = await fetchData(query, page, perPage, color);
    console.log(images);
    if (images) {
      console.log(images);
      return images;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}


startApp();