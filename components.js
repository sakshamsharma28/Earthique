// Earthique - Dynamic Component Injector & State Sync

// Theme Initialization (execute immediately to prevent flash)
const savedTheme = localStorage.getItem('earthique-theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

document.addEventListener("DOMContentLoaded", () => {
  injectCommonComponents();
  initAnnouncementBar();
  initStickyHeader();
  initThemeToggle();
  initDrawersAndModals();
  initGlobalSearch();
  initMobileMenu();
  syncGlobalCounts();
});

// 1. Inject common HTML structures
function injectCommonComponents() {
  // Check if target containers exist, otherwise prepend/append
  let header = document.getElementById("main-header");
  if (!header) {
    header = document.createElement("header");
    header.id = "main-header";
    header.className = "main-header";
    document.body.prepend(header);
  }

  let announcement = document.getElementById("announcement-bar");
  if (!announcement) {
    announcement = document.createElement("div");
    announcement.id = "announcement-bar";
    announcement.className = "announcement-bar";
    document.body.insertBefore(announcement, header);
  }

  let footer = document.getElementById("main-footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.id = "main-footer";
    footer.className = "main-footer section-padding";
    document.body.appendChild(footer);
  }

  // Inject Announcement Bar Content
  announcement.innerHTML = `
    <div class="announcement-item active">Free Shipping Above ₹999</div>
    <div class="announcement-item">100% Organic & Herbal Ingredients</div>
    <div class="announcement-item">Dermatologically Tested Formula</div>
    <div class="announcement-item">Secure & Encrypted Payments</div>
  `;

  // Inject Header Content
  header.innerHTML = `
    <div class="container header-container">
      <!-- Left: Logo & Mobile Toggle -->
      <div style="display: flex; align-items: center; gap: 1rem;">
        <button class="mobile-nav-toggle" aria-label="Toggle Menu" id="mobile-nav-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg>
        </button>
        <a href="index.html" class="logo">Earthique</a>
      </div>

      <!-- Center: Navigation Menu -->
      <nav class="nav-menu">
        <a href="index.html" class="nav-link">Home</a>
        <a href="shop.html" class="nav-link">Shop All</a>
        <a href="best-sellers.html" class="nav-link">Best Sellers</a>
        <a href="categories.html" class="nav-link">Categories</a>
        <a href="blog.html" class="nav-link">Blog</a>
      </nav>

      <!-- Right: Action Icons -->
      <div class="header-actions">
        <button class="header-btn" id="theme-toggle" aria-label="Toggle Theme">
          <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display: none;"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="header-btn" id="search-trigger" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
        </button>
        <div class="account-menu-wrapper">
          <a href="login.html" class="header-btn" id="account-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <div class="account-dropdown" id="account-dropdown">
            <!-- Dynamically populated based on auth status -->
          </div>
        </div>
        <a href="wishlist.html" class="header-btn" id="wishlist-btn" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke-linecap="round"/></svg>
          <span class="badge-count" id="wishlist-badge">0</span>
        </a>
        <button class="header-btn" id="cart-trigger" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke-linecap="round"/></svg>
          <span class="badge-count" id="cart-badge">0</span>
        </button>
      </div>
    </div>
  `;

  // Inject Drawers, Modals & Toast Containers
  const overlayHtml = `
    <!-- Drawer Overlay -->
    <div class="drawer-overlay" id="drawer-overlay"></div>

    <!-- Mobile Nav Drawer -->
    <div class="drawer mobile-nav-drawer" id="mobile-nav-drawer">
      <div class="drawer-header">
        <span class="logo" style="font-size:1.6rem">Earthique</span>
        <button class="drawer-close" id="mobile-nav-close">&times;</button>
      </div>
      <div class="drawer-body">
        <ul class="mobile-nav-list">
          <li><a href="index.html" class="mobile-nav-link">Home</a></li>
          <li><a href="shop.html" class="mobile-nav-link">Shop All</a></li>
          <li><a href="best-sellers.html" class="mobile-nav-link">Best Sellers</a></li>
          <li><a href="categories.html" class="mobile-nav-link">Categories</a></li>
          <li><a href="blog.html" class="mobile-nav-link">Blog</a></li>
          <li><a href="about.html" class="mobile-nav-link">About Us</a></li>
          <li><a href="contact.html" class="mobile-nav-link">Contact</a></li>
          <li style="margin-top:2rem"><a href="account.html" class="btn btn-primary" style="width:100%">My Account</a></li>
        </ul>
      </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-drawer" id="search-drawer">
      <div class="container" style="position:relative">
        <button class="drawer-close" id="search-close" style="position:absolute; right:2rem; top:0">&times;</button>
        <h3 class="text-center" style="margin-bottom:1rem">Search Earthique</h3>
        <div class="search-input-wrapper">
          <input type="text" placeholder="Type skin concern, category, or ingredient..." class="search-field" id="search-field">
          <button class="search-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="search-results-grid" id="search-results-grid"></div>
      </div>
    </div>

    <!-- Cart Side-Drawer -->
    <div class="drawer cart-drawer" id="cart-drawer">
      <div class="drawer-header">
        <h4>Shopping Cart</h4>
        <button class="drawer-close" id="cart-close">&times;</button>
      </div>
      <div class="drawer-body" id="cart-drawer-body">
        <!-- Cart Items loaded by JS -->
      </div>
      <div class="drawer-footer" id="cart-drawer-footer">
        <div class="cart-totals">
          <span>Subtotal</span>
          <span id="cart-drawer-subtotal">₹0</span>
        </div>
        <div class="cart-drawer-buttons">
          <a href="cart.html" class="btn btn-secondary">View Cart</a>
          <button class="btn btn-primary" onclick="proceedToCheckout()">Checkout</button>
        </div>
      </div>
    </div>

    <!-- Quick View Modal -->
    <div class="modal-overlay" id="quick-view-modal">
      <div class="modal-content">
        <button class="modal-close" id="quick-view-close">&times;</button>
        <div class="quick-view-grid" id="quick-view-grid-content">
          <!-- Loaded dynamically from app.js -->
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div class="modal-overlay" id="video-modal">
      <div class="modal-content video-modal-content">
        <button class="modal-close" id="video-modal-close" style="background:#000; color:#fff">&times;</button>
        <div class="video-player-wrapper" id="video-player-wrapper">
          <!-- Video Embed -->
        </div>
      </div>
    </div>

    <!-- Toast Notifications Container -->
    <div class="toast-container" id="toast-container"></div>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="back-to-top" aria-label="Back to Top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6" stroke-linecap="round"/></svg>
    </button>
  `;
  document.body.insertAdjacentHTML("beforeend", overlayHtml);

  // Inject Footer Content
  footer.innerHTML = `
    <div class="container">
      <div class="grid" style="grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 4rem; border-bottom: 1px solid var(--color-border); padding-bottom: 4rem; margin-bottom: 3rem;">
        <div>
          <h3 style="font-size: 2rem; margin-bottom: 1.5rem;">Earthique</h3>
          <p style="margin-bottom: 2rem;">Nature's Purity, Perfected for Your Skin. Premium herbal skincare combining natural ingredients with dermatological science.</p>
          <div class="flex" style="gap:1rem;">
            <!-- Social Icons -->
            <a href="#" aria-label="Instagram" style="color:var(--color-sage);"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
            <a href="#" aria-label="Facebook" style="color:var(--color-sage);"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href="#" aria-label="YouTube" style="color:var(--color-sage);"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;">Quick Links</h4>
          <ul style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.9rem;">
            <li><a href="about.html">Our Story</a></li>
            <li><a href="blog.html">Blog & Skincare Tips</a></li>
            <li><a href="faq.html">FAQ Accordions</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="tracking.html">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;">Categories</h4>
          <ul style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.9rem;">
            <li><a href="shop.html?category=Serum">Serums</a></li>
            <li><a href="shop.html?category=Moisturizer">Moisturizers</a></li>
            <li><a href="shop.html?category=Sunscreen">Sunscreens</a></li>
            <li><a href="shop.html?category=Cleanser">Cleansers</a></li>
            <li><a href="shop.html?category=Face+Wash">Face Wash</a></li>
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;">Newsletter</h4>
          <p style="margin-bottom: 1.5rem; font-size: 0.9rem;">Subscribe to receive skincare secrets, launch deals, and natural beauty tips.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address..." class="newsletter-input" id="footer-newsletter-input">
            <button class="newsletter-submit" onclick="handleFooterNewsletter()">Join</button>
          </div>
          <p id="footer-newsletter-status" class="newsletter-status"></p>
        </div>
      </div>
      <div class="flex justify-between align-center" style="flex-wrap:wrap; gap:1.5rem; font-size: 0.8rem; color:var(--color-gray);">
        <span>&copy; 2026 Earthique. All rights reserved. Nature's Purity, Perfected for Your Skin.</span>
        <div class="flex" style="gap: 1.5rem;">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms & Conditions</a>
          <a href="shipping.html">Shipping Policy</a>
          <a href="returns.html">Returns & Refund Policy</a>
        </div>
      </div>
    </div>
  `;

  // Render Account Dropdown based on localStorage state
  renderAccountDropdown();

  // Set active link class based on pathname
  let currentPath = window.location.pathname.split("/").pop();
  if (!currentPath || currentPath === "") currentPath = "index.html";
  const navLinks = header.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 2. Announcement Bar Alternating
function initAnnouncementBar() {
  const items = document.querySelectorAll(".announcement-item");
  if (items.length === 0) return;
  let activeIndex = 0;

  setInterval(() => {
    items[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + 1) % items.length;
    items[activeIndex].classList.add("active");
  }, 3500);
}

// 3. Sticky header behavior
function initStickyHeader() {
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    
    // Back to top toggle
    const b2t = document.getElementById("back-to-top");
    if (b2t) {
      if (window.scrollY > 400) {
        b2t.classList.add("active");
      } else {
        b2t.classList.remove("active");
      }
    }
  });

  const b2t = document.getElementById("back-to-top");
  if (b2t) {
    b2t.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// 4. Drawers & Modals Toggles
function initDrawersAndModals() {
  const overlay = document.getElementById("drawer-overlay");
  
  // Cart Drawer
  const cartTrigger = document.getElementById("cart-trigger");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close");

  const openCart = () => {
    renderCartDrawer();
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
  };

  const closeCart = () => {
    cartDrawer.classList.remove("active");
    if (!document.getElementById("search-drawer").classList.contains("active") && 
        !document.getElementById("mobile-nav-drawer").classList.contains("active")) {
      overlay.classList.remove("active");
    }
  };

  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);

  // Search Drawer
  const searchTrigger = document.getElementById("search-trigger");
  const searchDrawer = document.getElementById("search-drawer");
  const searchClose = document.getElementById("search-close");

  const openSearch = () => {
    searchDrawer.classList.add("active");
    overlay.classList.add("active");
    setTimeout(() => document.getElementById("search-field").focus(), 300);
  };

  const closeSearch = () => {
    searchDrawer.classList.remove("active");
    if (!cartDrawer.classList.contains("active") && 
        !document.getElementById("mobile-nav-drawer").classList.contains("active")) {
      overlay.classList.remove("active");
    }
  };

  if (searchTrigger) searchTrigger.addEventListener("click", openSearch);
  if (searchClose) searchClose.addEventListener("click", closeSearch);

  // Overlay Click
  overlay.addEventListener("click", () => {
    closeCart();
    closeSearch();
    closeMobileMenu();
    document.getElementById("quick-view-modal").classList.remove("active");
    document.getElementById("video-modal").classList.remove("active");
  });

  // Modal Closures
  const qvClose = document.getElementById("quick-view-close");
  if (qvClose) qvClose.addEventListener("click", () => {
    document.getElementById("quick-view-modal").classList.remove("active");
  });

  const vClose = document.getElementById("video-modal-close");
  if (vClose) vClose.addEventListener("click", () => {
    document.getElementById("video-modal").classList.remove("active");
    document.getElementById("video-player-wrapper").innerHTML = ""; // Clear iframe/video
  });
}

// 5. Account menu state
function renderAccountDropdown() {
  const dropdown = document.getElementById("account-dropdown");
  const user = JSON.parse(localStorage.getItem("earthique_user"));

  if (user) {
    dropdown.innerHTML = `
      <div style="padding:1rem 1.2rem; font-size:0.8rem; border-bottom:1px solid var(--color-light-gray); font-weight:600; color:var(--color-sage-dark);">
        Hello, ${user.name.split(" ")[0]}
      </div>
      <a href="account.html" class="dropdown-item">My Account</a>
      <a href="tracking.html" class="dropdown-item">Track Order</a>
      <a href="#" class="dropdown-item" id="logout-btn">Log Out</a>
    `;
    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("earthique_user");
      showToast("Logged out successfully", "info");
      renderAccountDropdown();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  } else {
    dropdown.innerHTML = `
      <a href="login.html" class="dropdown-item">Login</a>
      <a href="register.html" class="dropdown-item">Register</a>
      <a href="tracking.html" class="dropdown-item">Track Order</a>
    `;
  }
}

// 6. Global Counts Sync
function syncGlobalCounts() {
  // Cart count
  const cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) cartBadge.innerText = cartCount;

  // Wishlist count
  const wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];
  const wishlistBadge = document.getElementById("wishlist-badge");
  if (wishlistBadge) wishlistBadge.innerText = wishlist.length;
}

