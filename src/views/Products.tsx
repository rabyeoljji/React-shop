import ProductsView from "../components/products/ProductsView";

const Products = ({ id }: { id: number }) => {
  return (
    <>
      <ProductsView id={id} />
    </>
  );
};

export default Products;
