// script.js - Interaction for Skin Veda static site

// Cart state
const cart = [];

// Elements
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.querySelector('.cart-items');
const cartTotalSpan = document.getElementById('cartTotal');
const closeCartBtn = document.querySelector('.close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Open cart when any add-to-cart button is clicked
addToCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const id = card.dataset.id;
    const name = card.querySelector('.product-name').innerText;
    const priceText = card.querySelector('.product-price').innerText.replace(/[^0-9]/g, '');
    const price = parseInt(priceText, 10);
    addToCart({ id, name, price });
  });
});

function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
  // Show modal
  cartModal.setAttribute('aria-hidden', 'false');
}

function removeFromCart(id) {
  const index = cart.findIndex(i => i.id === id);
  if (index > -1) cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  // Clear list
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} × ${item.qty}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.style.background = 'transparent';
    removeBtn.style.border = 'none';
    removeBtn.style.color = '#e5c07b';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotalSpan.textContent = `₹${total.toLocaleString()}`;
}

// Close modal
closeCartBtn.addEventListener('click', () => {
  cartModal.setAttribute('aria-hidden', 'true');
});

// Click outside modal to close
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.setAttribute('aria-hidden', 'true');
  }
});

// Optional: smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
function saveCartAndCheckout() {
  // Ensure cart is saved before leaving
  localStorage.setItem('skinVedaCart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}
// Animate product cards on scroll
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
});
