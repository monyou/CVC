/** @jsxImportSource @emotion/react */
import { Header } from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <section id="header">
        <Header />
      </section>
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
