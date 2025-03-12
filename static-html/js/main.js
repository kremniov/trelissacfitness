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

    createPlanningPopup();

    initPlanningPopup();

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

    function hideBanner() {
        cookieBanner.classList.remove('show');
    }
}

function createPlanningPopup() {
    const popupContainer = document.createElement('div');
    popupContainer.className = 'planning-popup-container';


    popupContainer.innerHTML = `
<div class="planning-popup">
            <div class="planning-header">
                <h2 class="planning-title">Planning</h2>
                <h3 class="planning-subtitle">des cours collectifs coachés</h3>
                <p class="planning-included">Compris dans l'abonnement Ultimate</p>
                <img src="images/hero-logo-b.png" alt="Trélissac Fitness" class="planning-logo">
                <button class="planning-close" onclick="closePlanningPopup()">&times;</button>
            </div>
            <div class="planning-content">
                <div class="planning-table-container">
                    <table class="planning-table">
                        <thead>
                            <tr>
                                <th>Lundi</th>
                                <th>Mardi</th>
                                <th>Mercredi</th>
                                <th>Jeudi</th>
                                <th>Vendredi</th>
                                <th>Samedi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Cours du matin/milieu de matinée -->
                            <tr>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">10h00 à 11h00</div>
                                        <div class="planning-class-name">Zumba</div>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Cours du midi -->
                            <tr>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">12h15 à 13h00</div>
                                        <div class="planning-class-name">Body Pump</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">12h15 à 13h00</div>
                                        <div class="planning-class-name">CAF</div>
                                    </div>
                                </td>
                                <td class="empty"></td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">12h15 à 13h00</div>
                                        <div class="planning-class-name">Body Sculpt</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">12h15 à 13h00</div>
                                        <div class="planning-class-name">Step</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">11h00 à 12h00</div>
                                        <div class="planning-class-name">Pilates</div>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Cours début de soirée 1 -->
                            <tr>
                                <td class="empty"></td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">18h00 à 19h00</div>
                                        <div class="planning-class-name">HIIT</div>
                                    </div>
                                </td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                            </tr>
                            
                            <!-- Cours début de soirée 2 -->
                            <tr>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">18h00 à 19h00 | 18h15 à 19h00</div>
                                        <div class="planning-class-name">Cross Training | Biking</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">19h00 à 19h45</div>
                                        <div class="planning-class-name">Step</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">18h30 à 19h15</div>
                                        <div class="planning-class-name">Strong Nation</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">18h30 à 19h15</div>
                                        <div class="planning-class-name">HIIT</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">18h30 à 19h00</div>
                                        <div class="planning-class-name">Strong Nation</div>
                                    </div>
                                </td>
                                <td class="empty"></td>
                            </tr>
                            
                            <!-- Cours de fin de soirée -->
                            <tr>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">19h00 à 19h30</div>
                                        <div class="planning-class-name">Abdos Flash</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">19h45 à 20h15</div>
                                        <div class="planning-class-name">Body Pump</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">19h00 à 20h00</div>
                                        <div class="planning-class-name">Zumba</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="planning-class-container">
                                        <div class="planning-class-time">19h15 à 19h45</div>
                                        <div class="planning-class-name">Abdos Fessiers</div>
                                    </div>
                                </td>
                                <td class="empty"></td>
                                <td class="empty"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="planning-footer">
                <div class="planning-note">La journée, lorsqu'il n'y a pas de cours collectifs, les cours virtuels sont à disposition</div>
                <div class="planning-contact">Tél : 05 33 82 00 23</div>
                <div class="planning-buttons">
                    <a href="#" class="planning-btn" onclick="closePlanningPopup()">Fermer</a>
                    <a href="docs/planning.pdf" class="planning-btn planning-btn-download" target="_blank">Télécharger le PDF</a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(popupContainer);
}

function initPlanningPopup() {
    const planningLinks = document.querySelectorAll('.btn-planning, .btn-planning-mobile');

    planningLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openPlanningPopup();
        });
    });

    const popupContainer = document.querySelector('.planning-popup-container');
    if (popupContainer) {
        popupContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closePlanningPopup();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePlanningPopup();
        }
    });
}

function openPlanningPopup() {
    const popupContainer = document.querySelector('.planning-popup-container');
    if (popupContainer) {
        popupContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
    }
}

function closePlanningPopup() {
    const popupContainer = document.querySelector('.planning-popup-container');
    if (popupContainer) {
        popupContainer.style.display = 'none';
        document.body.style.overflow = ''; // Restaurer le défilement de la page
    }
};
