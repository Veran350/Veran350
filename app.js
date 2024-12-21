// Fetch products from the backend API and display them
document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('products-container');

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

            // Append product card to the container
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
