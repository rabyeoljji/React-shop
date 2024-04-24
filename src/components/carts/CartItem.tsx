import { Link } from "react-router-dom";
import { IProduct } from "../../store/products";
import { useRecoilState } from "recoil";
import { ICartState, addCount, calcTotalPrice, cartState, removeFromCart } from "../../store/cart";
import { useEffect } from "react";
import useCartTotalPrice from "../../CustomHook/useCartTotalPrice";
import useProductsLoadable from "../../CustomHook/useProductsLoadable";

const CartItem = ({ cartItem }: { cartItem: IProduct }) => {
  const cartID = cartItem.id;

  const productsLists = useProductsLoadable();
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const [totalPrice, setTotalPriceAndUpdateLocalStorage] = useCartTotalPrice();

  const count = cart[cartID]?.count || 0;
  const itemPrice = cartItem.price * count;

  useEffect(() => {
    setTotalPriceAndUpdateLocalStorage(calcTotalPrice(cart, productsLists));
  }, [cart]);

  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };
  const addCountHandler = (id: string) => {
    setCart(addCount(cart, id));
  };

  if (!cart || cart[cartID] === undefined) {
    return null;
  }

  return (
    <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
      <Link to={`/product/${cartItem.id}`}>
        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
          <img src={cartItem.image} alt={cartItem.title} className="object-contain w-full h-48" />
        </figure>
      </Link>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          <Link to={`/product/${cartItem.id}`} className="link link-hover">
            {cartItem.title}
          </Link>
        </h2>
        <p className="mt-2 mb-4 text-3xl">
          ${itemPrice}
          <span className="text-2xl">{`($${cartItem?.price})`}</span>
        </p>
        <div className="card-actions">
          <div className="btn-group">
            <button
              className="btn btn-primary rounded-r-none"
              onClick={() => {
                removeFromCartHandler(`${cartItem.id}`);
              }}
            >
              -
            </button>
            <button className="btn btn-ghost no-animation rounded-none">{count}</button>
            <button
              className="btn btn-primary rounded-l-none"
              onClick={() => {
                addCountHandler(`${cartItem.id}`);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
