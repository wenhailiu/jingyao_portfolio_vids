document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryContainer.children.length;
        const offset = -currentIndex * 100;
        galleryContainer.style.transform = `translateX(${offset}%)`;
    }

    galleryContainer.addEventListener('click', showNextImage);
});

