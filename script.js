const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(urls) {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  errorDiv.textContent = "";
  outputDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  Promise.all(urls.map(downloadImage))
    .then(images => {
      loadingDiv.style.display = "none";
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err.message;
    });
}

const btn = document.getElementById("download-images-button");
btn.addEventListener("click", () => downloadImages(images.map(img => img.url)));
