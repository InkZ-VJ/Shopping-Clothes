import { createContext, useState, useEffect } from "react";

import {
  addCollectAndDocument,
  getCategoriesAndDocuMents,
} from "../utils/firebase/firbase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //* add to fireStore Database
  // useEffect(() => {
  //   addCollectAndDocument("categories", SHOP_DATA);
  // }, []);

  //*call database
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuMents();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
