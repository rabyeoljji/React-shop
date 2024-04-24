import { useCallback } from "react";
import CONSTANTS from "../../../constants/constants";

// 키보드로 검색리스트 focus하는 기능 - 미완성
const goSearchList = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
  const $target = e.target as HTMLElement;
  const $next = $target.nextElementSibling as HTMLElement;
  if (CONSTANTS.KEY.ARROW_DOWN === e.key) {
    e.preventDefault();
    if (null === $next) return;
  }
}, []);
