// components/Boxes/BrandBox/CategoryTags.jsx

import { useEffect, useState } from 'react';
import { getAllCategories } from '@/services/categories'; 
const CategoryTags = ({ categories = [] }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);

  // get all category tags from server
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

  // find category title by id of categories
  useEffect(() => {
    const matchedCategories = categories
      .map((catId) => allCategories.find((cat) => cat._id === catId))
      .filter(Boolean); // filtering undefiend

    setDisplayCategories(matchedCategories);
  }, [categories, allCategories]);

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {displayCategories.map((category) => (
        <span
          key={category._id}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {category.title}
        </span>
      ))}
    </div>
  );
};

export default CategoryTags;
