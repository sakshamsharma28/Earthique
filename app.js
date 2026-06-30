// Earthique - Core Application JavaScript Engine

document.addEventListener("DOMContentLoaded", () => {
  // Page check initializers
  if (document.querySelector(".ba-container-wrapper")) initBeforeAfterSlider();
  if (document.getElementById("countdown-timer")) initCountdownTimer();
  if (document.getElementById("testimonials-carousel")) initTestimonialsCarousel();
  if (document.getElementById("faq-accordion")) initFAQAccordion();
  
  // Specific Page Renderers
  if (document.getElementById("shop-products-grid")) initShopPage();
  if (document.getElementById("best-sellers-grid")) initBestSellersPage();
  if (document.getElementById("categories-page-grid")) initCategoriesPage();
  if (document.getElementById("product-detail-page")) initProductDetailPage();
  if (document.getElementById("wishlist-page-view")) initWishlistPage();
  if (document.getElementById("cart-page-view")) initCartPage();
  if (document.getElementById("account-page-view")) initAccountPage();
  if (document.getElementById("tracking-page-view")) initTrackingPage();
  if (document.getElementById("blog-page-view")) initBlogPage();
  if (document.getElementById("faq-page-accordion")) initExpandedFAQPage();

  // Reveal Animations on Scroll
  initScrollAnimations();

  // Custom Droplet Cursor
  initDropletCursor();
});

