/*
 * script.js
 *
 * Main JavaScript file for the S.M. Shreyas portfolio website.
 *
 * Responsibilities:
 *
 *     - Copy phone number with toast notification
 *     - Typewriter effect for hero name
 *     - Skills horizontal scroll with arrow controls
 *     - Terminal typing effect for experience bullets
 */


// ================================================================
// Copy Phone Number with Toast Notification
// ================================================================

function copyPhoneNumber(event, phoneNumber) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showToast('📱 Phone number copied!');
        }).catch(() => {
            fallbackCopy(phoneNumber);
        });
    } else {
        fallbackCopy(phoneNumber);
    }
}

function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('📱 Phone number copied!');
}

function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


// ================================================================
// Typewriter Effect - Types "> S.M.Shreyas", cursor blinks forever
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const text = "> S.M.Shreyas";
    const typedElement = document.getElementById('typed-name');
    let index = 0;
    const typingSpeed = 100;

    function typeEffect() {
        if (index < text.length) {
            typedElement.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            typedElement.classList.add('glow-effect');
        }
    }

    typeEffect();

});


// ================================================================
// Skills Horizontal Scroll - Smooth "Swipe" Arrows
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const track = document.querySelector('.skills-scroll-track');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');

    if (!track || !leftBtn || !rightBtn) return;

    function getCardScrollStep() {
        const cards = track.querySelectorAll('.skill-card-floating');
        if (cards.length < 2) return 0;

        const firstCard = cards[0];
        const secondCard = cards[1];
        const cardWidth = firstCard.offsetWidth;
        const gap = secondCard.offsetLeft - (firstCard.offsetLeft + firstCard.offsetWidth);

        return cardWidth + gap;
    }

    rightBtn.addEventListener('click', () => {
        const step = getCardScrollStep();
        if (step === 0) return;

        const currentScroll = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const targetScroll = Math.min(currentScroll + step, maxScroll);

        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    });

    leftBtn.addEventListener('click', () => {
        const step = getCardScrollStep();
        if (step === 0) return;

        const currentScroll = track.scrollLeft;
        const targetScroll = Math.max(currentScroll - step, 0);

        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    });

    function checkOverflow() {
        const isOverflowing = track.scrollWidth > track.clientWidth;
        leftBtn.style.display = isOverflowing ? 'flex' : 'none';
        rightBtn.style.display = isOverflowing ? 'flex' : 'none';
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    function updateArrowFade() {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        leftBtn.style.opacity = scrollLeft <= 5 ? '0.3' : '1';
        leftBtn.style.pointerEvents = scrollLeft <= 5 ? 'none' : 'auto';

        rightBtn.style.opacity = maxScroll - scrollLeft <= 5 ? '0.3' : '1';
        rightBtn.style.pointerEvents = maxScroll - scrollLeft <= 5 ? 'none' : 'auto';
    }

    track.addEventListener('scroll', updateArrowFade);
    setTimeout(updateArrowFade, 150);

});


// ================================================================
// TERMINAL PROMPT - SEQUENTIAL APPEARANCE PER CARD
// Now works for BOTH Experience and Project cards!
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    // Get both experience and project articles
    const articles = document.querySelectorAll('#experience article, #projects article, #rd article');

    articles.forEach((article) => {
        // Only get the description list items, NOT the technology tags
        const items = article.querySelectorAll('ul:not(.project-technologies) li');
        if (items.length === 0) return;

        let hasTriggered = false;

        function revealArrows() {
            if (hasTriggered) return;
            hasTriggered = true;

            let delay = 0;
            const delayBetweenLines = 500;

            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, delay);
                delay += delayBetweenLines;
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasTriggered) {
                    revealArrows();
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(article);
    });

});

// ================================================================
// SCROLL-SPY - Highlight Active Navigation Link
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    function highlightNav() {
        let scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Offset by navbar height
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    
    // Run once on page load in case user refreshes mid-page
    highlightNav();

});