// Catálogo de Produtos EcoVibe
const products = [
    {
        id: 1,
        title: "T-shirt Eco Minimalist",
        category: "tshirts",
        price: 24.90,
        material: "50% Algodão Orgânico + 50% PET Reciclado",
        petBottles: 4,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        tag: "Mais Vendido"
    },
    {
        id: 2,
        title: "Sweatshirt Oversized Urban Green",
        category: "sweatshirts",
        price: 49.90,
        material: "100% Fio Reciclado + Interior Aveludado",
        petBottles: 12,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        tag: "Coleção Exclusiva"
    },
    {
        id: 3,
        title: "Calças Jogger EcoFlex",
        category: "calcas",
        price: 39.90,
        material: "Tecido Sustentável de Alta Durabilidade",
        petBottles: 8,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80",
        tag: "Novidade"
    },
    {
        id: 4,
        title: "Ecobag 'No Planet B'",
        category: "acessorios",
        price: 12.90,
        material: "100% Algodão Orgânico Reutilizável",
        petBottles: 2,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        tag: "Zero Waste"
    },
    {
        id: 5,
        title: "T-shirt Essential Terracota",
        category: "tshirts",
        price: 26.90,
        material: "Tingimento Natural + Algodão Certificado",
        petBottles: 5,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
        tag: "Orgânico"
    },
    {
        id: 6,
        title: "Boné Aba Reta EcoVibe",
        category: "acessorios",
        price: 18.90,
        material: "Poliéster Reciclado Certificado",
        petBottles: 3,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
        tag: "Acessório"
    }
];

// Estado do Carrinho
let cart = [];

// Elementos do DOM
const productsContainer = document.getElementById('products-container');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountBadge = document.getElementById('cart-count');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartEcoImpactEl = document.getElementById('cart-eco-impact');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Renderizar Produtos
function renderProducts(items) {
    productsContainer.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="product-tag">${product.tag}</span>
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-material"><i class="fas fa-leaf"></i> ${product.material}</p>
                <div class="product-price-row">
                    <span class="price">€ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Adicionar
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

// Filtros
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true);
}

// Remover do Carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPetSaved = cart.reduce((sum, item) => sum + (item.petBottles * item.quantity), 0);

    cartCountBadge.textContent = totalItems;
    cartSubtotalEl.textContent = `€ ${totalPrice.toFixed(2).replace('.', ',')}`;
    cartEcoImpactEl.textContent = `${totalPetSaved} garrafas PET salvas do descarte`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">O teu carrinho está vazio. Começa a adicionar moda consciente!</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h5>${item.title}</h5>
                    <p>€ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#C65911; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

// Abrir / Fechar Carrinho Lateral
function toggleCart(open) {
    if (open) {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('active');
    } else {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
    }
}

openCartBtn.addEventListener('click', () => toggleCart(true));
closeCartBtn.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

checkoutBtn.addEventListener('click', () => {
    alert('Obrigado por apoiares a moda circular! A tua encomenda com entrega biodegradável está em processamento.');
    cart = [];
    updateCartUI();
    toggleCart(false);
});

// Inicialização
renderProducts(products);