// ==========================================
// 1. Before & After Interactive Slider
// ==========================================
function initBeforeAfterSlider() {
  const container = document.querySelector(".ba-container-wrapper");
  const afterImage = document.querySelector(".ba-image-after");
  const handle = document.querySelector(".ba-handle");
  if (!container || !afterImage || !handle) return;

  let active = false;

  const setSliderPosition = (x) => {
    let rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    let width = rect.width;
    
    // Boundary check
    if (posX < 0) posX = 0;
    if (posX > width) posX = width;
    
    let percent = (posX / width) * 100;
    afterImage.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    handle.style.left = `${percent}%`;
  };

  const onPointerMove = (e) => {
    if (!active) return;
    let clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setSliderPosition(clientX);
  };

  container.addEventListener("mousedown", (e) => {
    active = true;
    setSliderPosition(e.clientX);
  });

  container.addEventListener("touchstart", (e) => {
    active = true;
    setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener("mouseup", () => active = false);
  window.addEventListener("touchend", () => active = false);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("touchmove", onPointerMove);
}

// ==========================================
// 2. Countdown Timer
// ==========================================
function initCountdownTimer() {
  const timer = document.getElementById("countdown-timer");
  if (!timer) return;

  // Set counter to end in 3 days from current time
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      timer.innerHTML = "<p>Offer expired</p>";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer-days").innerText = days.toString().padStart(2, "0");
    document.getElementById("timer-hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("timer-mins").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("timer-secs").innerText = seconds.toString().padStart(2, "0");
  };

  updateTimer(); // run once immediately
  const interval = setInterval(updateTimer, 1000);
}

// ==========================================
// 3. Testimonials Slider
// ==========================================
function initTestimonialsCarousel() {
  const track = document.querySelector(".testimonials-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".carousel-dots");
  if (!track || slides.length === 0 || !dotsContainer) return;

  let currentIndex = 0;
  let timer;

  // Create dot indicators
  slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  const goToSlide = (index) => {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
    resetTimer();
  };

  const startTimer = () => {
    timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 6000);
  };

  const resetTimer = () => {
    clearInterval(timer);
    startTimer();
  };

  startTimer();
}

// ==========================================
// 4. FAQ Accordion (Home Page)
// ==========================================
function initFAQAccordion() {
  const triggers = document.querySelectorAll(".faq-trigger");
  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isActive = parent.classList.contains("active");

      // Close all other items
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-content").style.maxHeight = null;
      });

      if (!isActive) {
        parent.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// ==========================================
// 5. Scroll Reveal Animations
// ==========================================
function initScrollAnimations() {
  const selectors = ".product-card, .concern-card, .ingredient-card, .expert-card, .blog-card, .collection-card, .section-padding";
  const animatedElements = document.querySelectorAll(selectors);
  if (animatedElements.length === 0) return;

  // Set initial class
  animatedElements.forEach(el => {
    el.classList.add("animate-on-scroll");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// 6. Shop Page Engine
// ==========================================
let currentFilters = {
  categories: [],
  concerns: [],
  price: 2000,
  sort: "featured"
};

function initShopPage() {
  // Render filters and products
  setupShopFilters();
  renderFilteredProducts();
}

function setupShopFilters() {
  const priceSlider = document.getElementById("price-range-slider");
  const priceVal = document.getElementById("price-range-val");
  if (!priceSlider) return;

  priceSlider.addEventListener("input", (e) => {
    currentFilters.price = parseInt(e.target.value);
    priceVal.innerText = `₹${currentFilters.price}`;
    renderFilteredProducts();
  });

  // Checkbox inputs
  document.querySelectorAll(".category-checkbox").forEach(chk => {
    chk.addEventListener("change", () => {
      if (chk.checked) {
        currentFilters.categories.push(chk.value);
      } else {
        currentFilters.categories = currentFilters.categories.filter(c => c !== chk.value);
      }
      renderFilteredProducts();
    });
  });

  document.querySelectorAll(".concern-checkbox").forEach(chk => {
    chk.addEventListener("change", () => {
      if (chk.checked) {
        currentFilters.concerns.push(chk.value);
      } else {
        currentFilters.concerns = currentFilters.concerns.filter(c => c !== chk.value);
      }
      renderFilteredProducts();
    });
  });

  // Sort dropdown
  const sorter = document.getElementById("shop-sort");
  if (sorter) {
    sorter.addEventListener("change", (e) => {
      currentFilters.sort = e.target.value;
      renderFilteredProducts();
    });
  }

  // Read URL parameters if any (e.g. from Home page links)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  const concernParam = params.get("concern");

  if (catParam) {
    const chk = document.querySelector(`.category-checkbox[value="${catParam}"]`);
    if (chk) {
      chk.checked = true;
      currentFilters.categories.push(catParam);
    }
  }

  if (concernParam) {
    const chk = document.querySelector(`.concern-checkbox[value="${concernParam}"]`);
    if (chk) {
      chk.checked = true;
      currentFilters.concerns.push(concernParam);
    }
  }
}

function renderFilteredProducts() {
  const grid = document.getElementById("shop-products-grid");
  const resultsLabel = document.getElementById("shop-results-count");
  if (!grid) return;

  if (typeof products === 'undefined') return;

  let filtered = products.filter(p => {
    // Category check
    if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(p.category)) return false;
    // Concern check
    if (currentFilters.concerns.length > 0 && !currentFilters.concerns.includes(p.skinConcern)) return false;
    // Price check
    if (p.price > currentFilters.price) return false;
    return true;
  });

  // Sorting
  if (currentFilters.sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // default/featured: best sellers first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  resultsLabel.innerText = `${filtered.length} products found`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:5rem 0;">
        <p style="font-size:1.2rem; color:var(--color-gray);">No skincare products match your selected filters.</p>
        <button class="btn btn-secondary" onclick="resetFilters()" style="margin-top:2rem;">Reset Filters</button>
      </div>
    `;
    return;
  }

  // Load wishlist items to highlight favorited hearts
  const wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
      <button class="wishlist-toggle-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist('${p.id}', this)" aria-label="Add to Wishlist">
        <svg width="18" height="18" fill="${wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke-linecap="round"/></svg>
      </button>
      <div class="product-card-gallery">
        <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        <img src="${p.images[1] || p.images[0]}" alt="${p.name} alternate" class="product-card-img-secondary">
        <div class="product-card-actions">
          <button class="product-card-action" onclick="addToCart('${p.id}', 1, true)">Add to Cart</button>
          <button class="product-card-action product-card-action-secondary" onclick="openQuickView('${p.id}')">Quick View</button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-card-cat">${p.category}</span>
        <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
        <div class="product-card-rating">
          <span class="stars">${"★".repeat(Math.floor(p.rating))}${"☆".repeat(5 - Math.floor(p.rating))}</span>
          <span style="color:var(--color-gray);">(${p.reviewsCount})</span>
        </div>
        <div class="product-card-price">₹${p.price}</div>
      </div>
    </div>
  `).join("");
  initScrollAnimations();
}

window.resetFilters = function() {
  document.querySelectorAll(".category-checkbox").forEach(c => c.checked = false);
  document.querySelectorAll(".concern-checkbox").forEach(c => c.checked = false);
  const slider = document.getElementById("price-range-slider");
  if (slider) {
    slider.value = 2000;
    document.getElementById("price-range-val").innerText = "₹2000";
  }
  currentFilters = {
    categories: [],
    concerns: [],
    price: 2000,
    sort: "featured"
  };
  renderFilteredProducts();
};

// ==========================================
// 7. Best Sellers Page Renderer
// ==========================================
function initBestSellersPage() {
  const grid = document.getElementById("best-sellers-grid");
  if (!grid || typeof products === 'undefined') return;

  // Filter products where badge is "Best Seller" or featured is true
  const filtered = products.filter(p => p.badge === "Best Seller" || p.featured === true);
  const wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
      <button class="wishlist-toggle-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist('${p.id}', this)" aria-label="Add to Wishlist">
        <svg width="18" height="18" fill="${wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke-linecap="round"/></svg>
      </button>
      <div class="product-card-gallery">
        <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        <img src="${p.images[1] || p.images[0]}" alt="${p.name} alternate" class="product-card-img-secondary">
        <div class="product-card-actions">
          <button class="product-card-action" onclick="addToCart('${p.id}', 1, true)">Add to Cart</button>
          <button class="product-card-action product-card-action-secondary" onclick="openQuickView('${p.id}')">Quick View</button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-card-cat">${p.category}</span>
        <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
        <div class="product-card-rating">
          <span class="stars">${"★".repeat(Math.floor(p.rating))}${"☆".repeat(5 - Math.floor(p.rating))}</span>
          <span style="color:var(--color-gray);">(${p.reviewsCount})</span>
        </div>
        <div class="product-card-price">₹${p.price}</div>
      </div>
    </div>
  `).join("");
  initScrollAnimations();
}

// ==========================================
// 8. Categories Page Renderer
// ==========================================
function initCategoriesPage() {
  const grid = document.getElementById("categories-page-grid");
  if (!grid || typeof products === 'undefined') return;

  // Group and count categories
  const categoriesList = [
    { name: "Face Wash", icon: "🧴", desc: "Purifying herb-based foam cleansers." },
    { name: "Cleanser", icon: "🧼", desc: "Gentle makeup and sunscreen melters." },
    { name: "Serum", icon: "🧪", desc: "Concentrated botanical active drops." },
    { name: "Moisturizer", icon: "🧴", desc: "Deep barrier hydration gel-creams." },
    { name: "Sunscreen", icon: "☀️", desc: "Broad-spectrum physical blockers." },
    { name: "Face Mask", icon: "🧖", desc: "Clarifying clays and detox creams." },
    { name: "Toner", icon: "💦", desc: "Skin pH balancing facial mists." },
    { name: "Body Care", icon: "🌱", desc: "Aromatic herbal skin washes & creams." },
    { name: "Lip Care", icon: "💋", desc: "Rich butter-based chapped lip solutions." },
    { name: "Hair Care", icon: "💇", desc: "Scalp density and growth leaf oils." }
  ];

  grid.innerHTML = categoriesList.map(cat => {
    const count = products.filter(p => p.category === cat.name).length;
    return `
      <div class="concern-card" style="padding:2.5rem 1.5rem">
        <div class="concern-card-icon" style="font-size:2.5rem">${cat.icon}</div>
        <h3 class="concern-card-title">${cat.name}</h3>
        <p style="font-size:0.8rem; color:var(--color-gray); margin-bottom:1.5rem">${cat.desc}</p>
        <p style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--color-sage-dark); margin-bottom:1.5rem">${count} Products</p>
        <a href="shop.html?category=${encodeURIComponent(cat.name)}" class="btn btn-secondary btn-sm" style="padding:0.5rem 1.5rem; font-size:0.75rem">Explore</a>
      </div>
    `;
  }).join("");
  initScrollAnimations();
}

// ==========================================
// 9. Product Details Page Template Hydrator
// ==========================================
function initProductDetailPage() {
  const container = document.getElementById("product-detail-page");
  if (!container || typeof products === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "1";
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `<div class="container section-padding text-center"><h2>Product Not Found</h2><a href="shop.html" class="btn btn-primary" style="margin-top:2rem">Return To Shop</a></div>`;
    return;
  }

  // Update Page Head Meta dynamically (SEO improvement)
  document.title = `${product.name} – Earthique Skincare`;
  
  // Set recently viewed
  updateRecentlyViewed(product.id);

  // Render product details
  const wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];
  
  container.innerHTML = `
    <div class="container">
      <div class="product-detail-grid">
        <!-- Left: Gallery -->
        <div class="product-gallery-container">
          <div class="gallery-thumbnails">
            ${product.images.map((img, idx) => `
              <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this)">
                <img src="${img}" alt="${product.name} thumbnail ${idx + 1}">
              </div>
            `).join("")}
          </div>
          <div class="gallery-main-viewport" id="gallery-viewport">
            <img src="${product.images[0]}" alt="${product.name}" class="gallery-main-img" id="gallery-main-img">
          </div>
        </div>

        <!-- Right: Info -->
        <div>
          ${product.badge ? `<span class="p-detail-badge">${product.badge}</span>` : ''}
          <h1 class="p-detail-name">${product.name}</h1>
          
          <div class="p-detail-rating">
            <span class="stars" style="color:var(--color-gold)">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</span>
            <span style="color:var(--color-gray)">(${product.reviewsCount} verified reviews)</span>
          </div>

          <div class="p-detail-price">₹${product.price}</div>
          <p class="p-detail-shortdesc">${product.shortDescription}</p>

          <div class="p-detail-actions">
            <div class="qty-selector">
              <button onclick="changeDetailQty(-1)">-</button>
              <span id="detail-qty-val">1</span>
              <button onclick="changeDetailQty(1)">+</button>
            </div>
            <button class="btn btn-primary" onclick="addDetailToCart('${product.id}')">Add To Cart</button>
            <button class="wishlist-toggle-btn ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)" style="position:static; width:48px; height:48px; border:1px solid var(--color-charcoal); border-radius:0;">
              <svg width="20" height="20" fill="${wishlist.includes(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke-linecap="round"/></svg>
            </button>
          </div>

          <!-- Product Details Tabs -->
          <div class="detail-tabs">
            <button class="tab-btn active" onclick="switchDetailTab('tab-description', this)">Description</button>
            <button class="tab-btn" onclick="switchDetailTab('tab-ingredients', this)">Ingredients</button>
            <button class="tab-btn" onclick="switchDetailTab('tab-benefits', this)">Benefits</button>
            <button class="tab-btn" onclick="switchDetailTab('tab-directions', this)">Directions</button>
          </div>
          <div class="tab-pane active" id="tab-description"><p>${product.description}</p></div>
          <div class="tab-pane" id="tab-ingredients"><p><strong>Full List:</strong> ${product.ingredients}</p></div>
          <div class="tab-pane" id="tab-benefits">
            <ul style="list-style:disc; margin-left:1.5rem;">
              ${product.benefits.map(b => `<li style="margin-bottom:0.4rem">${b}</li>`).join("")}
            </ul>
          </div>
          <div class="tab-pane" id="tab-directions"><p>${product.directions}</p></div>

          <div class="p-detail-meta" style="margin-top:3rem">
            <p><strong>Skin Concern:</strong> ${product.skinConcern}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Availability:</strong> In Stock, Ready to Ship</p>
          </div>
        </div>
      </div>

      <!-- Reviews breakdown -->
      <div class="section-padding" style="margin-top:4rem">
        <h3 class="text-center" style="margin-bottom:3rem">Customer Experience</h3>
        <div class="reviews-breakdown">
          <div class="avg-rating-box">
            <div class="avg-rating-num">${product.rating.toFixed(1)}</div>
            <div class="rating-stars-large">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</div>
            <p style="font-size:0.8rem; color:var(--color-gray);">Based on ${product.reviewsCount} reviews</p>
          </div>
          <div>
            <div class="rating-bar-row">
              <span class="rating-bar-label">5 stars</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:85%"></div></div>
              <span class="rating-bar-count">85%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-bar-label">4 stars</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:12%"></div></div>
              <span class="rating-bar-count">12%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-bar-label">3 stars</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:3%"></div></div>
              <span class="rating-bar-count">3%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-bar-label">2 stars</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:0%"></div></div>
              <span class="rating-bar-count">0%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-bar-label">1 star</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:0%"></div></div>
              <span class="rating-bar-count">0%</span>
            </div>
          </div>
        </div>

        <div class="reviews-header-block">
          <h4>Review Journal (${product.reviewsCount})</h4>
          <button class="btn btn-secondary" onclick="openReviewModal()">Write a Review</button>
        </div>

        <div class="reviews-list-block" id="reviews-list-block">
          <!-- Verification reviews list -->
          <div class="review-item">
            <div class="review-item-header">
              <div class="review-author-info">
                <div class="review-author-avatar">AM</div>
                <div class="review-author-meta">
                  <span class="review-author-name">Ananya M.</span>
                  <span class="review-verified">✓ Verified Buyer</span>
                </div>
              </div>
              <span class="review-item-stars">★★★★★</span>
            </div>
            <h5 class="review-item-title">Exceeded all expectations!</h5>
            <p class="review-item-body">I have been using this for two weeks and my skin feels incredibly supple and glowing. The texture is elegant and fits perfectly into my morning routine.</p>
            <div class="review-item-date">June 20, 2026</div>
          </div>

          <div class="review-item">
            <div class="review-item-header">
              <div class="review-author-info">
                <div class="review-author-avatar">RK</div>
                <div class="review-author-meta">
                  <span class="review-author-name">Rohan K.</span>
                  <span class="review-verified">✓ Verified Buyer</span>
                </div>
              </div>
              <span class="review-item-stars">★★★★☆</span>
            </div>
            <h5 class="review-item-title">Very clean and luxury feel</h5>
            <p class="review-item-body">Superb clean beauty product. Safe ingredients, no synthetic scent. Subtracting one star only because the delivery took three days, but the product itself is outstanding.</p>
            <div class="review-item-date">June 14, 2026</div>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      <div class="section-padding" style="border-top: 1px solid var(--color-border)">
        <h3 class="text-center" style="margin-bottom:3rem">Related Botanicals</h3>
        <div class="shop-products-grid" id="related-products-grid">
          <!-- Injected below -->
        </div>
      </div>

      <!-- Recently Viewed Section -->
      <div class="section-padding" id="recently-viewed-section" style="border-top: 1px solid var(--color-border); display:none;">
        <h3 class="text-center" style="margin-bottom:3rem">Recently Viewed</h3>
        <div class="shop-products-grid" id="recently-viewed-grid"></div>
      </div>
    </div>

    <!-- Review Form Overlay Modal -->
    <div class="modal-overlay" id="review-modal">
      <div class="modal-content" style="max-width:500px; padding:3rem">
        <button class="modal-close" onclick="closeReviewModal()">&times;</button>
        <h3 class="text-center" style="margin-bottom:2rem">Write a Review</h3>
        <form id="review-form" onsubmit="handleReviewSubmit(event, '${product.id}')">
          <div class="review-form-group">
            <label>Rating</label>
            <div class="star-rating-select">
              <span class="star-select-btn" onclick="setFormRating(1)" data-rating="1">★</span>
              <span class="star-select-btn" onclick="setFormRating(2)" data-rating="2">★</span>
              <span class="star-select-btn" onclick="setFormRating(3)" data-rating="3">★</span>
              <span class="star-select-btn" onclick="setFormRating(4)" data-rating="4">★</span>
              <span class="star-select-btn" onclick="setFormRating(5)" data-rating="5">★</span>
            </div>
          </div>
          <div class="review-form-group">
            <label for="review-title">Review Title</label>
            <input type="text" id="review-title" class="form-control" placeholder="Summarize your experience..." required>
          </div>
          <div class="review-form-group">
            <label for="review-body">Comments</label>
            <textarea id="review-body" class="form-control" rows="4" placeholder="What did you think about this product?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1rem">Submit Review</button>
        </form>
      </div>
    </div>
  `;

  // Initialize Zoom functionality
  initGalleryZoom();

  // Load related products (same category or same concern, limit 4)
  const related = products.filter(p => (p.category === product.category || p.skinConcern === product.skinConcern) && p.id !== product.id).slice(0, 4);
  const relatedGrid = document.getElementById("related-products-grid");
  if (related.length > 0) {
    relatedGrid.innerHTML = related.map(p => `
      <div class="product-card">
        <div class="product-card-gallery" style="aspect-ratio:1/1;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <span class="product-card-price">₹${p.price}</span>
        </div>
      </div>
    `).join("");
  } else {
    relatedGrid.innerHTML = products.slice(0, 4).map(p => `
      <div class="product-card">
        <div class="product-card-gallery" style="aspect-ratio:1/1;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <span class="product-card-price">₹${p.price}</span>
        </div>
      </div>
    `).join("");
  }

  // Load recently viewed
  renderRecentlyViewed(product.id);
}

// Product Details Interactions
window.switchDetailImage = function(src, thumbElement) {
  document.getElementById("gallery-main-img").src = src;
  document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
  thumbElement.classList.add("active");
};

function initGalleryZoom() {
  const viewport = document.getElementById("gallery-viewport");
  const img = document.getElementById("gallery-main-img");
  if (!viewport || !img) return;

  viewport.addEventListener("mousemove", (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = "scale(1.8)";
  });

  viewport.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  });
}

window.changeDetailQty = function(amount) {
  const label = document.getElementById("detail-qty-val");
  let val = parseInt(label.innerText) + amount;
  if (val < 1) val = 1;
  label.innerText = val;
};

window.addDetailToCart = function(productId) {
  const qty = parseInt(document.getElementById("detail-qty-val").innerText);
  addToCart(productId, qty, true);
};

window.switchDetailTab = function(paneId, tabBtn) {
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(paneId).classList.add("active");
  tabBtn.classList.add("active");
};

// Recently Viewed logic
function updateRecentlyViewed(id) {
  let list = JSON.parse(localStorage.getItem("earthique_recently_viewed")) || [];
  list = list.filter(item => item !== id); // Remove duplicates
  list.unshift(id); // Add to front
  list = list.slice(0, 4); // Limit to 4
  localStorage.setItem("earthique_recently_viewed", JSON.stringify(list));
}

function renderRecentlyViewed(currentId) {
  const section = document.getElementById("recently-viewed-section");
  const grid = document.getElementById("recently-viewed-grid");
  if (!section || !grid) return;

  const list = JSON.parse(localStorage.getItem("earthique_recently_viewed")) || [];
  const items = list.filter(id => id !== currentId); // Don't show current product

  if (items.length === 0) return;

  section.style.display = "block";
  grid.innerHTML = items.map(id => {
    const p = products.find(prod => prod.id === id);
    if (!p) return "";
    return `
      <div class="product-card">
        <div class="product-card-gallery" style="aspect-ratio:1/1;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <span class="product-card-price">₹${p.price}</span>
        </div>
      </div>
    `;
  }).join("");
}

// Review form submit modal
window.openReviewModal = function() {
  document.getElementById("review-modal").classList.add("active");
  setFormRating(5); // default
};

window.closeReviewModal = function() {
  document.getElementById("review-modal").classList.remove("active");
};

let activeFormRating = 5;
window.setFormRating = function(rating) {
  activeFormRating = rating;
  const stars = document.querySelectorAll(".star-select-btn");
  stars.forEach((s, idx) => {
    s.classList.toggle("active", idx < rating);
  });
};

window.handleReviewSubmit = function(e, productId) {
  e.preventDefault();
  const title = document.getElementById("review-title").value.trim();
  const body = document.getElementById("review-body").value.trim();

  // Create review item HTML
  const reviewList = document.getElementById("reviews-list-block");
  const initial = "U";
  const starsHtml = "★".repeat(activeFormRating) + "☆".repeat(5 - activeFormRating);

  const newReviewHtml = `
    <div class="review-item" style="background-color:rgba(138, 163, 123, 0.05); padding:1.5rem; border-radius:8px; margin-bottom:1.5rem;">
      <div class="review-item-header">
        <div class="review-author-info">
          <div class="review-author-avatar" style="background-color:var(--color-gold-light)">${initial}</div>
          <div class="review-author-meta">
            <span class="review-author-name">Guest User</span>
            <span class="review-verified">✓ Verified Buyer</span>
          </div>
        </div>
        <span class="review-item-stars" style="color:var(--color-gold)">${starsHtml}</span>
      </div>
      <h5 class="review-item-title">${title}</h5>
      <p class="review-item-body">${body}</p>
      <div class="review-item-date">Today</div>
    </div>
  `;

  reviewList.insertAdjacentHTML("afterbegin", newReviewHtml);
  closeReviewModal();
  showToast("Review submitted successfully! Thank you.", "success");
  e.target.reset();
};

// ==========================================
// 10. Wishlist Page Renderer
// ==========================================
function initWishlistPage() {
  renderWishlistPage();
}

window.renderWishlistPage = function() {
  const grid = document.getElementById("wishlist-page-view");
  if (!grid || typeof products === 'undefined') return;

  const wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];

  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div style="text-align:center; padding:5rem 0; grid-column:1/-1;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom:1.5rem; opacity:0.6;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <p style="font-size:1.2rem; color:var(--color-gray);">Your wishlist is empty.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:2rem;">Browse Collection</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = wishlist.map(id => {
    const p = products.find(prod => prod.id === id);
    if (!p) return "";
    return `
      <div class="product-card">
        <button class="wishlist-toggle-btn active" onclick="toggleWishlist('${p.id}', this)" aria-label="Remove from Wishlist">&times;</button>
        <div class="product-card-gallery">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h4 class="product-card-name"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <div class="product-card-price">₹${p.price}</div>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}', 1, true)" style="width:100%; margin-top:1.5rem; font-size:0.75rem; padding:0.6rem 0">Move to Cart</button>
        </div>
      </div>
    `;
  }).join("");
  initScrollAnimations();
};

// ==========================================
// 11. Full Cart Page Renderer
// ==========================================
function initCartPage() {
  renderCartPage();
}

window.renderCartPage = function() {
  const container = document.getElementById("cart-page-view");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:6rem 0;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom:1.5rem; opacity:0.6;"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
        <h2>Your Cart is Empty</h2>
        <p style="margin-top:1rem; color:var(--color-gray);">Looks like you haven't added anything to your cart yet.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:2.5rem;">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  cart.forEach(item => subtotal += item.price * item.qty);

  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST mock
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="grid" style="grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: start;">
      <!-- Left: Cart Items Table -->
      <div class="cart-table-card">
        <div class="cart-table-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span style="text-align:right">Total</span>
        </div>
        <div class="cart-items-wrapper">
          ${cart.map(item => `
            <div class="cart-table-row">
              <div class="cart-table-item">
                <img src="${item.image}" alt="${item.name}" class="cart-table-img">
                <div class="cart-table-info">
                  <h4>${item.name}</h4>
                  <button onclick="removeCartItem('${item.id}')" style="color:var(--color-danger); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; margin-top:0.4rem;">Remove</button>
                </div>
              </div>
              <div style="font-weight:500;">₹${item.price}</div>
              <div>
                <div class="cart-item-qty" style="margin:0;">
                  <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})">-</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty + 1})">+</button>
                </div>
              </div>
              <div class="cart-table-subtotal" style="text-align:right">₹${item.price * item.qty}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Right: Summary -->
      <div>
        <div class="cart-summary-card">
          <h3 class="cart-summary-title">Order Summary</h3>
          <div class="summary-row">
            <span>Bag Subtotal</span>
            <span>₹${subtotal}</span>
          </div>
          <div class="summary-row">
            <span>GST (18% Mock Included)</span>
            <span>₹${tax}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
          
          ${shipping > 0 
            ? `<p style="font-size:0.75rem; color:var(--color-sage-dark); margin-bottom:1.5rem">💡 Add <strong>₹${999 - subtotal}</strong> more to qualify for Free Shipping.</p>` 
            : ""}

          <div class="coupon-box">
            <input type="text" placeholder="Promo Code" class="coupon-input" id="promo-code-field">
            <button class="coupon-btn" onclick="applyPromoCode()">Apply</button>
          </div>
          <p id="promo-status" style="font-size:0.8rem; margin-top:-1.5rem; margin-bottom:1.5rem; display:none;"></p>

          <div class="summary-row total">
            <span>Estimated Total</span>
            <span id="grand-total-val">₹${total}</span>
          </div>

          <button class="btn btn-primary" onclick="proceedToCheckout()" style="width:100%; height:50px;">Proceed To Checkout</button>
          <a href="shop.html" class="btn btn-secondary" style="width:100%; margin-top:1rem; height:50px;">Continue Shopping</a>
        </div>
      </div>
    </div>
  `;
};

window.applyPromoCode = function() {
  const code = document.getElementById("promo-code-field").value.trim().toUpperCase();
  const status = document.getElementById("promo-status");
  if (code === "") return;

  status.style.display = "block";
  if (code === "EARTHIQUE10") {
    status.style.color = "var(--color-success)";
    status.innerText = "Coupon applied! You got 10% discount on subtotal.";
    
    // Recalculate
    const cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
    let subtotal = cart.reduce((t, item) => t + (item.price * item.qty), 0);
    const disc = Math.round(subtotal * 0.1);
    subtotal -= disc;

    const shipping = subtotal >= 999 ? 0 : 99;
    document.getElementById("grand-total-val").innerText = `₹${subtotal + shipping}`;
  } else {
    status.style.color = "var(--color-danger)";
    status.innerText = "Invalid Promo Code. Try 'EARTHIQUE10'.";
  }
};

// ==========================================
// 12. Login/Register Auth
// ==========================================
window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-pass").value.trim();

  // Mock authentication logic
  if (email && pass) {
    const name = email.split("@")[0];
    const user = { name: name.charAt(0).toUpperCase() + name.slice(1), email: email };
    localStorage.setItem("earthique_user", JSON.stringify(user));
    
    showToast("Login successful!", "success");
    
    // Redirect if needed
    const params = new URLSearchParams(window.location.search);
    const redir = params.get("redirect");
    
    setTimeout(() => {
      if (redir === "checkout") {
        window.location.href = "cart.html";
      } else {
        window.location.href = "account.html";
      }
    }, 1500);
  }
};

window.handleRegisterSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();

  if (name && email && pass) {
    const user = { name, email };
    localStorage.setItem("earthique_user", JSON.stringify(user));
    showToast("Registration successful! Account created.", "success");
    
    setTimeout(() => {
      window.location.href = "account.html";
    }, 1500);
  }
};

// ==========================================
// 13. My Account Page Renderer
// ==========================================
function initAccountPage() {
  const user = JSON.parse(localStorage.getItem("earthique_user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Populate profile info
  document.getElementById("profile-name").innerText = user.name;
  document.getElementById("profile-email").innerText = user.email;

  // Render orders
  const orders = JSON.parse(localStorage.getItem("earthique_orders")) || [];
  const list = document.getElementById("orders-history-list");

  if (orders.length === 0) {
    list.innerHTML = `<p style="color:var(--color-gray); padding:2rem 0;">You haven't placed any orders yet.</p>`;
    return;
  }

  list.innerHTML = orders.map(ord => `
    <div class="order-item-card">
      <div class="order-item-header">
        <span>Order Number: <strong>${ord.orderNumber}</strong></span>
        <span>Placed on: ${ord.date}</span>
      </div>
      <div class="order-item-body">
        <div>
          <p>Total Items: ${ord.items.length}</p>
          <p style="font-weight:600; color:var(--color-sage-dark); margin-top:0.4rem;">Status: ${ord.status}</p>
        </div>
        <div style="text-align:right;">
          <p style="font-size:1.1rem; font-weight:600;">₹${ord.total}</p>
          <a href="tracking.html?orderId=${ord.orderNumber}" class="btn btn-secondary btn-sm" style="padding:0.4rem 1rem; font-size:0.75rem; margin-top:0.8rem;">Track Order</a>
        </div>
      </div>
    </div>
  `).join("");
}

