"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Delete, Edit, MoreVertical, Plus } from "lucide-react";
import AddedProduct from "./_components/addedProduct";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditProduct from "./_components/editProduct";

type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
};

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch products with filters and pagination
  const fetchItems = async (
    page = 1,
    category = "All",
    search = ""
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      if (category !== "All") params.append("category", category);
      if (search.trim() !== "") params.append("search", search.trim());

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Re-fetch products when page, category, or search term changes
  useEffect(() => {
    fetchItems(currentPage, selectedCategory, searchTerm);
  }, [currentPage, selectedCategory, searchTerm]);

  // Categories derived from products (to fill the category dropdown)
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, [products]);

  
  const filteredProducts = products;

  // Delete handler
  const handleDelete = async () => {
    if (productToDelete) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/products/${productToDelete._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Refresh products after delete
          // Reset page if products are empty on this page to avoid empty page
          if (products.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            fetchItems(currentPage, selectedCategory, searchTerm);
          }
          setProductToDelete(null);
        } else {
          const errorData = await res.json();
          console.error("Failed to delete:", errorData.message || errorData);
          alert("Failed to delete product. Please try again.");
        }
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete product. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product listings.
          </p>
        </div>
        <AddedProduct fetchItems={() => fetchItems(currentPage, selectedCategory, searchTerm)}>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </AddedProduct>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          className="sm:max-w-xs"
          type="search"
        />
        <Select
          value={selectedCategory}
          onValueChange={(val) => {
            setSelectedCategory(val);
            setCurrentPage(1); 
          }}
        >
          <SelectTrigger className="sm:w-[200px]">
            <SelectValue placeholder="Select category" />
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
      {filteredProducts.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No matching products found.
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative group border rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden"
            >
              <Link href={`/products/${product._id}`} className="block">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-medium text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-yellow-500">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm hidden group-hover:flex items-center justify-center gap-3 transition">
                <EditProduct
                  fetchItems={() => fetchItems(currentPage, selectedCategory, searchTerm)}
                  id={product._id}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </EditProduct>

                <AlertDialog
                  open={productToDelete?._id === product._id}
                  onOpenChange={(open) => {
                    if (!open) setProductToDelete(null);
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1"
                      onClick={() => setProductToDelete(product)}
                    >
                      <Delete className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this product?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setProductToDelete(null)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Confirm"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Link href={`/products/${product._id}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1"
                  >
                    <MoreVertical className="w-4 h-4" />
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}
