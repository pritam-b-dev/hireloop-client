import React from "react";
import { DashBoardSideBar } from "../../components/dashboard/DashBoardSideBar";
import { Toast } from "@heroui/react";
import NavBar from "../../components/NavBar";

const DashBoardLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen mt-15">
        <DashBoardSideBar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
        <Toast.Provider placement="top" />
      </div>
    </>
  );
};

export default DashBoardLayout;
