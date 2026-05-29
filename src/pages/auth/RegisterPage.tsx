import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import pilotoCarro from "../../assets/pilotocarro.jpg";

import "../../styles/auth.css";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import type { RegisterFormData } from "../../types/auth.types";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const { execute, isLoading } = useFetch<{ ok: boolean }>({
    url: "http://localhost:8000/api/auth/sign-up-session",
    method: "POST",
    contentType: "form-data",
    onSuccess: (data) => {
      if (data.ok) navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Registration error:", error);
      setError(error);
    },
  });

  const { formData, handleChange, handleSubmit, setFormData } = useForm(
    {
      username: "",
      email: "",
      locality: {
        zone_localicity: "",
        zone_city: "",
        zone_state: "",
        zone_country: "",
      },
      profile_photo: null,
      password: "",
    } as RegisterFormData,
    execute,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, profile_photo: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image-container">
          <img src={pilotoCarro} alt="Register Driver" className="auth-image" />
          <div className="auth-overlay" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="auth-content">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Enter your information to get started</p>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {/* PROFILE PHOTO */}
            <div className="auth-group">
              <label className="auth-label">Profile Photo</label>
              <div
                className="auth-photo-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="auth-photo-preview"
                  />
                ) : (
                  <div className="auth-photo-placeholder">
                    <span className="auth-photo-icon">📷</span>
                    <span>Upload photo</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* USERNAME */}
            <div className="auth-group">
              <label className="auth-label">Username</label>
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
              <label className="auth-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="auth-input"
              />
            </div>

            {/* LOCALITY — campos separados en grid */}
            <div className="auth-group">
              <label className="auth-label">Locality</label>
              <div className="auth-locality-grid">
                <input
                  type="text"
                  name="locality.zone_country"
                  value={formData.locality.zone_country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="auth-input"
                />
                <input
                  type="text"
                  name="locality.zone_state"
                  value={formData.locality.zone_state}
                  onChange={handleChange}
                  placeholder="State"
                  className="auth-input"
                />
                <input
                  type="text"
                  name="locality.zone_city"
                  value={formData.locality.zone_city}
                  onChange={handleChange}
                  placeholder="City"
                  className="auth-input"
                />
                <input
                  type="text"
                  name="locality.zone_localicity"
                  value={formData.locality.zone_localicity}
                  onChange={handleChange}
                  placeholder="Locality / Neighborhood"
                  className="auth-input"
                />
              </div>
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

            {/* ERROR */}
            {error && <p className="auth-result-error">{error}</p>}

            {/* ACTIONS */}
            <div className="auth-actions">
              <span className="auth-text">Start your racing journey</span>
              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                <MdOutlineDoubleArrow size={28} />
              </button>
            </div>

            {/* FOOTER */}
            <div className="auth-footer">
              <span className="auth-footer-text">Already have an account?</span>
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
