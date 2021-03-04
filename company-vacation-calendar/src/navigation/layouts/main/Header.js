/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { PrimeSmallButton as Button } from "../../../styles/common";
import { getToken, getUserFromToken } from "../../../services/auth.service";
import { logoutUserAction } from "../../../redux/actions/user.action";
import { isSmallDevice } from "../../../styles/common";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";

function Header() {
  const routeHistory = useHistory();
  const store = useSelector((state) => ({ user: state.user }));
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
          Hello, {store.user?.name || getUserFromToken(getToken())?.name}
        </div>
        <Button
          label={isSmallDevice ? "" : "Logout"}
          icon={isSmallDevice ? "pi pi-sign-out" : ""}
          className="p-button-secondary p-button-raised"
          onClick={() => {
            dispatch(logoutUserAction());
            queryClient.clear();
            routeHistory.push("/login");
          }}
        />
      </div>
    </section>
  );
}

export { Header };
