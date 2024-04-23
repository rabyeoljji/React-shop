import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Products from "../views/Products";
import Cart from "../views/Cart";
import Fashion from "../views/Fashion";
import Accessory from "../views/Accessory";
import Digital from "../views/Digital";
import { useRecoilValue } from "recoil";
import { productsList } from "../store/products";

const Router = (): JSX.Element => {
  const totalList = useRecoilValue(productsList);

  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      {totalList.map((IProduct) => {
        const id = IProduct.id;
        return <Route key={id} path={`/product/${id}`} element={<Products id={id} />} />;
      })}
      {/* <Route path="/product/:id" element={<Products />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/accessory" element={<Accessory />} />
      <Route path="/digital" element={<Digital />} />
    </Routes>
  );
};

export default memo(Router);
