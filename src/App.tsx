import Registration from "./components/registration";
import Login from "./components/login";
import Home from "./components/Home";
import Addclient from "./components/Addclient";
import AddTimeWork from "./components/AddTimeWork";
import { UserProvider } from "./components/UserContext";
import Navigation from "./components/Nav";
import FilterClientWork from "./components/FilterClientWork";


import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/home/:userid" element={<><Navigation /><Home /></>} />
            <Route path="/addclient" element={<><Navigation /><Addclient /></>} />
            <Route path="/addtimework" element={<><Navigation /><AddTimeWork /></>} />
            <Route path="/filter-client-work" element={<><Navigation /><FilterClientWork /></>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
