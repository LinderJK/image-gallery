export function saveToLS(value) {
  localStorage.setItem('query', JSON.stringify(value));
}

export function getFromLS() {
  const data = localStorage.getItem('query');
  if(data) {
    return JSON.parse(data);
  }
  return null;
}