import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { themeState } from "../../../store/theme";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IProduct, productsList } from "../../../store/products";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../../../constants/constants";

const SearchBar = (): JSX.Element => {
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const [theme, setTheme] = useRecoilState(themeState);

  const [searchValue, setSearchValue] = useState("");
  const [filterItems, setFilterItems] = useState<IProduct[]>([]);
  const [clickActive, setClickActive] = useState<boolean>(false);
  const [invisible, setInvisible] = useState<boolean>(true);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    if (mounted && ProductsLoadable.state === "hasValue") {
      const filteredItems = filterProducts(ProductsLoadable.contents, searchValue);
      setFilterItems(filteredItems);
    }
    return (): void => {
      mounted = false;
    };
  }, [ProductsLoadable, searchValue]);

  const filterProducts = (products: IProduct[], searchValue: string): IProduct[] => {
    const filteredItems = products.filter((product) => {
      const productTitle = product.title.toLowerCase();
      return productTitle.includes(searchValue.toLowerCase());
    });
    return filteredItems;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const clickSearchIcon = () => {
    if (clickActive) {
      setClickActive(false);
      setInvisible(true);
      setSearchValue("");
    } else {
      setClickActive(true);
      setInvisible(false);
    }
  };
  const moveToProductPage = (id: number) => {
    navigate(`/product/${id}`);
  };
  const goSearchList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const $target = e.target as HTMLElement;
    const $next = $target.nextElementSibling as HTMLElement;
    if (CONSTANTS.KEY.ARROW_DOWN === e.key) {
      e.preventDefault();
      if (null === $next || null === $next.querySelector(".js-searchedItem")) return;
      ($next.querySelector(".js-searchedItem") as HTMLButtonElement).focus();
    } else if (CONSTANTS.KEY.ENTER === e.key) {
      e.preventDefault();
      $next && $next.click();
    }
  };
  const changeTarget = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const $target = e.target as HTMLElement;
    const $next = ($target.parentElement as HTMLLIElement).nextElementSibling as HTMLElement;
    if (CONSTANTS.KEY.ARROW_UP === e.key) {
      e.preventDefault();
      const $prev = ($target.parentElement as HTMLLIElement).previousElementSibling as HTMLElement;
      if (null === $prev || null === $prev.querySelector(".js-searchedItem")) {
        searchRef?.current?.focus();
      }
      ($prev?.querySelector(".js-searchedItem") as HTMLButtonElement)?.focus();
    } else if (CONSTANTS.KEY.ARROW_DOWN === e.key) {
      e.preventDefault();
      if (null === $next || null === $next.querySelector(".js-searchedItem")) return;
      ($next.querySelector(".js-searchedItem") as HTMLButtonElement).focus();
    } else if (CONSTANTS.KEY.ENTER === e.key) {
      e.preventDefault();
      $target && $target.click();
    }
  };

  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
          onClick={() => clickSearchIcon()}
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <input
          id="searchInput"
          type="text"
          placeholder="검색"
          className={`fixed left-0 top-4 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded ${
            theme === "light" ? "bg-gray-300 text-gray-800" : "bg-gray-600 text-white"
          } sm:transform-none transition-all js-searchInput ${!clickActive ? "-z-10" : null} ${
            clickActive ? "translate-y-full !opacity-100" : null
          }`}
          value={searchValue}
          onChange={(e) => handleChange(e)}
          onKeyDown={goSearchList}
          ref={searchRef}
        />
        {(searchValue.length > 0 || !invisible) && (
          <ul
            className={`!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden ${
              theme === "light" ? "bg-white" : "bg-gray-600"
            }`}
          >
            {filterItems.map((IProduct) => {
              return (
                <li key={IProduct.id}>
                  <button
                    type="button"
                    className="text-left js-searchedItem"
                    onClick={() => moveToProductPage(IProduct.id)}
                    onKeyDown={changeTarget}
                  >
                    <span className={`${theme === "light" ? "text-gray-600" : "text-white"} line-clamp-2`}>
                      {IProduct.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
