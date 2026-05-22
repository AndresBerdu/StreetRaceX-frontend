import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../hooks/useRegisterForm";

import pilotoCarro from "../../assets/pilotocarro.jpg";

import "../../styles/auth.css";

export const RegisterPage = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT IMAGE */}
        <div className="auth-image-container">
          <img
            src={pilotoCarro}
            alt="Register Driver"
            className="auth-image"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="auth-content">
          <h1 className="auth-title">
            Create Account
          </h1>

          <p className="auth-subtitle">
            Enter your information to get started
          </p>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            {/* USERNAME */}
            <div className="auth-group">
              <label className="auth-label">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                className="auth-input"
              />
            </div>

            {/* EMAIL */}
            <div className="auth-group">
              <label className="auth-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="auth-input"
              />
            </div>

            {/* PASSWORD */}
            <div className="auth-group">
              <label className="auth-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="auth-input"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="auth-group">
              <label className="auth-label">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="auth-input"
              />
            </div>

            {/* ACTIONS */}
            <div className="auth-actions">
              <span className="auth-text">
                Start your racing journey
              </span>

              <button
                type="submit"
                className="auth-button"
              >
                <MdOutlineDoubleArrow size={28} />
              </button>
            </div>

            {/* FOOTER */}
            <div className="auth-footer">
              <span className="auth-footer-text">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="auth-link"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};