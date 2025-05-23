
import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getFeaturedProducts } from '@/services/productService';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [filterParams, setFilterParams] = useState({
    category: null,
    priceMin: null,
    priceMax: null,
    searchQuery: null,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    pageSize: 12
  });

  // Get products with filters
  const { 
    data: productData,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['products', filterParams],
    queryFn: () => getProducts(filterParams),
    keepPreviousData: true
  });

  // Get featured products
  const { 
    data: featuredData,
    isLoading: isFeaturedLoading,
    error: featuredError
  } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => getFeaturedProducts(4)
  });

  // Update filters
  const updateFilters = (newFilters) => {
    setFilterParams(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const value = {
    products: productData?.products || [],
    lastVisible: productData?.lastVisible,
    hasMore: productData?.hasMore,
    featuredProducts: featuredData || [],
    isProductsLoading,
    isFeaturedLoading,
    productsError,
    featuredError,
    filterParams,
    updateFilters,
    refetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
