const photos = [
  { title: "Mountain morning", category: "nature", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=85" },
  { title: "Quiet architecture", category: "architecture", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1100&q=85" },
  { title: "A road to remember", category: "travel", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85" },
  { title: "Into the green", category: "nature", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85" },
  { title: "City geometry", category: "architecture", url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=85" },
  { title: "Coastal escape", category: "travel", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85" },
  { title: "Desert calm", category: "nature", url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1100&q=85" },
  { title: "Modern lines", category: "architecture", url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=85&sat=-30" },
  { title: "Wander often", category: "travel", url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85" },
  { title: "Forest light", category: "nature", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=85" },
  { title: "Old town charm", category: "architecture", url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=85" },
  { title: "Open horizons", category: "travel", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1100&q=85" }
];

const grid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCounter = document.getElementById("lightbox-counter");
const photoCount = document.getElementById("photo-count");

let visiblePhotos = photos;
let currentIndex = 0;

function renderGallery(category = "all") {
  visiblePhotos = category === "all"
    ? photos
    : photos.filter(photo => photo.category === category);

  grid.innerHTML = "";
  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" loading="lazy">
      <span class="card-caption">${photo.title}</span>
    `;
    card.addEventListener("click", () => openLightbox(index));
    grid.appendChild(card);
  });

  photoCount.textContent = `${visiblePhotos.length} photographs`;
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];
  lightboxImage.src = photo.url;
  lightboxImage.alt = photo.title;
  lightboxTitle.textContent = photo.title;
  lightboxCounter.textContent = `${currentIndex + 1} / ${visiblePhotos.length}`;
}

function showNext(step) {
  currentIndex = (currentIndex + step + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});

document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
document.getElementById("prev-image").addEventListener("click", () => showNext(-1));
document.getElementById("next-image").addEventListener("click", () => showNext(1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext(1);
  if (event.key === "ArrowLeft") showNext(-1);
});

renderGallery();
