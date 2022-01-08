/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { PrimeSmallButton as Button, isSmallDevice } from "../styles/common";
import { getToken, getUserFromToken } from "../services/auth.service";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { selectUser, logoutUser } from "../redux/slices/user.slice";

function Header() {
  const routeHistory = useHistory();
  const reduxUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return (
    <section id="header">
      <div
        css={{
          width: "100%",
          height: "50px",
          border: "1px solid gray",
          borderRadius: "0 0 10px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 10px",
          backgroundColor: "#f8f9fa",
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
          Hello, {reduxUser?.name || getUserFromToken(getToken())?.name}
        </div>
        <Button
          label={isSmallDevice ? "" : "Logout"}
          icon={isSmallDevice ? "pi pi-sign-out" : ""}
          className="p-button-secondary p-button-raised"
          onClick={() => {
            dispatch(logoutUser());
            queryClient.clear();
            routeHistory.push("/login");
          }}
        />
      </div>
    </section>
  );
}

export { Header };
