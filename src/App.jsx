import "./App.css";
import UserList from "./components/userList/UserList";
import UserDetails from "./components/userDetails/UserDetails";
import Navbar from "./components/navbar/Navbar";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/List" element={<UserList />} />
        <Route path="/Details" element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
