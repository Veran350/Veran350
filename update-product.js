<!-- HTML Form to update a product -->
<form id="update-product-form">
    <input type="number" id="product-id" placeholder="Product ID" required>
    <input type="text" id="update-name" placeholder="Product Name">
    <input type="text" id="update-description" placeholder="Description">
    <input type="number" id="update-price" placeholder="Price">
    <input type="text" id="update-imageUrl" placeholder="Image URL">
    <button type="submit">Update Product</button>
</form>

<script>
    document.getElementById('update-product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('product-id').value;
        const name = document.getElementById('update-name').value;
        const description = document.getElementById('update-description').value;
        const price = document.getElementById('update-price').value;
        const imageUrl = document.getElementById('update-imageUrl').value;

        fetch(`/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, imageUrl })
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
    });
</script>
