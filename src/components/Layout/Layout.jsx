import React from "react";
import { AppFooter } from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import AppNavbar from "./Navbar/Navbar";

export default function Layout() {
  return (
    <main className="dark:bg-gray-900 dark:text-gray-100 ">
      <AppNavbar />

      <div className="min-h-screen">
        <Outlet />
      </div>

      <AppFooter />
    </main>
  );
}
