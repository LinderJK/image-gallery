
const API_URL = "https://api.unsplash.com/search/photos/";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchData(query) {
  const response = await fetch(query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Client-ID ${API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export function createQuery(query, page, perPage, color) {
  const params = new URLSearchParams();

  if (query) params.append('query', query);
  if (page) params.append('page', page);
  if (perPage) params.append('per_page', perPage);
  if (color) params.append('color', color);

  return params.toString();
}

export async function fetchImages(query, page, perPage, color) {
  const queryString = createQuery(query, page, perPage, color);
  const fullUrl = `${API_URL}?${queryString}`;

  try {
    const images = await fetchData(fullUrl);
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
