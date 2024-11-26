let angle = 0;
let isDragging = false;
let startX;

const gallery = document.querySelector('.gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const audio = document.getElementById('background-music');

// Open modal with image and start music
function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
    audio.play();  // Play music when an image is clicked
}

// Close modal
function closeModal() {
    modal.style.display = "none";
    audio.pause();  // Pause music when modal is closed
}

// Rotate gallery automatically
setInterval(() => {
    if (!isDragging) {
        angle += 1;
        gallery.style.transform = `translateZ(-200px) rotateY(${angle}deg)`; // Mantén la galería centrada
    }
}, 50);

gallery.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - angle;
});

gallery.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.pageX - startX;
        angle = x;
        gallery.style.transform = `translateZ(-200px) rotateY(${angle}deg)`; // Mantén la galería centrada
    }
});

gallery.addEventListener('mouseup', () => {
    isDragging = false;
});

gallery.addEventListener('mouseleave', () => {
    isDragging = false;
});
