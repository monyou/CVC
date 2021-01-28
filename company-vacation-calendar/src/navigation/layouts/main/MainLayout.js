/** @jsxImportSource @emotion/react */
import { Header } from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <section
        id="main"
        css={{
          padding: "10px",
        }}
      >
        {children}
      </section>
    </>
  );
}

export { MainLayout };
