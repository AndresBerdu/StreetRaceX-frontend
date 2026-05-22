import { useState } from "react";
import type { RegisterFormData } from "../types/auth.types";

const INITIAL_STATE: RegisterFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegisterForm = () => {
  const [formData, setFormData] =
    useState<RegisterFormData>(INITIAL_STATE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required");
      return false;
    }

    if (password.length < 6) {
      alert(
        "Password must contain at least 6 characters"
      );
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) return;

    console.log("REGISTER DATA:", formData);

    alert("Account created successfully");

    setFormData(INITIAL_STATE);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};