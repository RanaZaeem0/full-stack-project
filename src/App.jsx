import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServies from "./appwrite/auth";
import Header from "./compount/header/Header";
import Footer from './compount/footer/Footer'
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
     .finally(()=> setLoading(false))
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
