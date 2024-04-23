import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import CartList from "./CartList";
import { useRecoilState } from "recoil";
import { ICartState, cartState, cartTotalPrice } from "../../store/cart";

const CartView = (): JSX.Element => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const [totalPrice, setTotalPrice] = useRecoilState<number>(cartTotalPrice);
  const isCartEmpty = Object.keys(cart).length === 0;

  let viewTotalPrice = isCartEmpty ? 0 : totalPrice.toFixed(2);

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {!isCartEmpty ? (
          <CartList />
        ) : (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        )}
        {/* 구매하기 버튼 등 화면을 구성 해보세요. */}
        <div className="self-start shrink-0 flex items-center mt-10 mb-20">
          <span className="text-xl md:text-2xl">총 : ${viewTotalPrice}</span>
          <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
            구매하기
          </label>
        </div>
      </div>
      <Confirm />
    </section>
  );
};

export default CartView;
