// js/cart.js

// 1. Récupérer les éléments du DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountBadge = document.getElementById('cart-count');
const orderSummary = document.getElementById('order-summary');
const checkoutBtn = document.getElementById('checkout-btn');

// 2. Initialiser le panier depuis localStorage
let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

// 3. Fonction principale pour afficher le panier
function updateCartUI() {
    if (!cartItemsContainer) return; // Sécurité

    cartItemsContainer.innerHTML = '';
    if (orderSummary) orderSummary.innerHTML = '';
    
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                <i class="fa-solid fa-cart-shopping text-4xl text-gray-200 mb-4"></i>
                <p class="text-gray-500 font-medium text-xl">Votre panier est vide</p>
                <a href="index.html" class="inline-block mt-4 text-black font-bold underline">Retourner à l'accueil</a>
            </div>`;
        if (cartTotalElement) cartTotalElement.textContent = '0.00 €';
        if (cartCountBadge) cartCountBadge.textContent = '0';
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        // Render Card Article
        const itemHTML = `
            <div class="bg-white p-5 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
                <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded-[1.5rem]">
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-xl">${item.title}</h4>
                        <button class="text-gray-300 hover:text-red-500 transition-colors remove-item" data-id="${item.id}">
                            <i class="fa-solid fa-trash-can text-lg"></i>
                        </button>
                    </div>
                    <p class="text-gray-400 text-sm mb-4">${item.category}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-4 bg-gray-100 rounded-2xl px-3 py-1.5 w-fit">
                            <button class="update-qty hover:scale-110 active:scale-90 transition-transform font-bold px-2" data-id="${item.id}" data-action="minus">-</button>
                            <span class="font-black text-lg min-w-[20px] text-center">${item.quantity}</span>
                            <button class="update-qty hover:scale-110 active:scale-90 transition-transform font-bold px-2" data-id="${item.id}" data-action="plus">+</button>
                        </div>
                        <span class="font-black text-xl">${(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;

        // Render Summary Details
        if (orderSummary) {
            orderSummary.innerHTML += `<div class="flex justify-between text-gray-600">
                <span>${item.title} x${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}€</span>
            </div>`;
        }
    });

    if (cartTotalElement) cartTotalElement.textContent = `${total.toFixed(2)} €`;
    if (cartCountBadge) cartCountBadge.textContent = count;
}

// 4. Gestion des clics (Quantity & Delete)
if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = parseInt(btn.dataset.id);
        const itemIndex = cart.findIndex(i => i.id === id);

        if (btn.classList.contains('update-qty')) {
            const action = btn.dataset.action;
            if (action === 'plus') cart[itemIndex].quantity++;
            else if (action === 'minus' && cart[itemIndex].quantity > 1) cart[itemIndex].quantity--;
        } 
        
        if (btn.classList.contains('remove-item')) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('gamevault_cart', JSON.stringify(cart));
        updateCartUI();
    });
}

// 5. Commander (US9)
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        alert(" Succès ! Votre commande est validée.");
        cart = [];
        localStorage.removeItem('gamevault_cart');
        updateCartUI();
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', updateCartUI);