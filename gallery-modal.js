// Gallery Image Modal/Lightbox with Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <span class="gallery-modal-close">&times;</span>
        <span class="gallery-modal-prev">&#10094;</span>
        <span class="gallery-modal-next">&#10095;</span>
        <div class="gallery-modal-content">
            <img src="" alt="Gallery Image">
        </div>
        <div class="gallery-modal-counter"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.gallery-modal-close');
    const prevBtn = modal.querySelector('.gallery-modal-prev');
    const nextBtn = modal.querySelector('.gallery-modal-next');
    const counter = modal.querySelector('.gallery-modal-counter');

    // Get all gallery images
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = 0;

    // Show specific image
    function showImage(index) {
        currentIndex = index;
        modalImg.src = galleryImages[currentIndex].src;
        modalImg.alt = galleryImages[currentIndex].alt;
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    }

    // Add click event to each gallery image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            showImage(index);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Navigation button events
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

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