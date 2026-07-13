(function(html) {

    'use strict';

    
   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader

    /* ==========================================
    Basic Content Protection
    ========================================== */

    // Disable right click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    // Disable image dragging
    document.querySelectorAll("img").forEach((img) => {
        img.setAttribute("draggable", "false");
    });

    // Disable dragging of any element
    document.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });


   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        // fix: query anchors inside mainNavWrap
        mainNavWrap.querySelectorAll('a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


   /* swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const homeSliderSwiper = new Swiper('.home-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1330px
                1331: {
                    slidesPerView: 3,
                    spaceBetween: 48
                },
                // when window width is > 1773px
                1774: {
                    slidesPerView: 4,
                    spaceBetween: 48
                }
            }
        });

        const pageSliderSwiper = new Swiper('.page-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper




    /* Back to Top
    * ------------------------------------------------------ */
   const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButtons = document.querySelectorAll(".ss-go-top");

        if (!goTopButtons.length) return;

        // Show or hide both buttons
            const toggleButtons = () => {
                goTopButtons.forEach(btn => {
                    if (window.scrollY >= pxShow) {
                        btn.classList.add("link-is-visible");
                    } else {
                        btn.classList.remove("link-is-visible");
                    }
                });
            };

        // Initial check
        toggleButtons();

        // Scroll listener
        window.addEventListener('scroll', toggleButtons);

    };
 // end ssBackToTop
 
/* header scroll state
    * ------------------------------------------------------ */
    const ssHeaderScroll = function() {

        const header = document.querySelector('.s-header');
        const resumeItem = document.querySelector('.s-header__resume-item');
        const contactWrap = document.querySelector('.s-header__contact');
        if (!header) return;

        const fadeDistance = 160;
        let ticking = false;

        const update = () => {
            const progress = Math.min(window.scrollY / fadeDistance, 1);
            header.style.setProperty('--scroll-progress', progress.toFixed(3));

            if (resumeItem) resumeItem.style.pointerEvents = progress > 0.5 ? 'auto' : 'none';
            if (contactWrap) contactWrap.style.pointerEvents = progress > 0.5 ? 'none' : 'auto';

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });

    }; // end ssHeaderScroll
    
   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        // Select all internal anchors except plain '#' or '#0'
        const triggers = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#0"])');

        if (!triggers.length) return;

        // Remove hash from URL without creating a new history entry
        function clearHashFromUrl() {
            const clean = window.location.pathname + window.location.search;
            history.replaceState(null, '', clean);
        }

        triggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // ensure it's an in-page anchor
                if (!href || href.charAt(0) !== '#') return;

                // skip if target doesn't exist
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                // Close mobile menu if open (keeps UX consistent)
                const siteBody = document.querySelector('body');
                const toggleButton = document.querySelector('.s-header__menu-toggle');
                if (window.matchMedia('(max-width: 900px)').matches && siteBody.classList.contains('menu-is-open')) {
                    if (toggleButton) toggleButton.classList.remove('is-clicked');
                    siteBody.classList.remove('menu-is-open');
                }

                // Smooth scroll
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Accessibility: focus target
                const hadTabIndex = target.hasAttribute('tabindex');
                if (!hadTabIndex) target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });

                if (!hadTabIndex) {
                    // cleanup temporary tabindex after a bit
                    setTimeout(() => { target.removeAttribute('tabindex'); }, 1000);
                }

                // Remove fragment from address bar immediately (no new history entry)
                clearHashFromUrl();
            });
        });

        // If user opened the page with a hash, let browser scroll then remove it
        document.addEventListener('DOMContentLoaded', function () {
            if (window.location.hash) {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    setTimeout(clearHashFromUrl, 250);
                } else {
                    clearHashFromUrl();
                }
            }
        });
    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssSwiper();
        ssMoveTo();
        ssBackToTop();
        ssHeaderScroll();
    })();

            /* open social links in default app if on mobile */
        const socialLinks = document.querySelectorAll('.also-socials a');

        socialLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Detect if on mobile
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    e.preventDefault();

                    if (href.includes('linkedin.com')) {
                        window.location.href = 'linkedin://in/gauthamkrishnaj';
                    } else if (href.includes('github.com')) {
                        window.location.href = href;
                    } else if (href.includes('instagram.com')) {
                        window.location.href = 'instagram://user?username=iam._.gautham';
                    }

                    // fallback if app not installed
                    setTimeout(() => {
                        window.open(href, '_blank');
                    }, 800);
                }
            });
        });


        window.addEventListener("load", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

/* ==========================================
   COMMAND PALETTE
========================================== */

const palette = document.getElementById("commandPalette");
const input = document.getElementById("commandInput");
const items = document.querySelectorAll("#commandList li");

if (palette && input) {

    document.addEventListener("keydown", (e) => {

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

            e.preventDefault();

            palette.classList.add("show");

            input.value = "";
            input.focus();

            items.forEach(item => item.style.display = "block");
        }

        if (e.key === "Escape") {

            palette.classList.remove("show");

        }

    });

    palette.addEventListener("click", (e) => {

        if (e.target === palette) {

            palette.classList.remove("show");

        }

    });

    input.addEventListener("input", () => {

        const search = input.value.toLowerCase();

        items.forEach(item => {

            item.style.display = item.innerText
                .toLowerCase()
                .includes(search)
                    ? "block"
                    : "none";

        });

    });

    items.forEach(item => {

        item.addEventListener("click", () => {

            const link = item.dataset.link;

            palette.classList.remove("show");

            if (!link) return;

            if (link.startsWith("#")) {

                document.querySelector(link)?.scrollIntoView({
                    behavior: "smooth"
                });

            } else if (link.startsWith("mailto:")) {

                window.location.href = link;

            } else {

                window.open(link, "_blank", "noopener,noreferrer");

            }
        });
    });
}

/* ==========================================
   Email Protection
========================================== */

(() => {

    const user = ["gautham", "k357"].join("");
    const domain = ["gmail", "com"].join(".");

    const email = `${user}@${domain}`;
    const mailto = `mailto:${email}?subject=Portfolio%20Inquiry`;

    const emailLink = document.getElementById("emailLink");
    const connectBtn = document.getElementById("connectBtn");

    if (emailLink) {
        emailLink.href = mailto;
        emailLink.textContent = `📧 ${email}`;
    }

    if (connectBtn) {
        connectBtn.href = mailto;
    }

})();

})(document.documentElement);