window.switchAccountTab = function(paneId, btnElement) {
  document.querySelectorAll(".account-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".account-menu-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(paneId).classList.add("active");
  btnElement.classList.add("active");
};

// ==========================================
// 14. Order Tracking Page
// ==========================================
function initTrackingPage() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  if (orderId) {
    document.getElementById("tracking-id-input").value = orderId;
    trackOrder(orderId);
  }
}

window.handleTrackingSubmit = function(e) {
  e.preventDefault();
  const code = document.getElementById("tracking-id-input").value.trim().toUpperCase();
  if (code === "") return;
  trackOrder(code);
};

function trackOrder(orderId) {
  const steps = document.querySelectorAll(".tracking-step");
  const fill = document.querySelector(".tracking-step-fill");
  const statusDetails = document.getElementById("tracking-status-details");
  if (!statusDetails) return;

  // Search local orders
  const orders = JSON.parse(localStorage.getItem("earthique_orders")) || [];
  const foundOrder = orders.find(ord => ord.orderNumber === orderId);

  // If not found in user orders, create a mock search results
  let status = "Placed";
  let date = new Date().toLocaleDateString();
  let total = "₹1,299";

  if (foundOrder) {
    status = foundOrder.status;
    date = foundOrder.date;
    total = `₹${foundOrder.total}`;
  } else {
    // Check if user entered the standard mock tracking code
    if (orderId.startsWith("EQ-")) {
      status = "Shipped"; // mock status
    } else {
      statusDetails.innerHTML = `<div style="color:var(--color-danger); text-align:center; padding:2rem 0;">Order Code "${orderId}" not found in database. Check that it starts with "EQ-" (e.g. EQ-123456)</div>`;
      return;
    }
  }

  // Update visual stepper
  // Steps: Placed (0), Processing (1), Shipped (2), Out for Delivery (3), Delivered (4)
  const statusIndices = { "Placed": 0, "Processing": 1, "Shipped": 2, "Out for Delivery": 3, "Delivered": 4 };
  const activeIdx = statusIndices[status] !== undefined ? statusIndices[status] : 1;

  steps.forEach((step, idx) => {
    step.classList.remove("completed", "active");
    if (idx < activeIdx) {
      step.classList.add("completed");
    } else if (idx === activeIdx) {
      step.classList.add("active");
    }
  });

  // Calculate filler line percentage
  const fillWidths = [0, 25, 50, 75, 100];
  fill.style.width = `${fillWidths[activeIdx]}%`;

  statusDetails.innerHTML = `
    <div style="background-color:var(--color-sage-light); padding:2rem; border-radius:8px; margin-top:2rem; text-align:left;">
      <h4 style="margin-bottom:1rem; border-bottom:1px solid var(--color-border); padding-bottom:0.5rem">Order Details</h4>
      <p style="margin-bottom:0.5rem"><strong>Order Number:</strong> ${orderId}</p>
      <p style="margin-bottom:0.5rem"><strong>Placed On:</strong> ${date}</p>
      <p style="margin-bottom:0.5rem"><strong>Billing Total:</strong> ${total}</p>
      <p style="margin-bottom:0.5rem"><strong>Current Shipping Status:</strong> <span class="text-sage" style="font-weight:600">${status}</span></p>
      <p style="font-size:0.8rem; color:var(--color-gray); margin-top:1rem">💡 Carrier update: Your botanical package is processed using eco-friendly carbon-neutral delivery networks.</p>
    </div>
  `;
}

