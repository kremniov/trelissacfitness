/**
 * Main JavaScript file for Trelissac Fitness website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handle notification banner
    initNotificationBanner();

    // Handle mobile menu
    initMobileMenu();

    // Initialize gallery slider
    initGallerySlider();

    // Initialize "Show More" buttons
    initShowMoreButtons();

    // Initialize tooltips
    initTooltips();

    // Initialize cookie banner
    initCookieBanner();

});

/**
 * Initialize notification banner functionality
 */
function initNotificationBanner() {
    // Get the close button and notification banner
    const closeBtn = document.querySelector('.close-btn');
    const notificationBanner = document.querySelector('.notification-banner');

    // Add click event listener to the close button
    if (closeBtn && notificationBanner) {
        closeBtn.addEventListener('click', function () {
            // Hide the notification banner
            notificationBanner.style.display = 'none';

            // Set a cookie to remember the user's preference
            setCookie('hideBanner', 'true', 7); // Hide for 7 days
        });

        // Check if banner should be hidden based on cookie
        if (getCookie('hideBanner') === 'true') {
            notificationBanner.style.display = 'none';
        }
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const navbar = document.getElementById('mainNavigation');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = new bootstrap.Collapse(navbar, {
        toggle: false
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = navbar.contains(event.target);
        const isClickOnToggler = navbarToggler.contains(event.target);

        if (navbar.classList.contains('show') && !isClickInsideMenu && !isClickOnToggler) {
            navbarCollapse.hide();
        }
    });

    // Close menu when clicking on a menu item
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            navbarCollapse.hide();
        });
    });
}

/**
 * Helper function to set a cookie
 */
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

/**
 * Helper function to get a cookie
 */
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize gallery slider
function initGallerySlider() {
    if ($('.gallery-slider').length) {
        $('.gallery-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            autoplay: false,
            centerMode: true,
            variableWidth: true,
            adaptiveHeight: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    }
}

// Handle "Show More" functionality for mobile activity sections
function initShowMoreButtons() {
    const showMoreButtons = document.querySelectorAll('.show-more');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const activitySection = this.closest('.activity-section');
            activitySection.classList.toggle('expanded');

            // Change button text based on expanded state
            if (activitySection.classList.contains('expanded')) {
                this.innerHTML = '<span class="fa fa-chevron-up"></span> Voir moins';
            } else {
                this.innerHTML = '<span class="fa fa-chevron-down"></span> Lire la suite';
            }
        });
    });
}

// Handle tooltip display
function initTooltips() {
    const infoTooltips = document.querySelectorAll('.info-tooltip, .info-tooltip-mobile');

    infoTooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function (e) {
            e.preventDefault();

            const tooltipText = this.querySelector('.tooltip-text, .tooltip-text-mobile');

            // Toggle tooltip visibility
            if (tooltipText.style.display === 'block') {
                tooltipText.style.display = 'none';
            } else {
                tooltipText.style.display = 'block';
            }
        });

        // Hide tooltip when clicking outside
        document.addEventListener('click', function (e) {
            if (!tooltip.contains(e.target)) {
                const tooltipText = tooltip.querySelector('.tooltip-text, .tooltip-text-mobile');
                if (tooltipText) {
                    tooltipText.style.display = 'none';
                }
            }
        });
    });
}

// Initialize options slider
function initOptionsSlider() {
    if ($('.options-slider').length) {
        if (!$('.options-slider').hasClass('slick-initialized')) {
            $('.options-slider').slick({
                dots: false,
                arrows: true,
                autoplay: false,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                adaptiveHeight: false,
                isAdaptiveWidth: false,
                centerMode: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    } else {
        if ($('.options-slider').hasClass('slick-initialized')) {
            $('.options-slider').slick('unslick');
        }
    }
}

// Call this function on document ready and window resize
$(document).ready(function() {
    initOptionsSlider();

    $(window).resize(function() {
        initOptionsSlider();
    });
});

/**
 * Initialize cookie banner functionality
 */
function initCookieBanner() {
    // Get cookie banner elements
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('cookie-accept');
    const declineButton = document.getElementById('cookie-decline');

    // Check if user has already made a choice
    if (!getCookie('cookieConsent')) {
        // Show the banner with a slight delay for better UX
        setTimeout(function() {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Handle accept button click
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            setCookie('cookieConsent', 'accepted', 365); // Store for 1 year
            hideBanner();

            // Here you can initialize your analytics or other cookie-dependent code
            // For example: initializeAnalytics();
        });
    }

    // Handle decline button click
    if (declineButton) {
        declineButton.addEventListener('click', function() {
            setCookie('cookieConsent', 'declined', 365); // Store for 1 year
            hideBanner();

            // Optionally disable any tracking if user declined
            // For example: disableTracking();
        });
    }

    // Function to hide the banner with animation
    function hideBanner() {
        cookieBanner.classList.remove('show');
    }
}
