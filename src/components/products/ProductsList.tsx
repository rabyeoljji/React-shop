// products.length가 있으면(데이터를 가져왔으면)
// products 배열(products[])과 한 번에 보여줄 아이템 개수(limit)를 받아
// Link로 걸어 아이템 카드를 만들고,
// 아니면 ProductsLoad = 스켈레톤(로딩 중 레이아웃만 보여주는 화면)을 노출한다

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
              } card-compact lg:card-normal rounded-b-none`}
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
