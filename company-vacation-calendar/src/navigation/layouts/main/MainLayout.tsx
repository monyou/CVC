/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimeSmallButton, isSmallDevice } from "../../../styles/common";
import { getUserFromToken } from "../../../services/auth.service";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { selectUser, logoutUser } from "../../../redux/slices/user.slice";
import { ToastContainer } from "react-toastify";

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
            Hello, {reduxUser?.name || getUserFromToken()?.name}
          </div>
          <PrimeSmallButton
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
