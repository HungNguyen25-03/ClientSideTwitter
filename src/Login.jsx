import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const new_user = params.get("new_user");
    const verify = params.get("verify");

    console.log({ accessToken, refreshToken, new_user, verify });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  }, [params]);
  return <div>Login</div>;
}
