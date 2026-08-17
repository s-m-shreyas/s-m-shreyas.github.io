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