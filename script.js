/* Digital Dreams Photography - Main Script
   Student: Dominique Winkleman | IT299 | Project #123345
   April 1, 2026 */

window.onload = function() {

    // ---- Gallery filter buttons ----
    let filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            let filter = btn.getAttribute('data-filter');
            let items = document.querySelectorAll('.gallery-item');

            items.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ---- Lightbox for gallery images ----
    // Collect all gallery images
    let galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    // Build lightbox HTML and add to page
    let lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div id="lightbox-overlay"></div>
        <div id="lightbox-box">
            <button id="lb-close">&times;</button>
            <button id="lb-prev">&#8249;</button>
            <img id="lb-img" src="" alt="">
            <button id="lb-next">&#8250;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add lightbox styles
    let style = document.createElement('style');
    style.textContent = `
        #lightbox { display: none; position: fixed; inset: 0; z-index: 999; }
        #lightbox.open { display: flex; align-items: center; justify-content: center; }
        #lightbox-overlay {
            position: absolute; inset: 0;
            background: rgba(0, 0, 0, 0.92);
        }
        #lightbox-box {
            position: relative; z-index: 1000;
            display: flex; align-items: center; justify-content: center;
            max-width: 90vw; max-height: 90vh;
        }
        #lb-img {
            max-width: 85vw; max-height: 88vh;
            object-fit: contain;
            display: block;
            border: 1px solid rgba(200, 184, 240, 0.15);
        }
        #lb-close {
            position: fixed; top: 20px; right: 28px;
            background: none; border: none;
            color: #f5f3ff; font-size: 44px;
            cursor: pointer; line-height: 1;
            opacity: 0.8;
        }
        #lb-close:hover { opacity: 1; }
        #lb-prev, #lb-next {
            background: rgba(124, 92, 191, 0.5);
            border: none; color: #f5f3ff;
            font-size: 36px; cursor: pointer;
            padding: 14px 18px; line-height: 1;
            transition: background 0.2s;
            flex-shrink: 0;
        }
        #lb-prev:hover, #lb-next:hover {
            background: rgba(124, 92, 191, 0.85);
        }
        .gallery-item { cursor: pointer; }
    `;
    document.head.appendChild(style);

    function openLightbox(index) {
        currentIndex = index;
        document.getElementById('lb-img').src = galleryImages[index].src;
        document.getElementById('lb-img').alt = galleryImages[index].alt;
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        document.getElementById('lightbox').classList.remove('open');
        document.body.style.overflow = '';
    }

    function showPrev() {
        // Skip hidden items (filtered out)
        let tries = 0;
        do {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            tries++;
        } while (galleryImages[currentIndex].closest('.gallery-item').style.display === 'none' && tries < galleryImages.length);
        document.getElementById('lb-img').src = galleryImages[currentIndex].src;
    }

    function showNext() {
        let tries = 0;
        do {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            tries++;
        } while (galleryImages[currentIndex].closest('.gallery-item').style.display === 'none' && tries < galleryImages.length);
        document.getElementById('lb-img').src = galleryImages[currentIndex].src;
    }

    // Click each gallery image to open lightbox
    galleryImages.forEach(function(img, i) {
        img.addEventListener('click', function() {
            openLightbox(i);
        });
    });

    // Lightbox controls
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lb-prev').addEventListener('click', showPrev);
    document.getElementById('lb-next').addEventListener('click', showNext);
    document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('lightbox').classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // ---- Booking - session selector ----
    let sessions = document.querySelectorAll('.session');

    sessions.forEach(function(s) {
        s.addEventListener('click', function() {
            sessions.forEach(function(x) { x.classList.remove('selected'); });
            s.classList.add('selected');

            let price = s.querySelector('.session-price').textContent;
            let confirmBtn = document.getElementById('confirm-btn');
            if (confirmBtn) {
                confirmBtn.textContent = 'Confirm Booking — ' + price + ' Deposit';
            }
        });
    });

    // ---- Calendar date picker ----
    window.pickDate = function(el) {
        let allDates = document.querySelectorAll('.calendar-dates span');
        allDates.forEach(function(d) { d.classList.remove('picked'); });
        el.classList.add('picked');
    }

    window.prevMonth = function() {
        console.log('Previous month clicked');
    }

    window.nextMonth = function() {
        console.log('Next month clicked');
    }

};

// ---- Booking form submit ----
function submitBooking() {
    let firstName = document.getElementById('first-name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    if (!firstName || !email || !phone) {
        alert('Please fill in your name, email, and phone number to continue.');
        return;
    }

    document.getElementById('confirm-btn').style.display = 'none';
    document.getElementById('booking-success').style.display = 'block';
}

// ---- Contact form submit ----
function submitContact() {
    let firstName = document.getElementById('ct-first').value;
    let email = document.getElementById('ct-email').value;
    let message = document.getElementById('ct-message').value;

    if (!firstName || !email || !message) {
        alert('Please fill in your name, email, and message before sending.');
        return;
    }

    document.getElementById('contact-success').style.display = 'block';

    document.getElementById('ct-first').value = '';
    document.getElementById('ct-last').value = '';
    document.getElementById('ct-email').value = '';
    document.getElementById('ct-message').value = '';
}
