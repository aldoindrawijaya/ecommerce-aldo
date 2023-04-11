import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const userGlobal = useSelector((state) => state.user.user);
  return (
    <div>
      <p>HOME</p>
    </div>
  );
}

export default Home;
