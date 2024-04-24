import ProductsList from "./ProductsList";
import { Category } from "../../constants/category";
import useProductsLoadable from "../../CustomHook/useProductsLoadable";

const ItemList = ({ category }: { category: string }) => {
  const productsLists = useProductsLoadable();
  const categoryList = productsLists.filter((IProduct) => {
    return Category[IProduct.category] === category;
  });

  return (
    <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{category}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll="false">
        <ProductsList products={categoryList} limit={Infinity} />
      </div>
    </article>
  );
};

export default ItemList;
