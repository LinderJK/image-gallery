

export default function renderImages(images, container) {
  console.log(images);
  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image.urls.regular;
    img.alt = image.alt_description;
    img.classList.add('w-full');
    img.classList.add('h-full');
    img.classList.add('object-cover');
    container.append(img);
  })
}