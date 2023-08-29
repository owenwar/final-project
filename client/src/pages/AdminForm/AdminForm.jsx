import React, { useState, useCallback } from "react";
import { ADD_PRODUCT } from "../../utils/mutations";
import { useDropzone } from "react-dropzone";

const AdminForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    onSale: false,
    imageUrl: "",
    category: "",
    colorTag: "",
    gender: "male",
  });

  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // State for upload confirmation
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState({
      ...formState,
      [name]: checked,
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
    setUploadSuccess(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await ADD_PRODUCT(
        image,
        formState.category,
        formState.name,
        formState.description,
        parseFloat(formState.price),
        formState.gender,
        formState.onSale,
        formState.colorTag
      );
      if (result && result.id) {
        alert("Product added successfully!");
        setFormState({
          name: "",
          description: "",
          price: "",
          onSale: false,
          imageUrl: "",
          category: "",
          colorTag: "",
          gender: "male",
        });
      } else {
        throw new Error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product. Please try again.");
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
          <div
            {...getRootProps()}
            style={{
              border: "1px dashed gray",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" width="100" />
            </div>
          )}
          {uploadSuccess && <p>Image uploaded successfully!</p>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formState.category}
            onChange={handleInputChange}
            required
          >
            <option value="Hat">Hat</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Long Sleeve">Long Sleeve</option>
            <option value="V-Neck">V-Neck</option>
            {/* Add other categories!!!!!!!!!!!! */}
          </select>
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
          <select
            id="colorTag"
            name="colorTag"
            value={formState.colorTag}
            onChange={handleInputChange}
          >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Black">Black</option>
            {/* Add other colors !!!!!!!!!!! */}
          </select>
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
