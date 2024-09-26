import createAuthor, {createColorChip, createDescription, createImage, createLikes} from "./ui.js";


export function createCard(image) {
  const {urls, description, user, likes, color} = image;
  const cardDiv = document.createElement('div');
  cardDiv.className ='w-full h-full relative cursor-pointer overflow-hidden rounded-2xl hover:brightness-150 duration-700 ease-in-out';

  const img = createImage(urls.regular, description);
  const desc = createInfoBlock(description, user.username, likes, color);

  cardDiv.append(desc);
  cardDiv.append(img);

  cardDiv.addEventListener('click', () => {
    desc.classList.toggle('opacity-0');
  })
  return cardDiv
}

export function createInfoBlock(description, author, likes, color) {
  const div = document.createElement('div');
  div.className = 'bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 p-4 opacity-0 transition-opacity duration-500 ease-in-out';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'flex flex-col justify-between gap-4';

  const descDiv = createDescription(description);
  const authorDiv = createAuthor(author);
  const likesDiv = createLikes(likes);
  const colorDiv = createColorChip(color);

  infoDiv.append(authorDiv, descDiv,likesDiv, colorDiv, );
  div.append(infoDiv);
  return div;
}
