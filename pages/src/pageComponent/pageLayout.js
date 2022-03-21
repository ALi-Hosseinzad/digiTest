import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

const PageLayout = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ minHeight: "calc(100vh - 2rem)" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default PageLayout;
