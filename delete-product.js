<!-- HTML Form to delete a product -->
<form id="delete-product-form">
    <input type="number" id="delete-id" placeholder="Product ID to delete" required>
    <button type="submit">Delete Product</button>
</form>

<script>
    document.getElementById('delete-product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('delete-id').value;
        
        fetch(`/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
    });
</script>
