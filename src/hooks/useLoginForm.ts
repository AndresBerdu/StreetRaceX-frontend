import { useState } from "react";

import { useNavigate } from "react-router-dom";

import type { LoginFormData } from "../types/auth.types";

import { useAuth } from "../context/AuthContext";

const INITIAL_STATE: LoginFormData = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const [formData, setFormData] =
    useState<LoginFormData>(INITIAL_STATE);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { email, password } = formData;

    if (!email || !password) {
      alert("All fields are required");

      return;
    }

    login(email);

    navigate("/dashboard");
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};