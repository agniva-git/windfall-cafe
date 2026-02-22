// Menu Image Modal/Lightbox with Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'menu-modal';
    modal.innerHTML = `
        <span class="menu-modal-close">&times;</span>
        <span class="menu-modal-prev">&#10094;</span>
        <span class="menu-modal-next">&#10095;</span>
        <div class="menu-modal-content">
            <img src="" alt="Menu Preview">
        </div>
        <div class="menu-modal-counter"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.menu-modal-close');
    const prevBtn = modal.querySelector('.menu-modal-prev');
    const nextBtn = modal.querySelector('.menu-modal-next');
    const counter = modal.querySelector('.menu-modal-counter');

    // Get all menu images
    const menuImages = Array.from(document.querySelectorAll('.menu-pages img'));
    let currentIndex = 0;

    // Show specific image
    function showImage(index) {
        currentIndex = index;
        modalImg.src = menuImages[currentIndex].src;
        modalImg.alt = menuImages[currentIndex].alt;
        counter.textContent = `${currentIndex + 1} / ${menuImages.length}`;
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + menuImages.length) % menuImages.length;
        showImage(currentIndex);
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % menuImages.length;
        showImage(currentIndex);
    }

    // Add click event to each menu image
    menuImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            showImage(index);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Navigation button events
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', prevImage);

    // Close modal when clicking X button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            nextImage();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            prevImage();
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});