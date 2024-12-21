// Fetch products from the backend API and display them
document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('products-container');
    const cartCount = document.getElementById('cart-count');

    // Load cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart count in the header
    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    // Update cart count on page load
    updateCartCount();

    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            // Add event listener for Add to Cart button
            const addToCartButton = productCard.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                // Add product to cart
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update the cart count in the header
                updateCartCount();
            });

            // Append product card to the container
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
