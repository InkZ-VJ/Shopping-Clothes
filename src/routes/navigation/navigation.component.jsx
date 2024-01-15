import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwLogo } from "../../assets/crown.svg";


import { signOutUser } from "../../utils/firebase/firbase.utils";

import {
  NavigationContainer,
  NavLinks,
  LogoContainer,
  Navlink,
} from "./navigation.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen  = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <Navlink to='/shop'>SHOP</Navlink>

          {currentUser ? (
            <Navlink as='span' onClick={signOutUser}>
              SIGN OUT
            </Navlink>
          ) : (
            <Navlink to='/auth'>SIGN IN</Navlink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
