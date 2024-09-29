import {createCard} from "./components/components.js";

export function renderContent(images, container) {

  container.replaceChildren();

  if (!images || images.length === 0) {
    const feedback = document.createElement('p');
    feedback.className = 'text-3xl text-white';
    feedback.textContent = 'No images found for your search :(';
    container.append(feedback);
    return
  }

  images.forEach((image) => {
    const card = createCard(image);
    container.append(card);
  })
}

export function applyNewContent(images, container) {
  images.forEach((image) => {
    const card = createCard(image);
    container.append(card);
  })
}

export function applyInfoBlock(container, info) {
  const infoBlock = document.createElement('div');
  infoBlock.className = 'text-white text-center text-3xl';
  infoBlock.textContent = info;
  container.append(infoBlock);
}

export function renderError(error, container) {
  container.replaceChildren();
  const feedback = document.createElement('p');
  feedback.className = 'text-3xl text-white';
  feedback.textContent = error.message;
  container.append(feedback);
}





