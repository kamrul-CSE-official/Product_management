"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const itemsPerPage = 6;

type Product = {
  id: number;
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = async (page: number, category: string, search: string) => {
    try {
      const url = new URL("/api/products", window.location.origin);
      url.searchParams.append("page", String(page));
      if (category && category !== "All") {
        url.searchParams.append("category", category);
      }
      if (search.trim() !== "") {
        url.searchParams.append("search", search.trim());
      }

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }
      const data = await res.json();

      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // Refetch when page, category or search changes
  useEffect(() => {
    fetchItems(currentPage, selectedCategory, searchTerm);
  }, [currentPage, selectedCategory, searchTerm]);

  // Dynamically generate categories from products + "All"
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats];
  }, [products]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <main className="py-12 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-xs"
        />

        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <Card className="overflow-hidden cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                  width={400}
                  height={400}
                />
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-black">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Description:</span>{" "}
                    {product.description}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Price:</span> $
                    {product.price.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Rating:</span>{" "}
                    {product.rating} / 5
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Prev
        </Button>
        <span className="text-sm font-medium mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </main>
  );
}

export default ProductsPage;
