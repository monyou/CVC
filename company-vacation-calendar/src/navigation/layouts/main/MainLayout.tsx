/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PrimeSmallButton,
  isSmallDevice,
  smallIconButton,
} from "../../../styles/common";
import { useHistory } from "react-router-dom";
import { selectUser, logoutUser } from "../../../redux/slices/user.slice";
import { ToastContainer } from "react-toastify";
import cvcLogo from "../../../assets/logos/calendar.png";
import { getUserFromToken } from "../../../utils/common";

const MainLayout: FC = ({ children }) => {
  const routeHistory = useHistory();
  const reduxUser = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      <section id="header">
        <div
          css={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 10px",
          }}
        >
          <div
            css={{
              marginRight: "auto",
              height: "100%",
            }}
          >
            <img
              css={{ width: "auto", height: "100%", verticalAlign: "middle" }}
              src={cvcLogo}
              alt="cvc_logo"
            />
            {isSmallDevice ? null : "Company Vacation Calendar"}
          </div>
          <div css={{ marginRight: "10px" }}>
            Hi, {reduxUser?.firstName || getUserFromToken()?.firstName}
          </div>
          <PrimeSmallButton
            css={{ ...smallIconButton }}
            icon="pi pi-sign-out"
            className="p-button-rounded"
            onClick={() => {
              dispatch(logoutUser());
              routeHistory.push("/login");
            }}
          />
        </div>
      </section>

      <section
        id="main"
        css={{
          padding: "10px",
        }}
      >
        {children}
      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

MainLayout.displayName = "MainLayout";
export default MainLayout;