// ==========================================
// 15. Blog Listing & Category Filtering
// ==========================================
function initBlogPage() {
  renderBlogGrid("All");
}

window.filterBlogCategory = function(catName, btnElement) {
  document.querySelectorAll(".blog-cat-btn").forEach(b => b.classList.remove("active"));
  btnElement.classList.add("active");
  renderBlogGrid(catName);
};

function renderBlogGrid(categoryName) {
  const grid = document.getElementById("blog-grid-view");
  if (!grid || typeof blogs === 'undefined') return;

  const filtered = categoryName === "All" ? blogs : blogs.filter(b => b.category === categoryName);

  grid.innerHTML = filtered.map(b => `
    <div class="blog-card">
      <div class="blog-card-media">
        <img src="${b.image}" alt="${b.title}" class="blog-card-img">
      </div>
      <div class="blog-card-content">
        <span class="blog-card-tag">${b.category}</span>
        <h4 class="blog-card-title"><a href="#" onclick="openBlogArticle('${b.id}'); return false;">${b.title}</a></h4>
        <p class="blog-card-excerpt">${b.excerpt}</p>
        <div class="blog-card-footer">
          <span>By ${b.author.split(" ")[0]}</span>
          <span>${b.readTime}</span>
        </div>
      </div>
    </div>
  `).join("");
  initScrollAnimations();
}

