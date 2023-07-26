import React, {useEffect, useState} from "react";
import {Outlet, redirect} from "react-router-dom";
import AuthStatus from "../services/AuthStatus";

function Home() {
  //   const [jwt, setJwt] = useState("");
  //   useEffect(() => {
  //     const tokenFromLocalStorage = localStorage.getItem("jwt");
  //     setJwt(tokenFromLocalStorage ? tokenFromLocalStorage : "");
  //     console.log("jwt", jwt);

  //     if (!jwt) {
  //       return redirect("/login");
  //     }
  //   }, [jwt]);
  return (
    <>
      <div>
        <h1>My Super Cool App</h1>
        <AuthStatus></AuthStatus>
      </div>
      <div>
        {/* 2️⃣ Render the app routes via the Layout Outlet */}
        {/* <Outlet /> */}
      </div>
    </>
  );
}

export default Home;
