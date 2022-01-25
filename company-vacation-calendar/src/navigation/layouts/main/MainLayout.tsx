/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimeSmallButton, isSmallDevice } from "../../../styles/common";
import { getUserFromToken } from "../../../services/auth.service";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { selectUser, logoutUser } from "../../../redux/slices/user.slice";
import { ToastContainer } from "react-toastify";
import cvcLogo from "../../../assets/logos/calendar.png";

const MainLayout: React.FC = ({ children }) => {
  const routeHistory = useHistory();
  const reduxUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
            icon="pi pi-sign-out"
            className="p-button-raised"
            onClick={() => {
              dispatch(logoutUser());
              queryClient.clear();
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
