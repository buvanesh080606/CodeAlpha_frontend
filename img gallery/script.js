let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const images = document.querySelectorAll(".card img");

    document.getElementById("lightbox-img").src = images[index].src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function nextImage() {
    const images = document.querySelectorAll(".card img");
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

function prevImage() {
    const images = document.querySelectorAll(".card img");
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

function filterImages(category) {
    const cards = document.querySelectorAll(".card");
    const buttons = document.querySelectorAll(".filters button");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    cards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
