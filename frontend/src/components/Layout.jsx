import React from "react";
import { BrowserRouter, Router, Route, Outlet, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Update from "./Update";
import Delete from "./Delete";
import Header from './Header&Footer/Header'
import Footer from './Header&Footer/Footer'

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen dark:bg-gray-800 text-white">
        <Header />
        <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-screen-xxl mx-auto w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
function Frame() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<Update />} />
          <Route path="/Delete" element={<Delete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Frame;
