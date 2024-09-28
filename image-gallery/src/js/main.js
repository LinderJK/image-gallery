import githubLogo from "../assets/github-mark-white.svg";
import rssLogo from "../assets/rss-logo.svg";
import { infiniteScroll } from "./utils/infiniteScroll.js";
import {renderContent, renderError} from "./render.js";
import {fetchImages} from "./services/API.js";


const PAGE = 1;
const PER_PAGE = 9;
const QUERY = "plant";
const COLOR = "green";
const data = new Date().getFullYear();

let currentColor = '';

const app = document.querySelector('#app');
app.innerHTML = `
 <div class="container mx-auto p-4">
    <header class="py-12">
      <h1 class="relative text-5xl uppercase text-white z-10">Image Gallery</h1>
      <form class="flex gap-4 my-2" id="search-form">
        <input required name="search-query" type="text" id="search-input" class="w-full rounded-2xl p-3 shadow-2xl hover:shadow-lime-300 duration-700 ease-in-out focus:outline-none focus:ring-0 focus:border-lime-600 focus:shadow-lime-300" placeholder="Inter your search"  autofocus autocomplete="off" />
        <div class="flex items-center">
          <select id="color-select" class="ml-1 bg-slate-900 border border-lime-700 text-white rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 hover:bg-lime-900 transition-colors duration-300 ease-in-out">
              <option value="" selected>Chooose color?</option>
              <option class="text-gray-500" value="black_and_white">Black and white</option>
              <option class="text-black" value="black">Black</option>
              <option class="text-white" value="white">White</option>
              <option class="text-yellow-400" value="yellow">Yellow</option>
              <option class="text-amber-600" value="orange">Orange</option>
              <option class="text-red-500" value="red">Red</option>
              <option class="text-purple-500" value="purple">Purple</option>
              <option class="text-pink-500" value="magenta">Magenta</option>
              <option class="text-green-500" value="green">Green</option>
              <option class="text-teal-500" value="teal">Teal</option>
              <option class="text-blue-500" value="blue">Blue</option>
          </select>
        </div>
        <button type="submit" id="search-btn" class="min-w-44 rounded-2xl p-3 shadow-2xl text-white bg-lime-700 hover:bg-lime-400 hover:shadow-inner hover:scale-105 duration-700 ease-in-out uppercase font-medium">
          Search
        </button>
      </form>
    </header>
    <main id="images-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    </main>
    <footer class="text-white bg-slate-900 bg-opacity-70 py-4 flex gap-4 justify-between items-center sticky bottom-0">
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

const colorSelect = document.querySelector('#color-select');
const imagesContainer = document.querySelector('#images-container');
const form = document.querySelector('#search-form');

colorSelect.addEventListener('change', (event) => {
  if (event.target.value === '') {
    currentColor = '';
  }
  currentColor = event.target.value;
  console.log(currentColor);
})

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const query = formData.get('search-query');
    const data = await fetchImages(query, PAGE, PER_PAGE, currentColor);

    if(data && imagesContainer) {
      renderContent(data.results, imagesContainer);
      console.log(data);
    } else {
      renderError(new Error('Something went wrong'), imagesContainer);
    }
})

async function startApp() {
  console.log('app started');
  const images = await fetchImages(QUERY, PAGE, PER_PAGE, COLOR);
  if(images && imagesContainer) {
    renderContent(images.results, imagesContainer);
    console.log(images);
  } else {
    renderError(new Error('Something went wrong'), imagesContainer);
  }
  infiniteScroll(imagesContainer);
}

startApp();
