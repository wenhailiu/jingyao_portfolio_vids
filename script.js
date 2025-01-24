document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;

    function createDots() {
        for (let i = 0; i < galleryContainer.children.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => showImage(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function showImage(index) {
        currentIndex = (index + galleryContainer.children.length) % galleryContainer.children.length;
        const offset = -currentIndex * 100;
        galleryContainer.style.transform = `translateX(${offset}%)`;
        updateDots();
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

    createDots();
});

