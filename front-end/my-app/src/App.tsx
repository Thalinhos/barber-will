import { Route, BrowserRouter, Routes } from "react-router";
import Home from './pages/home/Home';
import SignUpPage from "./pages/signup/SignUpPage";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<SignUpPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </BrowserRouter>    
    </>
  )
}

export default App
