
"use client";

import { useCallback, useState } from 'react';
import CategoryTags from '@/components/Boxes/BrandBox/CategoryTags';
import { deleteBrand, updateBrand } from '@/services/brand';
import useToken from '@/hooks/useToken';
import toast from 'react-hot-toast';

const BrandBox = ({ id, title = '', categories = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [currentTitle, setCurrentTitle] = useState(title); // State for managing the current title
  const [visible, setVisible] = useState(true); // State to manage visibility after delete
  const Token = useToken();

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
      setVisible(false); // Hide the brand box immediately
    } catch (error) {
      console.error('Failed to delete brand:', error);
      toast.error('Failed to delete brand');
    }
  }, [id, Token]);

  // Handle brand edit
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
      const response = await updateBrand({ title: newTitle }, id, Token);
      if (!response.ok) throw new Error('Failed to update brand');
      toast.success('Brand updated successfully');
      setCurrentTitle(newTitle); // Update the current title immediately
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update brand:', error);
      toast.error('Failed to update brand');
    }
  }, [id, newTitle, Token]);

  if (!visible) return null; // Don't render if the brand is deleted

  return (
    <div id={`brand-${id}`} className="p-4 bg-white shadow rounded-md flex flex-col gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-1 rounded"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
              Update
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{currentTitle}</h3> {/* Use currentTitle state */}
            <div className="flex gap-2">
              <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                Edit
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </div>
          {categories.length > 0 ? (
            <CategoryTags categories={categories} />
          ) : (
            <p className="text-gray-500">No categories available</p>
          )}
        </>
      )}
    </div>
  );
};

export default BrandBox;
