/** @jsxImportSource @emotion/react */
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { PrimeSmallButton as Button } from "../../../components/PrimeSmallButton";
import { LOGOUT_USER } from "../../../redux/CONSTANTS";
import {
  getToken,
  getUserFromToken,
  logout,
} from "../../../services/auth.service";
import { isSmallDevice } from "../../../styles/common";

function Header() {
  const store = useSelector((state) => ({ user: state.user }));
  const dispatch = useDispatch();

  return (
    <div
      css={{
        width: "100%",
        height: "50px",
        borderBottom: "1px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 10px",
      }}
    >
      <div
        css={{
          marginRight: "auto",
        }}
      >
        {isSmallDevice ? "CVC" : "Company Vacation Calendar"}
      </div>
      <div css={{ marginRight: "10px" }}>
        Hello, {store.user?.name || getUserFromToken(getToken())?.name}
      </div>
      <Button
        label={isSmallDevice ? "" : "Logout"}
        icon={isSmallDevice ? "pi pi-sign-out" : ""}
        className="p-button-secondary p-button-raised"
        onClick={() => {
          dispatch({ type: LOGOUT_USER });
          logout();
        }}
      />
    </div>
  );
}

export default connect()(Header);
export { Header };
