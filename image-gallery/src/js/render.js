import {createCard} from "./components/components.js";

export function renderContent(images, container) {
  console.log(images);
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

export function renderError(error, container) {
  console.log(error);
  container.replaceChildren();
  const feedback = document.createElement('p');
  feedback.className = 'text-3xl text-white';
  feedback.textContent = error.message;
  container.append(feedback);
}





