import { useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";
import { useAuthStore } from "../../stores/useAuthStore";
import type { Vehicle } from "../../types/vehicle.type";
import "../../styles/modals/addVehicleComponent.css";

type VehicleFormData = {
  vehicle_type: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  plate: string | null;
  modifications: string;
  photo: File | null;
};

type AddVehicleProps = {
  vehicle?: Vehicle; // si viene → modo edición
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const AddVehicleComponent = ({
  vehicle,
  onSuccess,
  onCancel,
}: AddVehicleProps) => {
  const user = useAuthStore((state) => state.user);
  const isEditing = !!vehicle;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(vehicle?.photo ?? null);

  const { execute, isLoading, error } = useFetch<{ ok: boolean }>({
    url: isEditing
      ? `http://localhost:8000/api/users/${user?.slug}/vehicles/${vehicle.slug}`
      : `http://localhost:8000/api/users/${user?.slug}/vehicles`,
    method: isEditing ? "PATCH" : "POST",
    contentType: "form-data",
    onSuccess: (data) => {
      if (data.ok) onSuccess?.();
    },
  });

  const { formData, handleChange, handleSubmit, setFormData } =
    useForm<VehicleFormData>(
      {
        vehicle_type: vehicle?.vehicle_type ?? "",
        brand: vehicle?.brand ?? "",
        model: vehicle?.model ?? "",
        year: vehicle?.year?.toString() ?? "",
        color: vehicle?.color ?? "#f97316",
        plate: vehicle?.plate ?? null,
        modifications: vehicle?.modifications ?? "",
        photo: null,
      },
      execute,
    );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, photo: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const isSkate = formData.vehicle_type === "skate_board";

  return (
    <div className="av-overlay">
      <div className="av-panel">
        {/* Header */}
        <div className="av-header">
          <div className="av-header-text">
            <span className="av-label">
              {isEditing ? "EDIT VEHICLE" : "NEW VEHICLE"}
            </span>
            <h2 className="av-title">
              {isEditing ? "Update Details" : "Add to Garage"}
            </h2>
          </div>
          <button className="av-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form className="av-form" onSubmit={handleSubmit}>
          {/* Photo upload */}
          <div
            className="av-photo-drop"
            onClick={() => fileInputRef.current?.click()}
            style={preview ? { backgroundImage: `url(${preview})` } : {}}
          >
            {!preview && (
              <div className="av-photo-placeholder">
                <span className="av-photo-icon">📷</span>
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

          {/* Vehicle type */}
          <div className="av-field">
            <label className="av-field-label">Vehicle Type</label>
            <div className="av-type-grid">
              {["car", "motorcycle", "skate_board"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`av-type-btn ${formData.vehicle_type === type ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      vehicle_type: type,
                      plate: type === "skate_board" ? null : prev.plate,
                    }))
                  }
                >
                  {type === "car"
                    ? "🚗 Car"
                    : type === "motorcycle"
                      ? "🏍 Moto"
                      : "🛹 Skate"}
                </button>
              ))}
            </div>
          </div>

          {/* Brand & Model */}
          <div className="av-row">
            <div className="av-field">
              <label className="av-field-label">Brand</label>
              <input
                className="av-input"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Toyota"
              />
            </div>
            <div className="av-field">
              <label className="av-field-label">Model</label>
              <input
                className="av-input"
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. AE86"
              />
            </div>
          </div>

          {/* Year & Color */}
          <div className="av-row">
            <div className="av-field">
              <label className="av-field-label">Year</label>
              <input
                className="av-input"
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max="2099"
              />
            </div>
            <div className="av-field">
              <label className="av-field-label">Color</label>
              <div className="av-color-row">
                <input
                  className="av-color-picker"
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
                <span className="av-color-value">{formData.color}</span>
              </div>
            </div>
          </div>

          {/* Plate */}
          {!isSkate && (
            <div className="av-field">
              <label className="av-field-label">Plate</label>
              <input
                className="av-input av-plate"
                type="text"
                name="plate"
                value={formData.plate ?? ""}
                onChange={handleChange}
                placeholder="ABC-1234"
                maxLength={10}
              />
            </div>
          )}

          {/* Modifications */}
          <div className="av-field">
            <label className="av-field-label">
              Modifications <span className="av-optional">(optional)</span>
            </label>
            <input
              className="av-input"
              type="text"
              name="modifications"
              value={formData.modifications}
              onChange={handleChange}
              placeholder="e.g. Turbo, NOS, coilovers..."
            />
          </div>

          {error && <p className="av-error">{error}</p>}

          {/* Actions */}
          <div className="av-actions">
            <button type="button" className="av-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="av-btn-submit"
              disabled={isLoading}
            >
              {isLoading
                ? isEditing
                  ? "Saving..."
                  : "Adding..."
                : isEditing
                  ? "Save Changes"
                  : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
