/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div css={{ textAlign: "center" }}>
      Error 404 Not Found <br />
      <Link to="/home">Go to Home</Link>
    </div>
  );
}

export { NotFoundPage };