// 7. Cart Drawer Rendering
function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const subtotalLabel = document.getElementById("cart-drawer-subtotal");
  const cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="empty-cart-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom:1rem; opacity:0.6;"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-secondary" style="margin-top:1.5rem">Shop Collection</a>
      </div>
    `;
    subtotalLabel.innerText = "₹0";
    document.getElementById("cart-drawer-footer").style.display = "none";
    return;
  }

  document.getElementById("cart-drawer-footer").style.display = "block";
  let html = "";
  let total = 0;

  // Free shipping progress calculation (Target: ₹999)
  const shippingTarget = 999;
  cart.forEach(item => {
    total += item.price * item.qty;
  });

  const diff = shippingTarget - total;
  const progressPercent = Math.min((total / shippingTarget) * 100, 100);

  let progressHtml = `
    <div class="cart-shipping-progress">
      <p class="progress-text">
        ${diff > 0 
          ? `Spend <strong>₹${diff}</strong> more for <strong>FREE SHIPPING</strong>` 
          : `🎉 Your order qualifies for <strong>FREE SHIPPING!</strong>`}
      </p>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${progressPercent}%"></div>
      </div>
    </div>
  `;

  html += progressHtml;
  html += '<div class="cart-items-list">';

  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div>
            <h5 class="cart-item-title">${item.name}</h5>
            <span class="cart-item-price">₹${item.price}</span>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty + 1})">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">Remove</button>
      </div>
    `;
  });

  html += '</div>';
  body.innerHTML = html;
  subtotalLabel.innerText = `₹${total}`;
}

