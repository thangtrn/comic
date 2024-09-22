import React from "react";
import Header from "~/components/layout/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
