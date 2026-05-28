import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import carroCarrera from "../../assets/vehicles/carrocarrera.jpg";

import "../../styles/auth.css";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import type { LoginFormData } from "../../types/auth.types";
import { useAuthStore } from "../../stores/useAuthStore";
import type { User } from "../../types/user.type";

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { execute, isLoading } = useFetch<{ ok: boolean; data: User }>({
    url: "http://localhost:8000/api/auth/sign-in-session",
    method: "POST",
    contentType: "json",
    onSuccess: (response) => {
      if (response.ok) {
        login(response.data);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const { formData, handleChange, handleSubmit } = useForm(
    {
      username: "",
      password: "",
    } as LoginFormData,
    execute,
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image-container">
          <img src={carroCarrera} alt="Race Car" className="auth-image" />

          <div className="auth-overlay"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="auth-content">
          <h1 className="auth-title">Welcome To StreetRaceX</h1>

          <p className="auth-subtitle">Please enter your details to sign in</p>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();

              handleSubmit(event);
            }}
          >
            {/* EMAIL */}
            <div className="auth-group">
              <label className="auth-label">Email</label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                className="auth-input"
              />
            </div>

            {/* PASSWORD */}
            <div className="auth-group">
              <label className="auth-label">Password</label>

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
              <span className="auth-text">Continue your racing journey</span>

              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                <MdOutlineDoubleArrow size={36} />
              </button>
            </div>

            {/* DIVIDER */}
            <div className="auth-divider"></div>

            {/* FOOTER */}
            <div className="auth-footer">
              <span className="auth-footer-text">Don't have an account?</span>

              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