// Cart Manipulations (called globally)
window.updateCartQty = function(id, qty) {
  let cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
  if (qty <= 0) {
    removeCartItem(id);
    return;
  }
  cart = cart.map(item => item.id === id ? { ...item, qty } : item);
  localStorage.setItem("earthique_cart", JSON.stringify(cart));
  syncGlobalCounts();
  renderCartDrawer();
  // Sync page forms if present
  if (typeof renderCartPage === 'function') renderCartPage();
};

window.removeCartItem = function(id) {
  let cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("earthique_cart", JSON.stringify(cart));
  showToast("Item removed from cart", "info");
  syncGlobalCounts();
  renderCartDrawer();
  // Sync page forms if present
  if (typeof renderCartPage === 'function') renderCartPage();
};

window.addToCart = function(productId, qty = 1, showDrawer = true) {
  // Get product details
  if (typeof products === 'undefined') return;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: qty
    });
  }

  localStorage.setItem("earthique_cart", JSON.stringify(cart));
  showToast(`${product.name} added to cart!`, "success");
  syncGlobalCounts();

  if (showDrawer) {
    setTimeout(() => {
      const cartDrawer = document.getElementById("cart-drawer");
      const overlay = document.getElementById("drawer-overlay");
      renderCartDrawer();
      cartDrawer.classList.add("active");
      overlay.classList.add("active");
    }, 300);
  }
};

