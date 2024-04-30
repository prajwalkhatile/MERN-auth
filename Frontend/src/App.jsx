import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import { UserContextProvider } from "./context/UserContext";
import Register from "./pages/Register";
import Post from "./components/Post";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/post" element={<Post />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
