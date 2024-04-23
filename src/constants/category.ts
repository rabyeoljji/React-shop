/**
 * const assertion으로 여러분이 자주 사용하는 카테고리 등을 정의하고 사용 해보세요.
 */
export const Category: { [key: string]: string } = {
  "men's clothing": "패션",
  "women's clothing": "패션",
  electronics: "디지털",
  jewelery: "액세서리",
} as const;

export const MENUS = {
  HOME: "홈",
  FASHION: "패션",
  ACCESSORY: "액세서리",
  DIGITAL: "디지털",
} as const;

type categoryType = (typeof Category)[keyof typeof Category];

export interface MenuCategoryType {
  text: string;
  url: string;
}

export const CategoryBtnList = [
  {
    text: "패션",
    url: "/fashion",
  },
  {
    text: "액세서리",
    url: "/accessory",
  },
  {
    text: "디지털",
    url: "/digital",
  },
];
