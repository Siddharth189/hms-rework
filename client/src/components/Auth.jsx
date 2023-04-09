import Register from "./Register";
import Login from "./Login";

const Auth = () => {
  return (
    <div className="auth-page flex-row">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;
