
"use client"; 

import { useState, useEffect } from 'react';
import BrandBox from '@/components/Boxes/BrandBox/BrandBox';
import Link from 'next/link';

const BrandsList = ({ brands, searchParams }) => {
  const [search, setSearch] = useState(searchParams.search || '');
  const [filteredBrands, setFilteredBrands] = useState(brands);

  useEffect(() => {
    if (search) {
      // filtering brands by search
      const filtered = brands.filter((brand) =>
        brand.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBrands(filtered);
    } else {
      setFilteredBrands(brands);
    }
  }, [search, brands]);

  const renderBrands = (data) => {
    return data.map((brand) => (
      <BrandBox
        key={brand._id}
        id={brand._id}
        title={brand.title}
        categories={brand.allowedCategories || []}
      />
    ));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search brands..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-md mb-4"
      />
      <div className="flex flex-col gap-2 425:gap-2.5 sm:gap-3 896:gap-3.5">
        {filteredBrands.length ? (
          renderBrands(filteredBrands)
        ) : (
          <div className="text-[110%]">
            <p>
              No results found for ‘
              <span className="text-black">{search}</span>’.
            </p>
            <p>Try searching with a different name.</p>
            <p>
              Or click{' '}
              <Link
                className="font-bold underline underline-offset-auto hover:no-underline text-blue-600"
                href="/dashboard/brands"
              >
                here
              </Link>{' '}
              to reset the search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsList;
