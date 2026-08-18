/*
 * script.js
 *
 * Main JavaScript file for the S.M. Shreyas portfolio website.
 *
 * Responsibilities:
 *
 *     - Smooth scrolling for internal navigation links
 */




// ================================================================
// Copy Phone Number with Toast Notification
// ================================================================

function copyPhoneNumber(event, phoneNumber) {
    // If the user is on a desktop (no native dialer), we copy to clipboard
    // On mobile, the href="tel:" will handle the call natively.
    // We run this on both, but it works seamlessly.

    if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showToast('📱 Phone number copied!');
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopy(phoneNumber);
        });
    } else {
        fallbackCopy(phoneNumber);
    }
}

// Fallback copy method (works everywhere)
function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('📱 Phone number copied!');
}

// Show a temporary toast notification
function showToast(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger fade-in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto-remove after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ================================================================
// Typewriter Effect - Types ONCE, cursor blinks forever
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const text = "> S.M.Shreyas";
    const typedElement = document.getElementById('typed-name');
    let index = 0;
    const typingSpeed = 100; // How fast each letter appears (milliseconds)

    function typeEffect() {
    if (index < text.length) {
        typedElement.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, typingSpeed);
    } else {
        // 🔥 ADD THIS SINGLE LINE:
        // Adds the pulsing glow class as soon as "S.M. Shreyas" is fully typed
        typedElement.classList.add('glow-effect');
    }
}

    // Start the effect
    typeEffect();

});

// ================================================================
// Skills Horizontal Scroll - SMOOTH "Swipe" Arrows
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const track = document.querySelector('.skills-scroll-track');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');

    if (!track || !leftBtn || !rightBtn) return;

    // Helper: Get the width of one card + the gap between cards
    function getCardScrollStep() {
        const cards = track.querySelectorAll('.skill-card-floating');
        if (cards.length < 2) return 0;

        const firstCard = cards[0];
        const secondCard = cards[1];

        // Width of the first card
        const cardWidth = firstCard.offsetWidth;

        // Gap = distance from the right edge of card 1 to the left edge of card 2
        const gap = secondCard.offsetLeft - (firstCard.offsetLeft + firstCard.offsetWidth);

        return cardWidth + gap;
    }

    // Right arrow: swipe forward by exactly one card
    rightBtn.addEventListener('click', () => {
        const step = getCardScrollStep();
        if (step === 0) return;

        const currentScroll = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Move forward by one card, but never exceed the end
        const targetScroll = Math.min(currentScroll + step, maxScroll);

        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'  // 👈 This gives the fluid swipe feel
        });
    });

    // Left arrow: swipe backward by exactly one card
    leftBtn.addEventListener('click', () => {
        const step = getCardScrollStep();
        if (step === 0) return;

        const currentScroll = track.scrollLeft;

        // Move backward by one card, but never go below 0
        const targetScroll = Math.max(currentScroll - step, 0);

        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    });

    // ----- Optional: Auto-hide arrows when content fits -----
    function checkOverflow() {
        const isOverflowing = track.scrollWidth > track.clientWidth;
        leftBtn.style.display = isOverflowing ? 'flex' : 'none';
        rightBtn.style.display = isOverflowing ? 'flex' : 'none';
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // ----- Optional: Fade arrows at edges (visual polish) -----
    function updateArrowFade() {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Left arrow fades when at start
        leftBtn.style.opacity = scrollLeft <= 5 ? '0.3' : '1';
        leftBtn.style.pointerEvents = scrollLeft <= 5 ? 'none' : 'auto';

        // Right arrow fades when at end
        rightBtn.style.opacity = maxScroll - scrollLeft <= 5 ? '0.3' : '1';
        rightBtn.style.pointerEvents = maxScroll - scrollLeft <= 5 ? 'none' : 'auto';
    }

    track.addEventListener('scroll', updateArrowFade);
    setTimeout(updateArrowFade, 150);
});