window.toggleWishlist = function(productId, btnElement = null) {
  if (typeof products === 'undefined') return;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let wishlist = JSON.parse(localStorage.getItem("earthique_wishlist")) || [];
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist`, "info");
    if (btnElement) btnElement.classList.remove("active");
  } else {
    wishlist.push(productId);
    showToast(`${product.name} added to wishlist!`, "success");
    if (btnElement) btnElement.classList.add("active");
  }

  localStorage.setItem("earthique_wishlist", JSON.stringify(wishlist));
  syncGlobalCounts();

  // If we are on the wishlist page, refresh the grid
  if (typeof renderWishlistPage === 'function') renderWishlistPage();
};

// 8. Global Search Box
function initGlobalSearch() {
  const field = document.getElementById("search-field");
  const results = document.getElementById("search-results-grid");
  if (!field) return;

  field.addEventListener("input", () => {
    const query = field.value.trim().toLowerCase();
    if (query.length < 2) {
      results.innerHTML = "";
      return;
    }

    if (typeof products === 'undefined') return;

    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) || 
      p.ingredients.toLowerCase().includes(query) ||
      p.skinConcern.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      results.innerHTML = `<p class="text-center" style="grid-column:1/-1; padding:2rem; color:var(--color-gray);">No products found matching "${field.value}"</p>`;
      return;
    }

    results.innerHTML = filtered.map(p => `
      <div class="product-card" style="font-size: 0.85rem;">
        <div class="product-card-gallery" style="aspect-ratio: 16/10;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body" style="padding:1rem;">
          <span class="product-card-cat" style="font-size:0.65rem;">${p.category}</span>
          <h4 class="product-card-name" style="font-size:1rem; height:32px; -webkit-line-clamp:1;"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <span class="product-card-price" style="font-size:0.9rem;">₹${p.price}</span>
        </div>
      </div>
    `).join("");
  });
}

// 9. Mobile Menu Hamburgers
function initMobileMenu() {
  const toggle = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const close = document.getElementById("mobile-nav-close");
  const overlay = document.getElementById("drawer-overlay");

  const openMenu = () => {
    drawer.classList.add("active");
    overlay.classList.add("active");
  };

  const closeMenu = () => {
    drawer.classList.remove("active");
    if (!document.getElementById("cart-drawer").classList.contains("active") && 
        !document.getElementById("search-drawer").classList.contains("active")) {
      overlay.classList.remove("active");
    }
  };

  if (toggle) toggle.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
}

function closeMobileMenu() {
  document.getElementById("mobile-nav-drawer").classList.remove("active");
}

// 10. Toast Notification System
window.showToast = function(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.add("toast-hide");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
};

// 11. Footer Newsletter Form Validation
window.handleFooterNewsletter = function() {
  const input = document.getElementById("footer-newsletter-input");
  const status = document.getElementById("footer-newsletter-status");
  if (!input || !status) return;

  const email = input.value.trim();
  if (email === "") {
    status.style.color = "var(--color-danger)";
    status.innerText = "Please enter an email address.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.style.color = "var(--color-danger)";
    status.innerText = "Please enter a valid email address.";
    return;
  }

  status.style.color = "var(--color-success)";
  status.innerText = "Thank you! You have been subscribed to Earthique's newsletter.";
  input.value = "";

  setTimeout(() => {
    status.innerText = "";
  }, 4000);
};

// Checkout Function (direct checkout trigger)
window.proceedToCheckout = function() {
  const cart = JSON.parse(localStorage.getItem("earthique_cart")) || [];
  if (cart.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }
  window.location.href = "checkout.html";
};

// Quick View product loading
window.openQuickView = function(productId) {
  if (typeof products === 'undefined') return;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quick-view-modal");
  const grid = document.getElementById("quick-view-grid-content");

  grid.innerHTML = `
    <div class="quick-view-gallery">
      <img src="${product.images[0]}" alt="${product.name}" class="quick-view-img" id="qv-main-img">
    </div>
    <div class="quick-view-info">
      ${product.badge ? `<span class="quick-view-badge">${product.badge}</span>` : ''}
      <h3 class="quick-view-title">${product.name}</h3>
      <div class="quick-view-rating">
        <span class="stars">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</span>
        <span style="color:var(--color-gray)">(${product.reviewsCount} reviews)</span>
      </div>
      <div class="quick-view-price">₹${product.price}</div>
      <p class="quick-view-desc">${product.shortDescription}</p>
      
      <div style="font-size:0.8rem; margin:1.5rem 0; border-top:1px solid var(--color-light-gray); padding-top:1rem;">
        <p style="margin-bottom:0.4rem;"><strong>Concern:</strong> ${product.skinConcern}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>

      <div class="quick-view-actions">
        <button class="btn btn-primary" onclick="addToCart('${product.id}', 1, true); closeQuickView();">Add To Cart</button>
        <button class="btn btn-secondary" onclick="window.location.href='product-details.html?id=${product.id}'">View Details</button>
      </div>
    </div>
  `;

  modal.classList.add("active");
};

window.closeQuickView = function() {
  document.getElementById("quick-view-modal").classList.remove("active");
};

window.openVideoReview = function(authorName) {
  const modal = document.getElementById("video-modal");
  const wrapper = document.getElementById("video-player-wrapper");

  // Load simulated luxury skin product usage video or placeholder embed
  wrapper.innerHTML = `
    <div style="color: #fff; text-align: center; padding: 2rem;">
      <h3 style="color:#fff; margin-bottom:1rem; font-family:var(--font-serif)">Customer Review: ${authorName}</h3>
      <div style="background:#222; max-width:500px; margin:0 auto; aspect-ratio:9/16; position:relative; border:1px solid #333; border-radius:8px; overflow:hidden;">
        <!-- Mock Video Playing Overlay -->
        <video style="width:100%; height:100%; object-fit:cover" autoplay loop muted playsinline src="https://assets.mixkit.co/videos/preview/mixkit-beauty-woman-applying-a-face-oil-41619-large.mp4"></video>
        <div style="position:absolute; bottom:2rem; left:0; right:0; text-align:center; background:rgba(0,0,0,0.5); padding:1rem; font-size:0.8rem;">
          <p>★ ★ ★ ★ ★</p>
          <p>"My skin feels so fresh and hydrated!"</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
};
// ==========================================
// Theme Toggle Functionality
// ==========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  // Set initial icon state based on current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  if (currentTheme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('earthique-theme', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('earthique-theme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  });
}
