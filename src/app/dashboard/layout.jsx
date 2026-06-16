import React from "react";
import { DashBoardSideBar } from "../../components/dashboard/DashBoardSideBar";
import { Toast } from "@heroui/react";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashBoardSideBar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
      <Toast.Provider placement="top" />
    </div>
  );
};

export default DashBoardLayout;
