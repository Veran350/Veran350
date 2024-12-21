// Example code to add a new product and log the activity
app.post('/add-product', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    try {
        // Create new product in the database
        const newProduct = new Product({
            name,
            price,
            description,
            imageUrl
        });
        
        await newProduct.save();

        // Log the activity after adding the product
        const newActivity = {
            action: 'Product Added',
            details: `Added product: ${newProduct.name} at $${newProduct.price}`
        };

        // Send the log data to the logging route
        fetch('/log-activity', {
            method: 'POST',
            body: JSON.stringify(newActivity),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding product');
    }
});
