/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { ToastContainer } from "react-toastify";

const CustomLayout: FC = ({ children }) => {
  return (
    <>
      {children}

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

CustomLayout.displayName = "CustomLayout";
export default CustomLayout;
