import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/userList/UserList";
import UserDetails from "./components/userDetails/UserDetails";
import Navbar from "./components/navbar/Navbar";

function App() {
  const userDetailsRef = useRef(null); // Referencia para almacenar los datos del usuario seleccionado

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<UserList userDetailsRef={userDetailsRef} />}
        />
        <Route
          path="/Details"
          element={<UserDetails userDetailsRef={userDetailsRef} />}
        />
      </Routes>
    </>
  );
}

export default App;