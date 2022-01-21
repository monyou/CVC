/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/logos/404.jpg";
import { primaryColor } from "../styles/colors";

function NotFoundPage() {
  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0c0c0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "column nowrap",
      }}
    >
      <img css={{ marginBottom: 80 }} src={NotFoundImage} alt="404_image" />
      <div css={{ color: "white", fontSize: 50, marginBottom: 10 }}>404</div>
      <div css={{ color: "gray", fontSize: 20, marginBottom: 40 }}>
        Got lost? How? Why? ahhh...
      </div>
      <Link
        to="/"
        css={{
          textDecoration: "none",
          borderRadius: 5,
          border: `1px solid ${primaryColor}`,
          color: primaryColor,
          letterSpacing: 5,
          cursor: "pointer",
          padding: 15,
          boxShadow: `0 0 10px ${primaryColor}`,
          transition: ".3s all",

          "&:hover, &:focus": {
            boxShadow: `0 0 30px ${primaryColor}`,
          },
        }}
      >
        TAKE ME HOME
      </Link>
    </div>
  );
}

export default NotFoundPage;
