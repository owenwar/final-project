import React, { useState, useCallback } from 'react';
import { ADD_PRODUCT } from '../../utils/mutations';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const AdminForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        onSale: false,
        imageUrl: '',
        category: '',
        colorTag: '',
        gender: 'male'
    });

    const [image, setImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormState({
            ...formState,
            [name]: checked
        });
    };

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // First, upload the image to S3 and get the URL
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const response = await axios.post('/upload', formData);
                formState.imageUrl = response.data.Location; // Assuming the returned data object has a Location property with the image URL
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Then, use the formState to add the product, including the imageUrl from S3
        try {
            await axios.post('/graphql', {
                query: ADD_PRODUCT,
                variables: { ...formState }
            });
            alert('Product added successfully!');
            setFormState({
                name: '',
                description: '',
                price: '',
                onSale: false,
                imageUrl: '',
                category: '',
                colorTag: '',
                gender: 'male'
            });
        } catch (err) {
            console.error(err);
            alert('Error adding product. Please try again.');
        }
    };


    return (
        <div className="admin-form-container">
            <h2>Add / Update Product</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formState.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <div {...getRootProps()} style={{border: '1px dashed gray', padding: '20px', cursor: 'pointer'}}>
                        <input {...getInputProps()} />
                        <p>Drag & drop an image here, or click to select one</p>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="onSale"
                            checked={formState.onSale}
                            onChange={handleCheckboxChange}
                        />
                        On Sale
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="colorTag">Color Tag:</label>
                    <input
                        type="text"
                        id="colorTag"
                        name="colorTag"
                        value={formState.colorTag}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formState.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AdminForm;
