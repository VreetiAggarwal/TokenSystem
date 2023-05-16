import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { socket } from "./socket";
import Patients from "./components/Patient";
import TokenGenerator from "./Token";

function App() {
  return (
    <div>
      {/* <Patients /> */}
      <Routes>
        <Route path="/" element={<Patients />}></Route>
        <Route path="/token" element={<TokenGenerator />}></Route>
      </Routes>
    </div>
  );
}

export default App;
