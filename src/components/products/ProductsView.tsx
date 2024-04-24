import { useRecoilState } from "recoil";
import { Category } from "../../constants/category";
import BreadCrumb from "../common/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import { ICartState, addToCart, calcTotalPrice, cartState } from "../../store/cart";
import ProductsViewLoad from "./ProductsViewLoad";
import Rating from "../common/Rating";
import { useEffect } from "react";
import useProductsLoadable from "../../CustomHook/useProductsLoadable";
import useCartTotalPrice from "../../CustomHook/useCartTotalPrice";

const ProductsView = () => {
  const { id } = useParams();
  const id_Num = Number(id);
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const [totalPrice, setTotalPriceAndUpdateLocalStorage] = useCartTotalPrice();
  const productsLists = useProductsLoadable();

  const Item = productsLists.find((IProduct) => {
    return IProduct.id === id_Num;
  });
  const categoryStr = Item ? Item.category : "error : 제품을 찾을 수 없습니다";
  const CATEGORY = Category[categoryStr];
  const COUNT = Item?.rating.count ? Item.rating.count : 0;

  useEffect(() => {
    setTotalPriceAndUpdateLocalStorage(calcTotalPrice(cart, productsLists));
  }, [cart]);

  const addCart = (id: number) => {
    setCart(addToCart(cart.items || cart, id));
  };

  return (
    <>
      {Item ? (
        <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          <div>
            <BreadCrumb category={CATEGORY} crumb={Item?.title} />
          </div>
          <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
            <figure className="flex-shrink-0 h-80 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
              <img src={Item?.image} alt={Item?.title} className="object-contain w-full h-72"></img>
            </figure>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                {Item?.title}
                {COUNT < 100 && <span className="badge badge-accent ml-2">NEW</span>}
              </h2>
              <p>{Item?.description}</p>
              <Rating rate={Item.rating.rate} count={Item.rating.count} />
              <p className="mt-2 mb-4 text-3xl">${Item?.price}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => addCart(id_Num)}>
                  장바구니에 담기
                </button>
                <Link to={"/cart"} className="btn btn-outline ml-1">
                  장바구니로 이동
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <ProductsViewLoad />
      )}
    </>
  );
};

export default ProductsView;
