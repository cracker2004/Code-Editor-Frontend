import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/auth" element={<Auth />} />
          <Route path="/room/:roomId" element={<Room />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
