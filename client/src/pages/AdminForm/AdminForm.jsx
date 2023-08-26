import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const AdminForm = () => {
    const [productDetails, setProductDetails] = useState({
        image: null,
        type: '',
        name: '',
        description: '',
        price: 0,
        // ... other fields
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/addProduct', productDetails);
            console.log(response.data);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="adminForm">
            {/* Your form fields and buttons */}
            <form onSubmit={handleSubmit}>
                {/* ... your form fields ... */}
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AdminForm;
