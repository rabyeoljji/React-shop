import { ICartState, cartState } from "../../store/cart";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useEffect, useState } from "react";
import { productsList } from "../../store/products";
import CartItem from "./CartItem";

const CartList = (): JSX.Element => {
  const productsData = useRecoilValueLoadable(productsList);
  const productsLists = productsData.state === "hasValue" ? productsData.contents : [];
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const [cartIdArr, setCartIdArr] = useState<string[]>([]);

  useEffect(() => {
    setCartIdArr(() => Object.keys(cart));
  }, [cart]);

  return (
    <div className="lg:flex justify-between mb-20">
      <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
        {cartIdArr.map((cartId: number | string) => {
          const cartItem = productsLists.find((IProduct) => {
            return IProduct.id == cartId;
          });
          return cartItem && <CartItem key={cartItem!.id} cartItem={cartItem} />;
        })}
      </div>
    </div>
  );
};

export default CartList;
