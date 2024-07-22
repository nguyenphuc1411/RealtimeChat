import Register from "./components/Register"
import Login from "./components/Login"
import Chat from "./components/Chat"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ForgotPassword from "./components/Users/ForgotPassword"
import ChangePassword from "./components/Users/ChangePassword"
import SendEmailSuccess from "./components/Users/SendMailSuccess"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/sendmailsuccess" element={<SendEmailSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
