import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
  const isAuthenticated = localStorage.getItem("accessToken");
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };
  const getGoogleAuthUrl = () => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const query = {
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      prompt: "consent",
      access_type: "offline",
    };
    return `${url}?${new URLSearchParams(query)}`;
  };
  const googleAuthUrl = getGoogleAuthUrl();
  return (
    <>
      <div>
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div>
        <video controls width={500}>
          <source
            src="http://localhost:4000/static/video-stream/9997cecced5aff7a874133400.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <h1>Google OAuth 2.0</h1>

      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>Hello, you are logged in</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  );
}
