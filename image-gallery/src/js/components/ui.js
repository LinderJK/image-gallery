export function createImage(url, alt) {
  const img = document.createElement('img');
  img.src = url;
  img.alt = alt;
  img.setAttribute('loading', 'lazy');
  img.className ='w-full h-full object-cover';
  return img;
}

export function createLikes(likes) {
  const likesDiv = document.createElement('div');
  likesDiv.className = 'text-2xl text-white p-4 bg-black bg-opacity-50';
  likesDiv.textContent = `❤️ ${likes}`;
  return likesDiv;
}

export function createColorChip(color) {
  const colorDiv = document.createElement('div');
  colorDiv.className = 'text-2xl text-white p-4 bg-black bg-opacity-30';

  const colorSpan = document.createElement('span');
  colorSpan.textContent = 'Color palette: ';

  const colorText = document.createElement('span');
  colorText.style.backgroundColor = color;
  colorText.style.padding = '0.2rem 0.5rem';
  colorText.style.borderRadius = '5px';
  colorText.textContent = color;

  colorSpan.appendChild(colorText);

  colorDiv.appendChild(colorSpan);

  return colorDiv;
}

export default function createAuthor(author) {
  const authorDiv = document.createElement('div');
  authorDiv.className = 'text-2xl text-white absolute bottom-0 right-0 p-4 bg-black bg-opacity-50 words-wrap';
  authorDiv.textContent = author;
  return authorDiv
}

export function createDescription(description) {
  const desc = document.createElement('div');
  desc.className = 'text-2xl text-white';
  desc.textContent = description || '...';
  return desc
}
