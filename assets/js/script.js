// ==================== JND Global Enterprise - Script.js ====================

document.addEventListener('DOMContentLoaded', function () {

    // 1. Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Navbar scroll effect (background change on scroll)
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // 3. WhatsApp Button Floating Animation
    const whatsappBtn = document.querySelector('a[href*="wa.me"]');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.classList.add('pulse');
            setTimeout(() => {
                whatsappBtn.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    // 4. Contact Form Validation (Basic)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.querySelector('input[type="text"]');
            const email = document.querySelector('input[type="email"]');
            const message = document.querySelector('textarea');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                e.preventDefault();
                alert('Please fill all fields before submitting.');
            } else {
                // In real project yahan form submit logic aayega (EmailJS ya backend)
                alert('Thank you! Our team will contact you shortly.');
                contactForm.reset();
            }
        });
    }

    // 5. Add "Book Now" buttons functionality
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const service = this.getAttribute('data-service') || "Plumbing Service";
            const whatsappNumber = "923001234567"; // Change this to client's number
            const message = `Assalam-o-Alaikum, I want to book ${service}. Please contact me.`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });

    // 6. Back to top button (optional - agar add karna ho)
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 d-none';
    backToTop.style.borderRadius = '50%';
    backToTop.style.width = '50px';
    backToTop.style.height = '50px';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.remove('d-none');
        } else {
            backToTop.classList.add('d-none');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log('%cJND Global Enterprise Website Loaded Successfully!', 'color: #1E40AF; font-weight: bold;');
});
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const baseConfig = {
  apiKey: "AIzaSyBot3wrVQzkfLo0fZvPTHOztm0SJWoTVG4",
  authDomain: "jnd-global-plumbing.firebaseapp.com",
  projectId: "jnd-global-plumbing",
  storageBucket: "jnd-global-plumbing.firebasestorage.app",
  messagingSenderId: "554977950642",
  appId: "1:554977950642:web:c642f8a5b87478486a82ab",
  measurementId: "G-R9QSZ7CM2W"
};
// ==================== JND GLOBAL - Firebase Reviews ====================

// ==================== 🔥 FIREBASE CONFIG YAHAN PASTE KARO 🔥 ====================
const firebaseConfig = {
  apiKey: "AIzaSyBot3wrVQzkfLo0fZvPTHOztm0SJWoTVG4",           // ← Yahan apna apiKey
  authDomain: "jnd-global-plumbing.firebaseapp.com",       // ← Apna authDomain
  projectId: "jnd-global-plumbing",                        // ← Apna projectId
  storageBucket: "jnd-global-plumbing.appspot.com",
  messagingSenderId: "554977950642",
  appId: "1:554977950642:web:c642f8a5b87478486a82ab"
};
// =============================================================================

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Load Reviews Function
function loadReviews() {
  const container = document.getElementById("reviews-container");
  if (!container) return;

  container.innerHTML = '<p class="text-center text-muted">Loading reviews...</p>';

  db.collection("reviews").orderBy("timestamp", "desc").get()
    .then((querySnapshot) => {
      container.innerHTML = "";

      if (querySnapshot.empty) {
        container.innerHTML = `<p class="text-center text-muted">No reviews yet. Be the first to review us!</p>`;
        return;
      }

      querySnapshot.forEach((doc) => {
        const r = doc.data();
        const stars = "★".repeat(Math.floor(r.rating || 5));

        const reviewHTML = `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <div class="text-warning mb-3 fs-4">${stars}</div>
                <p class="fst-italic">"${r.text}"</p>
                <div class="mt-4 pt-3 border-top">
                  <strong>${r.name}</strong><br>
                  <small class="text-muted">${r.date ? new Date(r.date.seconds * 1000).toLocaleDateString() : 'Just now'}</small>
                </div>
              </div>
            </div>
          </div>`;
        container.innerHTML += reviewHTML;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      container.innerHTML = `<p class="text-danger text-center">Failed to load reviews.</p>`;
    });
}

// Submit Review Function
function submitReview() {
  const name = document.getElementById("review-name").value.trim();
  const rating = parseInt(document.getElementById("review-rating").value);
  const text = document.getElementById("review-text").value.trim();

  if (!name || !text) {
    alert("Please enter your name and review message.");
    return;
  }

  db.collection("reviews").add({
    name: name,
    rating: rating,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("✅ Thank you! Your review has been submitted successfully.");
    document.getElementById("review-name").value = "";
    document.getElementById("review-text").value = "";
    loadReviews(); // Refresh kar do
  })
  .catch((error) => {
    console.error("Error adding review:", error);
    alert("❌ Failed to submit review. Please try again.");
  });
}

// Page load hone par reviews load ho jayein
window.onload = loadReviews;