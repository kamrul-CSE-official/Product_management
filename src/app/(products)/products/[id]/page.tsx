"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
};

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        if (data?.success && data.data) {
          setProduct(data.data);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Failed to fetch product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-destructive">Product not found</h1>
        <p className="text-muted-foreground mt-2">No product matches ID: {id}</p>
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
