import { Link } from "react-router-dom";
import { toCurrencyFormat } from "../../helpers/helpers";
import type { IProduct } from "../../store/products";
import ProductsLoad from "./ProductsLoad";
import { useRecoilState } from "recoil";
import { themeState } from "../../store/theme";

const ProductsList = ({ products, limit }: { products: IProduct[]; limit: number }): JSX.Element => {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <>
      {0 < products.length ? (
        products.slice(0, limit).map((product: IProduct) => {
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={`group card card-bordered ${
                theme === "light" ? "border-gray-200" : "border-gray-800"
              } card-compact md:card-compact lg:card-normal rounded-b-none`}
            >
              <figure className="flex h-80 bg-white overflow-hidden">
                <img
                  src={product.image}
                  alt="상품 이미지"
                  className={`h-40 group-hover:scale-125 transition-transform duration-300`}
                />
              </figure>
              <div className={`card-body ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}>
                <p className="card-title text-base">{product.title}</p>
                <p className="text-base">{toCurrencyFormat(product.price)}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <ProductsLoad limit={limit} />
      )}
    </>
  );
};

export default ProductsList;
