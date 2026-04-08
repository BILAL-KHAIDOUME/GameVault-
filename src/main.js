import { games } from "./data.js";


const gamesCont = document.getElementById("gamesCont");
const searchinput = document.getElementById("input");
const categoryBtns = document.querySelectorAll('.categoryBtns');
const bandeau = document.getElementById("promo-banner");


  









setTimeout(() => {
    bandeau 
},3000);



function AfficherGames(datagames){

    gamesCont.innerHTML = '';

    datagames.forEach(game => {
        const gameCard = `
        <div class="bg-gray-300 ">
                    <div class="flex items-center justify-between">
                        <img class="w-30" src="${game.logo}" alt="${game.title}">
        
                        <div class="bg-green-500 w-10 h-6">New</div>
                        <div class="bg-blue-600 w-28 h-6">Special Edition</div>
        
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9882 18.8711C13.9743 16.7095 8 11.7684 8 7.32115C8 4.38294 10.2497 2 13.3438 2C14.9469 2 16.55 2.51224 18.6875 4.5612C20.825 2.51224 22.4281 2 24.0313 2C27.1253 2 29.375 4.38294 29.375 7.32115C29.375 11.7674 23.4007 16.7095 20.3868 18.8711C19.3715 19.5985 18.0035 19.5985 16.9882 18.8711Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        
        
                    </div>
                    <div>
                        <img src="${game.image}" alt="${game.title}">
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="font-bold text-xl">${game.title}</h1>
                            <p class="font-medium">$${game.price}</p>
                        </div>
        
                        <button class="bg-red-500 flex items-center justify-center w-10 h-10 mr-4 add-to-cart" data-id="${game.id}">
                            <svg class="mr-1" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.3333 21.3333C21.908 21.3333 22.4591 21.5616 22.8654 21.9679C23.2717 22.3743 23.5 22.9254 23.5 23.5C23.5 24.0746 23.2717 24.6257 22.8654 25.0321C22.4591 25.4384 21.908 25.6667 21.3333 25.6667C20.7587 25.6667 20.2076 25.4384 19.8013 25.0321C19.3949 24.6257 19.1667 24.0746 19.1667 23.5C19.1667 22.2975 20.1308 21.3333 21.3333 21.3333ZM4 4H7.5425L8.56083 6.16667H24.5833C24.8706 6.16667 25.1462 6.2808 25.3494 6.48397C25.5525 6.68713 25.6667 6.96268 25.6667 7.25C25.6667 7.43417 25.6125 7.61833 25.5367 7.79167L21.6583 14.8008C21.29 15.4617 20.575 15.9167 19.7625 15.9167H11.6917L10.7167 17.6825L10.6842 17.8125C10.6842 17.8843 10.7127 17.9532 10.7635 18.004C10.8143 18.0548 10.8832 18.0833 10.955 18.0833H23.5V20.25H10.5C9.92536 20.25 9.37426 20.0217 8.96793 19.6154C8.56161 19.2091 8.33333 18.658 8.33333 18.0833C8.33333 17.7042 8.43083 17.3467 8.59333 17.0433L10.0667 14.3892L6.16667 6.16667H4V4ZM10.5 21.3333C11.0746 21.3333 11.6257 21.5616 12.0321 21.9679C12.4384 22.3743 12.6667 22.9254 12.6667 23.5C12.6667 24.0746 12.4384 24.6257 12.0321 25.0321C11.6257 25.4384 11.0746 25.6667 10.5 25.6667C9.92536 25.6667 9.37426 25.4384 8.96793 25.0321C8.56161 24.6257 8.33333 24.0746 8.33333 23.5C8.33333 22.2975 9.2975 21.3333 10.5 21.3333ZM20.25 13.75L23.2617 8.33333H9.56833L12.125 13.75H20.25Z" fill="white"/>
        </svg>
        
                        </button>
                    </div>
                </div>
        
        `;

        gamesCont.innerHTML += gameCard;
        
    });
}



function FilterGames(){

    const searchCond = searchinput.value.toLowerCase();
    const activeCategory = document.querySelector('.categoryBtns.bg-black').dataset.category;

    const filteredgames = games.filter(game => {
        const searchmatch = game.title.toLowerCase().includes(searchCond);
        const categorymatch = activeCategory === 'All' || game.category === activeCategory;
        return searchmatch && categorymatch;
    });

    AfficherGames(filteredgames);

}

searchinput.addEventListener('input', FilterGames);


categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => {
            b.classList.remove('bg-black', 'text-white');
            b.classList.add('bg-white', 'text-gray-900');
        });
        btn.classList.add('bg-black', 'text-white');
        btn.classList.remove('bg-white');

        FilterGames();
    });
});

AfficherGames(games);


let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}


function addToCart(gameId) {
    const gameToAdd = games.find(g => g.id === gameId);
    
    const existingItem = cart.find(item => item.id === gameId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...gameToAdd, quantity: 1 });
    }

    localStorage.setItem('gamevault_cart', JSON.stringify(cart));
    updateCartBadge();
    
    alert(`${gameToAdd.title} ajouté au panier !`);
}

gamesCont.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
    }
});

updateCartBadge();

