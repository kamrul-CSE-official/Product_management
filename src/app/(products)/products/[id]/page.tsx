import ProductsDetail from "./_components/productsDetails";
import ProductComments from "./_components/ProductComments";
import AddCommentForm from "./_components/AddCommentForm";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetails({ params }: ProductDetailsPageProps) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <ProductsDetail id={id} />

      {/* Client-side components */}
      <AddCommentForm productId={id} />
      <ProductComments productId={id} />
    </div>
  );
}
