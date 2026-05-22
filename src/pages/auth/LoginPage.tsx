import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

import { useLoginForm } from "../../hooks/useLoginForm";

import carroCarrera from "../../assets/vehicles/carrocarrera.jpg";

import "../../styles/auth.css";

export const LoginPage = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT IMAGE */}
        <div className="auth-image-container">
          <img
            src={carroCarrera}
            alt="Race Car"
            className="auth-image"
          />

          <div className="auth-overlay"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="auth-content">
          <h1 className="auth-title">
            Welcome To StreetRaceX
          </h1>

          <p className="auth-subtitle">
            Please enter your details to sign in
          </p>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();

              handleSubmit();
            }}
          >
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

            {/* ACTIONS */}
            <div className="auth-actions">
              <span className="auth-text">
                Continue your racing journey
              </span>

              <button
                type="submit"
                className="auth-button"
              >
                <MdOutlineDoubleArrow size={36} />
              </button>
            </div>

            {/* DIVIDER */}
            <div className="auth-divider"></div>

            {/* FOOTER */}
            <div className="auth-footer">
              <span className="auth-footer-text">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="auth-link"
              >
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};