import {renderContent} from "./render.js";
import fetchData from "./services/API.js";
import githubLogo from '../assets/github-mark-white.svg';
import rssLogo from '../assets/rss-logo.svg';

const PAGE = 1;
const PER_PAGE = 10;
const QUERY = "cat";
const COLOR = "green";
const data = new Date().getFullYear();

const app = document.querySelector('#app');
app.innerHTML = `
 <div class="container mx-auto p-4">
    <header class="py-12">
      <h1 class="relative text-5xl uppercase text-white z-10">Image Gallery</h1>
      <div class="flex gap-4 my-2">

      <input id="search-input" class="w-full rounded-2xl p-3 shadow-2xl hover:shadow-lime-300 duration-700 ease-in-out focus:outline-none focus:ring-0 focus:border-lime-600 focus:shadow-lime-300" placeholder="Inter your search"  autofocus autocomplete="off" />
      <input type="color" id="color-input" class="w-20" datatype="hex">
      <button id="search-btn" class="min-w-44 rounded-2xl p-3 shadow-2xl text-white bg-lime-700 hover:bg-lime-400 hover:shadow-inner hover:scale-105 duration-700 ease-in-out uppercase font-medium">
  Search
</button>


      </div>
    </header>
    <main id="images-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    </main>
    <footer class="text-white py-4 flex gap-4 justify-between items-center">
    <a href="https://github.com/LinderJK" target="_blank" class="hover:rotate-180 transition-transform duration-300 ease-in-out">
      <img src="${githubLogo}" alt="logo-github" class="w-10">
      </a>
      <p>Created by LinderJK</p>
      <p>&copy; ${data}</p>
      <a href="https://rs.school/courses/javascript-preschool-ru" target="_blank" class="hover:rotate-180 transition-transform duration-300 ease-in-out">
       <img src="${rssLogo}" alt="logo-rss" class="w-10">
      </a>
    </footer>
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
    renderContent(images.results, imagesContainer);
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
