import { useRecoilState } from "recoil";
import { cartTotalPrice } from "../store/cart";
import { TOTAL_PRICE } from "../constants/storageKEY";

const useCartTotalPrice = () => {
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalPrice);

  const setTotalPriceAndUpdateLocalStorage = (newValue: number) => {
    localStorage.setItem(TOTAL_PRICE, JSON.stringify(newValue));
    setTotalPrice(newValue);
  };

  return [totalPrice, setTotalPriceAndUpdateLocalStorage] as const;
};

export default useCartTotalPrice;
