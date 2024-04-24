import ProductsList from "../products/ProductsList";
import { Category } from "../../constants/category";
import useProductsLoadable from "../../CustomHook/useProductsLoadable";

const CategoryContainer = ({ category }: { category: string }): JSX.Element => {
  const productsLists = useProductsLoadable();
  const categoryList = productsLists.filter((IProduct) => {
    return Category[IProduct.category] === category;
  });

  const CATEGORY_VIEW_LIMIT = 4;

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{category}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll="true">
        <ProductsList products={categoryList} limit={CATEGORY_VIEW_LIMIT} />
      </div>
    </>
  );
};

export default CategoryContainer;
