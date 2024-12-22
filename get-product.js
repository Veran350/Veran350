<!-- Display list of products -->
<ul id="products-list"></ul>

<script>
    // Fetch products and display them
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('products-list');
            data.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `${product.name} - ${product.price}`;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
</script>
