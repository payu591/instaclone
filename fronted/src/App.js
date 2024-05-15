import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Chatpanel from "./feature/Chat/components/Chatpanel";
import Register from "./feature/auth/components/Register";
import Login from "./feature/auth/components/Login";
import Protected from "./feature/auth/components/Protected";
import Search from "./feature/Search/components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Protected><Home/></Protected>} />
        <Route path="/register" element={<Register/>}  />
        <Route path="/login" element={<Login/>} />
        <Route path="/chat" element={<Protected><Chat/></Protected>} />
        <Route path="/chat/:chatId" element={<Protected><Chatpanel/></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
