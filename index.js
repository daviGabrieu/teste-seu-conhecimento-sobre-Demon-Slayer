// Database of Geek & Anime Accessories
const products = [
    {
        id: 1,
        name: "Colar Medalhão do Lobo (The Witcher)",
        category: "colares",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Medalhão em liga de zinco pesada, detalhado com os olhos da Escola do Lobo."
    },
    {
        id: 2,
        name: "Brincos Potara (Dragon Ball)",
        category: "brincos",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Par de brincos de esferas que trazem o poder da fusão dos deuses Kaioshin."
    },
    {
        id: 3,
        name: "Chaveiro Espada Buster (FFVII)",
        category: "chaveiros",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A icônica espada gigante em miniatura para carregar suas chaves com muito estilo."
    },
    {
        id: 4,
        name: "Pingente Triforce (Zelda)",
        category: "pingentes",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Pingente geométrico reluzente simbolizando Coragem, Sabedoria e Poder absoluto."
    },
    {
        id: 5,
        name: "Brincos Hanafuda (Demon Slayer)",
        category: "brincos",
        price: 49.90,
        image: "https://images.unsplash.com/photo-1599643478514-4a4e0aeb9531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Réplica dos brincos de Tanjiro, feitos em resina leve, resistente e vibrante."
    },
    {
        id: 6,
        name: "Kit Bottons Akatsuki (Naruto)",
        category: "bottons",
        price: 29.90,
        image: "https://images.unsplash.com/photo-1616731948701-4dd984cb402b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Conjunto com 5 bottons metálicos da organização mais perigosa do mundo ninja."
    },
    {
        id: 7,
        name: "Colar Vira-Tempo (Harry Potter)",
        category: "colares",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1599557457173-9818816c5b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Colar com mecanismo giratório banhado a ouro e ampulheta interna com areia fina."
    },
    {
        id: 8,
        name: "Chaveiro Kunai de Aço",
        category: "chaveiros",
        price: 39.90,
        image: "https://images.unsplash.com/photo-1620579844465-4f052ab6ea53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Arma ninja em miniatura para adicionar um toque de furtividade à sua mochila."
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const categoryButtons = document.querySelectorAll('.cat-btn');
const checkoutBtn = document.getElementById('btn-checkout');

// Utility: Format Currency
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Render Products dynamically based on category filter
const renderProducts = (filter = 'all') => {
    // Fade out effect
    productGrid.style.opacity = 0;
    
    setTimeout(() => {
        productGrid.innerHTML = '';
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="btn-buy" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Adicionar ao Loot
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
        
        // Fade in effect
        productGrid.style.opacity = 1;
        productGrid.style.transition = 'opacity 0.5s ease';
    }, 300);
};

// Cart Logic: Add
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    
    // Animation feedback on cart icon
    cartToggle.style.transform = 'scale(1.3)';
    cartToggle.style.color = 'var(--primary-neon)';
    
    // Optional: Open sidebar automatically when adding
    if(!cartSidebar.classList.contains('open')) {
        toggleCart();
    }

    setTimeout(() => {
        cartToggle.style.transform = 'scale(1)';
        cartToggle.style.color = '';
    }, 300);
};

// Cart Logic: Change Quantity
window.changeQuantity = (id, amount) => {
    const item = cart.find(item => item.id === id);
    if(item) {
        item.quantity += amount;
        if(item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
};

// Cart Logic: Remove
window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// Cart Logic: Update UI
const updateCartUI = () => {
    // Update count indicator
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    if(totalItems > 0) {
        cartCount.style.animation = 'pulse 1s infinite alternate';
    } else {
        cartCount.style.animation = 'none';
    }
    
    // Update Items List
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Seu loot está vazio. Volte e explore a Forja!</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    
    // Update Total Price
    cartTotalPrice.innerText = formatPrice(total);
};

// Checkout to WhatsApp
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert("Adicione alguns artefatos ao seu loot antes de finalizar a compra!");
        return;
    }
    
    let orderText = "Fala Pixelforge! 🎮 Gostaria de finalizar o meu loot. Aqui está a lista:\n\n";
    
    cart.forEach(item => {
        orderText += `▪ ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderText += `\n*Total:* R$ ${total.toFixed(2)}\n\nComo procedemos com o pagamento e envio?`;
    
    const phone = "5561985408905"; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`, '_blank');
});

// Cart UI Interaction
const toggleCart = () => {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
};

cartToggle.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Category Filtering Interaction
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(b => b.classList.remove('active'));
        // Add active to the clicked button
        btn.classList.add('active');
        // Render specific products
        renderProducts(btn.getAttribute('data-filter'));
    });
});

// Page Load Transition & Init
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        renderProducts();
        updateCartUI(); // init empty state
    }, 500); // slight delay to show the dark loader
});
