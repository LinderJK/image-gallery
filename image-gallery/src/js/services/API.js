
const API_URL = "https://api.unsplash.com/search/photos/";
const API_KEY = import.meta.env.VITE_API_KEY;

export default async function fetchData(query, page, perPage, color) {
  const data = await fetch(`${API_URL}?query=${query}&page=${page}&per_page=${perPage}&color=${color}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Client-ID ${API_KEY}`,
    },
  });
  const result = await data.json();
  if(!result) throw new Error('No data');
  return result;
}