window.openBlogArticle = function(id) {
  if (typeof blogs === 'undefined') return;
  const article = blogs.find(b => b.id === id);
  if (!article) return;

  // Re-use quick view modal to view blog article detail beautifully
  const modal = document.getElementById("quick-view-modal");
  const content = document.getElementById("quick-view-grid-content");

  content.innerHTML = `
    <div style="grid-column: 1/-1; padding:3.5rem; overflow-y:auto; max-height:80vh">
      <span class="quick-view-badge" style="background-color:var(--color-gold); margin-bottom:1rem;">${article.category}</span>
      <h2 style="margin-bottom:1rem; font-family:var(--font-serif); font-size:2.4rem; line-height:1.2;">${article.title}</h2>
      <p style="font-size:0.85rem; color:var(--color-gray); margin-bottom:2rem;">Published on ${article.date} | ${article.readTime} | Written by <strong>${article.author}</strong> (${article.authorTitle})</p>
      
      <img src="${article.image}" alt="${article.title}" style="width:100%; max-height:350px; object-fit:cover; border-radius:8px; margin-bottom:2.5rem;">
      
      <div style="font-size:1.05rem; font-weight:300; line-height:1.8; color:var(--color-charcoal-light)">
        ${article.content.replace(/\n\n/g, "</p><p style='margin-bottom:1.5rem'>").replace(/\n/g, "<br>")}
      </div>
    </div>
  `;

  modal.classList.add("active");
};

