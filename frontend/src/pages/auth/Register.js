import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const namer = formData.name;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("all fields are required");
    }
    if (password.length < 6) {
      return toast.error("password must be greater than 6 characters");
    }
    if (password !== cPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
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
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                name="name"
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                name="email"
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="password"
                required
                value={password}
                name="password"
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                name="cPassword"
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an Account? </p>
              <Link to="/Login">Login</Link>{" "}
            </span>
            <br />
          </div>
        </Card>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width={600} />
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || "...";

  return <span style={{ color: "#ff7722" }}>Hi, {username} |</span>;
};

export default Register;
