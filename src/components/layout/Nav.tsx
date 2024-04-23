import { Link } from "react-router-dom";
import { CategoryBtnList, MenuCategoryType } from "../../constants/category";
import DarkLightModeToggle from "./Theme/DarkLightModeToggle";
import { themeState } from "../../store/theme";
import { useRecoilState } from "recoil";
import CartIcon from "./NavItems/CartIcon";
import SideMenu from "./NavItems/SideMenu";
import SearchBar from "./NavItems/SearchBar";

// Nav 컴포넌트 with daisy
const Nav = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <div
      className={`fixed z-10 w-full navbar shadow-lg ${
        theme === "light" ? "bg-white" : "bg-base-300"
      } text-neutral-content`}
    >
      <div className="flex w-full xl:container xl:m-auto">
        <SideMenu />
        <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
          <Link
            to={`/`}
            className={`text-lg ${theme === "light" ? "text-gray-700" : "text-white"} font-bold whitespace-nowrap`}
          >
            React Shop
          </Link>
        </h1>
        <div className="flex-none hidden md:flex md:flex-1 ml-2">
          {CategoryBtnList.map((category: MenuCategoryType) => {
            return (
              <Link
                key={category.text}
                to={`${category.url}`}
                className={`btn btn-ghost btn-sm rounded-btn ${theme === "light" ? "text-gray-700" : "text-white"}`}
              >
                {category.text}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center px-2">
          <DarkLightModeToggle />
          <SearchBar />
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default Nav;
