document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + galleryContainer.children.length) % galleryContainer.children.length;
        const offset = -currentIndex * 100;
        galleryContainer.style.transform = `translateX(${offset}%)`;
    }

    leftArrow.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    rightArrow.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    // Swipe functionality
    let startX = 0;
    let isSwiping = false;

    galleryContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    galleryContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const deltaX = e.touches[0].clientX - startX;
        galleryContainer.style.transform = `translateX(${(-currentIndex * 100) + (deltaX / window.innerWidth) * 100}%)`;
    });

    galleryContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        const deltaX = e.changedTouches[0].clientX - startX;
        if (deltaX > 50) {
            showImage(currentIndex - 1);
        } else if (deltaX < -50) {
            showImage(currentIndex + 1);
        } else {
            showImage(currentIndex); // Snap back if swipe is too short
        }
        isSwiping = false;
    });
});

