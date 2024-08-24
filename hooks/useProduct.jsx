'use client';
import { useState } from 'react';
import defaultImage from '../public/images/default-image-product.svg';

export default function useProduct() {
    const [inputs, setInputs] = useState({
        name: '',
        category: '',
        categories: [],
        price: '',
        discountType: '-1',
        description: '',
        discount: '',
        finalPrice: 0,
    });

    const [productImages, setProductImages] = useState({
        image0: defaultImage,
        image1: defaultImage,
        image2: defaultImage,
        image3: defaultImage,
    });

    const [images, setImages] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const onChange = datas => {
        setInputs(prv => {
            return {
                ...prv,
                ...datas,
            };
        });
    };

    const formDataGenarator = () => {
        const formData = new FormData();
        formData.append('title', inputs.name);
        formData.append('description', inputs.description);
        formData.append('price', +inputs.price);
        formData.append('category', inputs.category);
        inputs.discount && formData.append('discount', +inputs.discount);
        if (images.length > 0) {
            console.log(images);
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i]);
            }
        }
        return formData;
    };

    return {
        inputs,
        onChange,
        productImages,
        setProductImages,
        images,
        setImages,
        editMode,
        setEditMode,
        formDataGenarator,
    };
}
