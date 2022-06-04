import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Watch from "./Components/Watch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch" element={<Watch />} />
    </Routes>
  );
}

export default App;
