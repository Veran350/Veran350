<!-- HTML Form to add a new product -->
<form id="add-product-form">
    <input type="text" id="name" placeholder="Product Name" required>
    <input type="text" id="description" placeholder="Description" required>
    <input type="number" id="price" placeholder="Price" required>
    <input type="text" id="imageUrl" placeholder="Image URL" required>
    <button type="submit">Add Product</button>
</form>

<script>
    document.getElementById('add-product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const imageUrl = document.getElementById('imageUrl').value;
        
        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, imageUrl })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    });
</script>
