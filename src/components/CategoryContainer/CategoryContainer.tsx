import { useRecoilValue } from "recoil";
import ProductsList from "../products/ProductsList";
import { productsList } from "../../store/products";
import { Category } from "../../constants/category";

const CategoryContainer = ({ category }: { category: string }): JSX.Element => {
  const totalList = useRecoilValue(productsList);
  const categoryList = totalList.filter((IProduct) => {
    return Category[IProduct.category] === category;
  });

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{category}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll="true">
        <ProductsList products={categoryList} limit={4} />
      </div>
    </>
  );
};

export default CategoryContainer;
