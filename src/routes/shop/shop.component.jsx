import { Route, Routes } from "react-router-dom";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.componet";
import Category from "../category/category.component";
import { useEffect } from "react";
import { getCategoriesAndDocuMents } from "../../utils/firebase/firbase.utils";
import { setCategories } from "../../store/categories/categories.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuMents();

      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
