import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeState } from "../../../store/theme";
import { cartState } from "../../../store/cart";

const CartIcon = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [cart, setCart] = useRecoilState(cartState);

  const cartItemsCount = Object.keys(cart).length;

  return (
    <>
      <Link className="btn btn-ghost w-10 sm:w-12 ml-1" to={`/cart`}>
        <span className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${theme === "light" ? "stroke-gray-700" : "stroke-white"}`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
          <span className="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2">
            {cartItemsCount}
          </span>
        </span>
      </Link>
    </>
  );
};

export default CartIcon;
