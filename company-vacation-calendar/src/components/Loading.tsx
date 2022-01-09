/** @jsxImportSource @emotion/react */
import { centerDivOnScreen } from "../styles/common";
import { backgroundSoloPage } from "../styles/colors";

function Loading() {
  return (
    <div
      css={{
        backgroundColor: backgroundSoloPage,
        height: "100vh",
      }}
    >
      <h1
        css={{
          color: "white",
          position: "absolute",
          ...centerDivOnScreen,
        }}
      >
        Loading ...
      </h1>
    </div>
  );
}

export default Loading;
