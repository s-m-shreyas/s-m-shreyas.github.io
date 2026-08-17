/*
 * script.js
 *
 * Main JavaScript file for the S.M. Shreyas portfolio website.
 *
 * Responsibilities:
 *
 *     - Smooth scrolling for internal navigation links
 */


document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});

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