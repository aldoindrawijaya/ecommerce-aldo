import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification() {
  let { token } = useParams();
  const navigate = useNavigate();

  const tokenVerification = async () => {
    const response = await axios.post(
      "http://localhost:8001/auth/verification",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      alert(response.data.message);
      navigate("/user/login");
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>your account is being verified</p>
      <p>{token}</p>
    </div>
  );
}

export default Verification;
