import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import { Navbar, Sidebar } from "./components";
import Demo from "./components/Demo";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap">
        <div className="w-full md:w-[250px]">
          <Sidebar />
        </div>
        <div className="w-full md:w-auto">
          <Routes>
            <Route path="/" element={<Demo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
