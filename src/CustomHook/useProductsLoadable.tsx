import { useRecoilValueLoadable } from "recoil";
import { productsList } from "../store/products";

// 나중에 다른 상태처리 로직이 필요할 일이 있을 수도 있다고 생각해서 커스텀훅으로 분리해봤습니다.
const useProductsLoadable = () => {
  const productsData = useRecoilValueLoadable(productsList);
  const productsLists = productsData.state === "hasValue" ? productsData.contents : [];
  return productsLists;
};

export default useProductsLoadable;
