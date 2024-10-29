import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("all fields are required");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width={600} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't have an Account?</p>
              <Link to="/register">Register</Link>{" "}
            </span>
            <br />
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
