(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const githubLogo = "data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%23fff'/%3e%3c/svg%3e";
const rssLogo = "data:image/svg+xml,%3csvg%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_5701_38384)'%3e%3ccircle%20cx='32'%20cy='32'%20r='32'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13%2021.5095V42.5L19.3067%2042.4621V33.9474C20.0567%2033.9474%2020.7616%2033.9775%2021.4049%2034.4267C21.8946%2034.8785%2022.2838%2035.4335%2022.546%2036.054L25.9202%2042.4621H33C31.5957%2039.6675%2030.4706%2036.1327%2028.0552%2034.0104C27.5455%2033.6749%2026.9919%2033.4158%2026.411%2033.241C27.1873%2033.0779%2027.9357%2032.7973%2028.6319%2032.4084C30.3855%2031.3375%2031.3915%2029.3808%2031.3436%2027.3374C31.3798%2026.1328%2031.0495%2024.9466%2030.3988%2023.9441C28.9256%2021.6883%2025.9337%2021.4213%2023.4663%2021.5095H13ZM21.9939%2030.0116H19.3313V25.6975H22.1043C23.4807%2025.5594%2025.1814%2026.1754%2025.0859%2027.8041C25.1499%2029.5621%2023.3647%2029.9127%2021.9939%2030.0116Z'%20fill='%23FFB749'/%3e%3cpath%20d='M39.4768%2035.089L33%2035.4666C33.1262%2037.3671%2034.0021%2039.16%2035.4636%2040.5088C36.9117%2041.8323%2039.5076%2042.4941%2043.2515%2042.4941C46.3564%2042.5823%2049.9058%2041.8146%2051.821%2039.1569C52.5929%2038.0934%2053.0033%2036.8427%2052.9998%2035.564C53.0217%2033.1848%2051.4339%2031.2297%2049.3044%2030.3147C47.2632%2029.4766%2045.1198%2028.8674%2042.9204%2028.5C42.1107%2028.41%2041.3327%2028.1563%2040.6423%2027.757C39.9039%2027.2597%2040.078%2026.2272%2040.735%2025.7596C42.6084%2024.5207%2045.6299%2025.5545%2045.8608%2027.9032L52.2845%2027.5621C52.1703%2025.768%2051.1844%2024.0545%2049.6356%2022.9583C47.6987%2021.8887%2045.4532%2021.3874%2043.1986%2021.5212C41.3493%2021.4527%2039.5037%2021.7218%2037.7682%2022.3128C35.6082%2023.1125%2033.829%2025.064%2033.8344%2027.4525C33.7931%2028.9377%2034.5158%2030.4088%2035.755%2031.3621C37.6454%2032.6238%2039.8325%2033.4582%2042.139%2033.798C43.3833%2033.9637%2044.5727%2034.3795%2045.6224%2035.0159C46.5878%2035.7309%2046.5807%2037.167%2045.5959%2037.8903C44.5078%2038.6532%2042.9034%2038.7416%2041.6818%2038.2468C40.3717%2037.716%2039.6048%2036.4784%2039.4768%2035.089Z'%20fill='%23FFB749'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5701_38384'%3e%3crect%20width='64'%20height='64'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
function saveToLS(value) {
  localStorage.setItem("query", JSON.stringify(value));
}
function getFromLS() {
  const data2 = localStorage.getItem("query");
  if (data2) {
    return JSON.parse(data2);
  }
  return null;
}
const API_URL = "https://api.unsplash.com/search/photos/";
const API_KEY = "b2d-xVN3nyTpuPgXr0NC_uhTllQBxfq0kv-jra5F-ME";
async function fetchData(query) {
  const response = await fetch(query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Client-ID ${API_KEY}`
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
function createQuery(query, page, perPage, color) {
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (page) params.append("page", page);
  params.append("per_page", perPage);
  if (color) params.append("color", color);
  return params.toString();
}
async function fetchImages(query, page, perPage, color) {
  const queryString = createQuery(query, page, perPage, color);
  saveToLS({ query, color });
  const fullUrl = `${API_URL}?${queryString}`;
  try {
    const images = await fetchData(fullUrl);
    if (images) {
      return images;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
function createImage(url, alt) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = alt;
  img.setAttribute("loading", "lazy");
  img.className = "w-full h-full object-cover";
  return img;
}
function createLikes(likes) {
  const likesDiv = document.createElement("div");
  likesDiv.className = "text-2xl text-white p-4 bg-black bg-opacity-50";
  likesDiv.textContent = `❤️ ${likes}`;
  return likesDiv;
}
function createColorChip(color) {
  const colorDiv = document.createElement("div");
  colorDiv.className = "text-2xl text-white p-4 bg-black bg-opacity-30";
  const colorSpan = document.createElement("span");
  colorSpan.textContent = "Color palette: ";
  const colorText = document.createElement("span");
  colorText.style.backgroundColor = color;
  colorText.style.padding = "0.2rem 0.5rem";
  colorText.style.borderRadius = "5px";
  colorText.textContent = color;
  colorSpan.appendChild(colorText);
  colorDiv.appendChild(colorSpan);
  return colorDiv;
}
function createAuthor(author) {
  const authorDiv = document.createElement("div");
  authorDiv.className = "text-2xl text-white absolute bottom-0 right-0 p-4 bg-black bg-opacity-50 words-wrap";
  authorDiv.textContent = author;
  return authorDiv;
}
function createDescription(description) {
  const desc = document.createElement("div");
  desc.className = "text-2xl text-white";
  desc.textContent = description || "...";
  return desc;
}
function createCard(image) {
  const { urls, description, user, likes, color } = image;
  const cardDiv = document.createElement("div");
  cardDiv.className = "w-full h-full relative cursor-pointer overflow-hidden rounded-2xl opacity-0 translate-y-10 transition-all duration-500 ease-in-out hover:brightness-150";
  const img = createImage(urls.regular, description);
  const desc = createInfoBlock(description, user.username, likes, color);
  cardDiv.append(desc);
  cardDiv.append(img);
  requestAnimationFrame(() => {
    cardDiv.classList.remove("opacity-0", "translate-y-10");
  });
  cardDiv.addEventListener("click", () => {
    desc.classList.toggle("opacity-0");
  });
  return cardDiv;
}
function createInfoBlock(description, author, likes, color) {
  const div = document.createElement("div");
  div.className = "bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 p-4 opacity-0 transition-opacity duration-500 ease-in-out";
  const infoDiv = document.createElement("div");
  infoDiv.className = "flex flex-col justify-between gap-4";
  const descDiv = createDescription(description);
  const authorDiv = createAuthor(author);
  const likesDiv = createLikes(likes);
  const colorDiv = createColorChip(color);
  infoDiv.append(authorDiv, descDiv, likesDiv, colorDiv);
  div.append(infoDiv);
  return div;
}
function renderContent(images, container) {
  container.replaceChildren();
  if (!images || images.length === 0) {
    const feedback = document.createElement("p");
    feedback.className = "text-3xl text-white";
    feedback.textContent = "No images found for your search :(";
    container.append(feedback);
    return;
  }
  images.forEach((image) => {
    const card = createCard(image);
    container.append(card);
  });
}
function applyNewContent(images, container) {
  images.forEach((image) => {
    const card = createCard(image);
    container.append(card);
  });
}
function applyInfoBlock(container, info) {
  const infoBlock = document.createElement("div");
  infoBlock.className = "text-white text-center text-3xl";
  infoBlock.textContent = info;
  container.append(infoBlock);
}
function renderError(error, container) {
  container.replaceChildren();
  const feedback = document.createElement("p");
  feedback.className = "text-3xl text-white";
  feedback.textContent = error.message;
  container.append(feedback);
}
function infiniteScroll(container) {
  let canScroll = true;
  let isLoading = false;
  let resizeTimeout;
  let count = 1;
  const threshold = 1;
  window.onscroll = () => {
    if (!canScroll || isLoading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
      isLoading = true;
      canScroll = false;
      count += 1;
      infiniteScrollCreateData(count, container).then(() => {
        isLoading = false;
        canScroll = true;
      }).catch((error) => {
        console.error(error);
        isLoading = false;
        canScroll = true;
      });
    }
  };
  window.addEventListener("resize", (event) => {
    canScroll = false;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      canScroll = true;
    }, 1e3);
  });
}
async function infiniteScrollCreateData(page, container) {
  const queryData = getFromLS();
  const data2 = await fetchImages(queryData.query, page, 9, queryData.color);
  if (data2.total_pages === page) {
    applyInfoBlock(container, `No more images found for your search :(`);
    return;
  }
  if (data2) {
    applyNewContent(data2.results, container);
  }
}
const PAGE = 1;
const PER_PAGE = 9;
const QUERY = "plant";
const COLOR = "green";
const data = (/* @__PURE__ */ new Date()).getFullYear();
let currentColor = "";
const app = document.querySelector("#app");
app.innerHTML = `
 <div class="container mx-auto p-4 relative">
    <header class="mb-12 mt-5">
      <h1 class="text-5xl uppercase text-white z-10">Image Gallery</h1>
      <form class="flex gap-4 my-2" id="search-form">
        <input required name="search-query" type="text" id="search-input" class="w-full rounded-2xl p-3 shadow-2xl hover:shadow-lime-300 duration-700 ease-in-out focus:outline-none focus:ring-0 focus:border-lime-600 focus:shadow-lime-300" placeholder="Enter your search"  autofocus autocomplete="off" />
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
    <footer class="text-white bg-slate-900 bg-opacity-70 py-4 fixed bottom-0 left-0 w-screen">
    <div class="flex gap-4 justify-between items-center mx-auto max-w-5xl">
     <a href="https://github.com/LinderJK" target="_blank" class="hover:rotate-180 transition-transform duration-300 ease-in-out">
      <img src="${githubLogo}" alt="logo-github" class="w-8">
      </a>
      <p>Created by LinderJK</p>
      <p>&copy; ${data}</p>
      <a href="https://rs.school/courses/javascript-preschool-ru" target="_blank" class="hover:rotate-180 transition-transform duration-300 ease-in-out">
       <img src="${rssLogo}" alt="logo-rss" class="w-8">
      </a>
    </div>
    </footer>
  </div>
`;
const colorSelect = document.querySelector("#color-select");
const imagesContainer = document.querySelector("#images-container");
const form = document.querySelector("#search-form");
colorSelect.addEventListener("change", (event) => {
  if (event.target.value === "") {
    currentColor = "";
  }
  currentColor = event.target.value;
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form2 = event.target;
  const formData = new FormData(form2);
  const query = formData.get("search-query");
  const data2 = await fetchImages(query, PAGE, PER_PAGE, currentColor);
  if (data2 && imagesContainer) {
    renderContent(data2.results, imagesContainer);
  } else {
    renderError(new Error("Something went wrong"), imagesContainer);
  }
});
async function startApp() {
  const images = await fetchImages(QUERY, PAGE, PER_PAGE, COLOR);
  if (images && imagesContainer) {
    renderContent(images.results, imagesContainer);
  } else {
    renderError(new Error("Something went wrong"), imagesContainer);
  }
  infiniteScroll(imagesContainer);
}
startApp();
//# sourceMappingURL=index-B2LX9zDK.js.map
