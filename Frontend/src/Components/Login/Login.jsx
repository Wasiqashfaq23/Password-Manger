import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import Navbar from "../Navbar";

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = ({ setCurrPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:8001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await res.json();
    if (result === "Login Successful") {
      setCurrPage("dashboard");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input {...register("email")} placeholder="Email" />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form-group">
              <input {...register("password")} type="password" placeholder="Password" />
              <p className="error">{errors.password?.message}</p>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-link">
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;