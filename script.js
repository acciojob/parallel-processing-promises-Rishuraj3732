//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url){
	return new Promise((resolve,reject)=>{
		const img=new Image();
		img.src=url;
		img.onload=()=>resolve(img);
		img.onerror=()=>reject(new Error(`Failed to load image: ${url}`));
		
	});
}
function downloadImages(urls) {
      const loadingDiv = document.getElementById("loading");
      const errorDiv = document.getElementById("error");
      const outputDiv = document.getElementById("output");

      // Reset UI
      errorDiv.textContent = "";
      outputDiv.innerHTML = "";

      // Show loading spinner
      loadingDiv.style.display = "block";

      // Download all images in parallel
      Promise.all(urls.map(downloadImage))
        .then(images => {
          // Hide loading spinner
          loadingDiv.style.display = "none";

          // Append images to output
          images.forEach(img => outputDiv.appendChild(img));
        })
        .catch(err => {
          // Hide loading spinner
          loadingDiv.style.display = "none";

          // Show error message
          errorDiv.textContent = err.message;
        });
}

    // Trigger download on page load
window.onload = () => downloadImages(images.map(img => img.url));
