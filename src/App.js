import { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/sign-in/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { checkUserSession  } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
