import React from "react";
import "./App.css";
import RootLayout from "./component/layout";
import { Route, Routes } from "react-router-dom";
import FileSplit from "./component/file-split";
import { Navigate } from "react-router-dom";
import FileByteSwap from "./component/file-byteswap";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/file-split" />}></Route>
        <Route path="/file-split" element={<FileSplit />}></Route>
        <Route path="/file-byteswap" element={<FileByteSwap />}></Route>
      </Routes>
    </RootLayout>
  );
}

export default App;
