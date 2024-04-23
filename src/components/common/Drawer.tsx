import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeState } from "../../store/theme";
import { CategoryBtnList, MenuCategoryType } from "../../constants/category";

const Drawer = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState(themeState);

  const closeDrawer = () => {
    document.getElementById("side-menu")?.click();
  };

  return (
    <div className="drawer-side z-20">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul
        className={`menu z-100 w-60 h-screen sm:w-80 p-4 overflow-y-auto ${
          theme === "light" ? "bg-white" : "bg-base-100"
        } text-base`}
      >
        {/* 모바일 메뉴를 노출시켜 보세요. */}
        {CategoryBtnList.map((category: MenuCategoryType) => {
          return (
            <li key={category.text}>
              <Link
                to={`${category.url}`}
                className={`${theme === "light" ? "!text-gray-700" : "!text-white"} active:!text-white px-4 py-3`}
                onClick={closeDrawer}
              >
                {category.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Drawer;
