document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header, footer');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a little offset (e.g. 150px) so it triggers earlier
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up, .fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Trigger appear for hero immediately if in view
    setTimeout(() => {
        const hero = document.querySelector('.hero-section.fade-in');
        if (hero) hero.classList.add('visible');
    }, 100);

    // 4. Product Modal Logic
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    const detailButtons = document.querySelectorAll('.product-card .btn-outline');
    
    // Modal Elements
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const btnWa = document.querySelector('.btn-wa');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get product details from the card
            const card = e.target.closest('.product-card');
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const category = card.querySelector('.category').innerText;
            const price = card.querySelector('.price').innerText;

            // Populate Modal
            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalCategory.innerText = category;
            modalPrice.innerText = price;
            
            // Update WhatsApp link text
            const waText = `Halo Friscoll.id, saya tertarik dengan produk ${title} (${category}) seharga ${price}.`;
            btnWa.href = `https://wa.me/6287842732286?text=${encodeURIComponent(waText)}`;

            // Show Modal
            modal.classList.add('show');
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal when clicking (x)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // Close Modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});
