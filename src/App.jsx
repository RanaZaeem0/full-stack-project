import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authServies from "./appwrite/auth";
import Header from "./compount/header/Header";
import Footer from './compount/footer/Footer'
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
const status = useSelector((status) => status.auth.userData)
  useEffect(()=>{
   if(status){
    navigator('/login')
   }else{
    navigator('/')
   }
  },[])

  
  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header/>
          <main>
       todo    {/* <Outlet/> */}
          </main>
        <Footer/>
        </div>

      </div>
    </>
  ) : (null);
}

export default App;
