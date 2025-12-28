import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-100 p-4 rounded-xl">
        <h1 className="text-xl font-bold">Your Todos</h1>
      </div>
    </>
  );
}

export default App;
