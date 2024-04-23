import { useRecoilState } from "recoil";
import { themeState } from "../../../store/theme";

const SideMenu = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <>
      <input id="side-menu" type="checkbox" className="drawer-toggle" />
      <label htmlFor="side-menu" className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={`inline-block w-6 h-6 ${theme === "light" ? "stroke-gray-700" : "stroke-current"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </>
  );
};

export default SideMenu;
