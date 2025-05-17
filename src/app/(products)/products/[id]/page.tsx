// page.tsx
import React from "react";
import ProductsDetail from "./_components/productsDetails";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <div>{id && <ProductsDetail id={id} />}</div>;
}