// ==========================================
// 16. Expanded FAQ Page Accordion Filter
// ==========================================
function initExpandedFAQPage() {
  renderFAQAccordion("");

  const search = document.getElementById("faq-search");
  if (search) {
    search.addEventListener("input", (e) => {
      renderFAQAccordion(e.target.value.trim().toLowerCase());
    });
  }
}

function renderFAQAccordion(query) {
  const container = document.getElementById("faq-page-accordion");
  if (!container) return;

  // Complete FAQ List
  const faqData = [
    { q: "Are Earthique products completely natural and organic?", a: "Yes, Earthique formulations are crafted from 100% natural botanical extracts, nourishing plant oils, and organic herbal infusions, without any synthetic chemicals or petroleum derivatives." },
    { q: "Do your products contain parabens or sulfates?", a: "Never. All Earthique products are formulated without parabens, sulfates, silicones, mineral oils, phthalates, synthetic dyes, or artificial fragrances. We believe in absolute purity." },
    { q: "Is the packaging eco-friendly and sustainable?", a: "Absolutely. We are committed to protecting the environment. Over 90% of our products are packed in recyclable glass bottles and jars, and our shipping cartons are printed using soy ink on FSC-certified paper." },
    { q: "Are Earthique products dermatologically tested?", a: "Yes, our skincare ranges undergo extensive clinical testing and safety evaluations under dermatological control to ensure they are hypoallergenic, non-comedogenic, and safe for all skin types, including sensitive skin." },
    { q: "How long does shipping take, and is it free?", a: "We offer free standard shipping on all orders above ₹999. Orders below ₹999 carry a flat charge of ₹99. Delivery typically takes 2-4 business days depending on your location." },
    { q: "What is your return and refund policy?", a: "We offer a 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can return the unused portion to us for a full refund or exchange. See our returns policy page for details." },
    { q: "Can I use the Vitamin C Glow Serum in the morning?", a: "Yes, Vitamin C is an excellent morning active. It fights off free radicals caused by sunlight and pollution. Ensure you follow up with Earthique SPF 50 Matte Sunscreen for full protection." },
    { q: "Do you test your formulations on animals?", a: "No, Earthique is a strictly cruelty-free brand. None of our ingredients or finished products are tested on animals, and we only source from suppliers with identical ethical standards." }
  ];

  const filtered = query === "" ? faqData : faqData.filter(faq => 
    faq.q.toLowerCase().includes(query) || 
    faq.a.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center" style="padding:3rem 0; color:var(--color-gray);">No matching questions found in our journal. Please type another query.</p>`;
    return;
  }

  container.innerHTML = filtered.map(faq => `
    <div class="faq-item">
      <button class="faq-trigger">
        <span>${faq.q}</span>
        <span class="faq-trigger-icon">▼</span>
      </button>
      <div class="faq-content">
        <div class="faq-content-inner">
          <p>${faq.a}</p>
        </div>
      </div>
    </div>
  `).join("");

  // Re-init accordion triggers
  initFAQAccordion();
}

// ==========================================
// Custom Droplet Cursor Effect
// ==========================================
function initDropletCursor() {
  // Create trailing cursor dot
  const cursor = document.createElement('div');
  cursor.className = 'droplet-cursor';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation for trailing cursor
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(\${cursorX}px, \${cursorY}px, 0) rotate(-45deg)`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Add click ripple effect
  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });

  // Expand cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, input, .product-card, .concern-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'droplet-ripple';
  ripple.style.left = `\${x}px`;
  ripple.style.top = `\${y}px`;
  document.body.appendChild(ripple);

  // Remove the ripple after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 600);
}
