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

    const onChange = datas => {
        setInputs(prv => {
            return {
                ...prv,
                ...datas,
            };
        });
    };

    return {
        inputs,
        onChange,
        productImages,
        setProductImages,
        images,
        setImages,
    };
}
