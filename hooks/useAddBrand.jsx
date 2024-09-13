// hooks/useAddBrand.js
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { addBrand as postBrand } from '@/services/brand';
import useResponse from './useResponse';
import useToken from './useToken';
import { getAllCategories } from '@/services/categories';

const useAddBrand = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const responseHandler = useResponse();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchCategories = async () => {
    const { result, err } = await getAllCategories();
    if (err) {
      toast.error('Failed to load categories');
      return;
    }
    setCategories(result);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const AddBrand = async (Data, onSuccess, onError) => {
    const Token = useToken();
    if (!Token) return;

    const response = await postBrand(Data, Token);
    const successText = Data.title + ' brand added successfully';
    await responseHandler(response, successText, onError, onSuccess);
  };

  const formAction = (event) => {
    event.preventDefault();
    if (!inputRef.current) return;

    const title = inputRef.current.value.trim();
    if (!title) {
      toast.error('Brand name cannot be empty');
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      return;
    }

    buttonRef.current.disabled = true;

    const onSuccess = () => {
      inputRef.current.value = '';
      setSelectedCategories([]);
      buttonRef.current.disabled = false;
    };

    const onError = () => {
      buttonRef.current.disabled = false;
    };

    // ارسال دسته‌بندی‌ها به شکل آرایه‌ای از آی‌دی‌ها
    const Data = { title, allowedCategories: selectedCategories.map(c => c._id) };
    AddBrand(Data, onSuccess, onError);
  };

  const addCategory = (category) => {
    if (!selectedCategories.some((c) => c._id === category._id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter(c => c._id !== categoryId));
  };

  return {
    formAction,
    categories,
    selectedCategories,
    addCategory,
    removeCategory,
    Refs: { inputRef, buttonRef },
  };
};

export default useAddBrand;
