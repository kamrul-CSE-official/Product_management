"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id?: number;
  _id?: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number | string;
  rating: number | string;
};

type Props = {
  children: React.ReactNode;
  fetchItems?: () => void;
};

export default function AddedProduct({ children, fetchItems }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    image: "",
    description: "",
    price: "",
    rating: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const newProduct: Product = {
      ...formData,
    };
    setFormData({
      name: "",
      category: "",
      image: "",
      description: "",
      price: 0,
      rating: 0,
    });
    const req = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!req.ok) {
      toast.error("Failed to add product");
      return;
    } else {
      toast.success("Product added successfully");
    }
    if (fetchItems) fetchItems();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            name="rating"
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={5}
            step={0.1}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
