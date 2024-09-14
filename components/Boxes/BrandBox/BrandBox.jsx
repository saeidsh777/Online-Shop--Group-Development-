"use client";

import { useCallback, useState, useEffect } from 'react';
import { deleteBrand, updateBrand } from '@/services/brand';
import { getAllCategories } from '@/services/categories';
import useToken from '@/hooks/useToken';
import toast from 'react-hot-toast';

const BrandBox = ({ id, title = '', categories = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [visible, setVisible] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [brandCategories, setBrandCategories] = useState(categories);
  const [shakingCategory, setShakingCategory] = useState(null);
  const Token = useToken();

  // Fetch all categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { result, err } = await getAllCategories();
        if (err) {
          console.error('Failed to fetch categories:', err);
          return;
        }
        setAllCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle brand deletion
  const handleDelete = useCallback(async () => {
    if (!Token) {
      toast.error('Token is missing');
      return;
    }

    if (!id) {
      toast.error('Brand id is missing');
      return;
    }

    try {
      const response = await deleteBrand(id, Token);
      if (!response.ok) throw new Error('Failed to delete brand');
      toast.success('Brand deleted successfully');
      setVisible(false);
    } catch (error) {
      console.error('Failed to delete brand:', error);
      toast.error('Failed to delete brand');
    }
  }, [id, Token]);

  // Handle edit mode
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Handle brand update
  const handleUpdate = useCallback(async () => {
    if (!Token) {
      toast.error('Token is missing');
      return;
    }

    if (!id) {
      toast.error('Brand id is missing');
      return;
    }

    try {
      const response = await updateBrand({ title: newTitle, allowedCategories: brandCategories }, id, Token);
      if (!response.ok) throw new Error('Failed to update brand');
      toast.success('Brand updated successfully');
      setCurrentTitle(newTitle);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update brand:', error);
      toast.error('Failed to update brand');
    }
  }, [id, newTitle, brandCategories, Token]);

  // Handle removing a category from the brand
  const handleCategoryRemove = (categoryId) => {
    if (brandCategories.length > 1) {
      setBrandCategories(brandCategories.filter((cat) => cat !== categoryId));
      setShakingCategory(null); // Reset shaking state
    } else {
      setShakingCategory(categoryId);
      setTimeout(() => setShakingCategory(null), 1500); // Reset shaking state after animation
    }
  };

  // Handle adding a category to the brand
  const handleCategoryAdd = (categoryId) => {
    if (!brandCategories.includes(categoryId)) {
      setBrandCategories([...brandCategories, categoryId]);
    }
  };

  // Filter out brand's categories from the full list
  const availableCategories = allCategories.filter(
    (cat) => !brandCategories.includes(cat._id)
  );

  if (!visible) return null;

  return (
    <div
      id={`brand-${id}`}
      className="p-4 bg-white shadow rounded-md flex flex-col gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-1 rounded"
          />
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-sm font-medium">Available Categories:</h4>
              <div className="flex flex-wrap gap-1">
                {availableCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryAdd(category._id)}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Brand Categories:</h4>
              <div className="flex flex-wrap gap-1">
                {brandCategories.map((categoryId) => {
                  const category = allCategories.find((cat) => cat._id === categoryId);
                  if (!category) return null;
                  return (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryRemove(category._id)}
                      className={`px-2 py-1 rounded-full text-sm hover:bg-blue-200 ${
                        shakingCategory === category._id ? 'animate-shake bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {category.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{currentTitle}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
          {brandCategories.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {brandCategories.map((categoryId) => {
                const category = allCategories.find((cat) => cat._id === categoryId);
                if (!category) return null;
                return (
                  <span
                    key={category._id}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {category.title}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No categories available</p>
          )}
        </>
      )}
    </div>
  );
};

export default BrandBox;
