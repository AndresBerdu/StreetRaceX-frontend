import { useState } from "react";

export const useForm = <T>(
  intialValues: T,
  onSubmit: (data: T) => Promise<void>,
) => {
  const [formData, setFormData] = useState<T>(intialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as Record<string, unknown>)[parent] as object,
          [child]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};
