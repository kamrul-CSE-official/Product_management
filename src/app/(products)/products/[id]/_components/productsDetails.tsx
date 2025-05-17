"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
};

function ProductsDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        
        if (!res.ok) {
          throw new Error("Product not found");
        }
        
        const data = await res.json();
        
        if (!data.data) {
          throw new Error("Product data not available");
        }
        
        setProduct(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-6">
        <p>Product not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 py-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="w-full h-[500px] relative rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
          priority
        />
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} / 5
        </p>
      </div>
    </div>
  );
}

export default ProductsDetail;