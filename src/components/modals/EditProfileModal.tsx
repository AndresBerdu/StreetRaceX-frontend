import { useEffect, useRef } from "react";
import "../../styles/modals/editProfile.css";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import defaultImage from "../../assets/perfils/defaultImage.jpg";

type ProfileForm = {
  username: string;
  profile_photo: File | null;
  locality: {
    zone_localicity: string;
    zone_city: string;
    zone_state: string;
    zone_country: string;
  };
};

type Props = {
  onClose: () => void;
};

export const EditProfileModal = ({ onClose }: Props) => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const overlayRef = useRef<HTMLDivElement>(null);

  const initialValues: ProfileForm = {
    username: user?.username ?? "",
    profile_photo: null,
    locality: {
      zone_localicity: user?.locality?.zone_localicity ?? "",
      zone_city: user?.locality?.zone_city ?? "",
      zone_state: user?.locality?.zone_state ?? "",
      zone_country: user?.locality?.zone_country ?? "",
    },
  };

  const { execute, isLoading, error } = useFetch<{ data: typeof user }>({
    url: `http://localhost:8000/api/users/${user?.slug}`,
    method: "PATCH",
    contentType: "form-data",
    onSuccess: (result) => {
      updateUser(result.data);
      onClose();
    },
  });

  const { formData, setFormData, handleChange } = useForm<ProfileForm>(
    initialValues,
    async (data) => {
      await execute(data);
    },
  );

  // Sync si el user cambia externamente
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        profile_photo: null,
        locality: {
          zone_localicity: user.locality?.zone_localicity ?? "",
          zone_city: user.locality?.zone_city ?? "",
          zone_state: user.locality?.zone_state ?? "",
          zone_country: user.locality?.zone_country ?? "",
        },
      });
    }
  }, [user]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profile_photo: file }));
  };

  const handleSave = async () => {
    const payload: Partial<ProfileForm> = {};

    if (formData.username && formData.username !== user?.username) {
      payload.username = formData.username;
    }

    payload.locality = formData.locality;

    if (formData.profile_photo) {
      payload.profile_photo = formData.profile_photo;
    }

    await execute(payload);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const photoPreview = formData.profile_photo
    ? URL.createObjectURL(formData.profile_photo)
    : (user?.profile_photo ?? defaultImage);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="edit-profile-overlay"
    >
      <div className="edit-profile-modal">
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <button onClick={onClose} className="edit-profile-close">
            ✕
          </button>
        </div>

        {/* Avatar */}
        <div className="edit-profile-avatar">
          <div style={{ position: "relative" }}>
            <img src={photoPreview} alt="Avatar" />
            <label>
              📷
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <span>Click the icon to change your photo</span>
        </div>

        {/* Username */}
        <div>
          <label className="edit-profile-label">Username</label>
          <input
            className="profile-edit-input"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>

        {/* Locality */}
        <div>
          <label className="edit-profile-label">Location</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
            }}
          >
            <input
              className="profile-edit-input"
              name="locality.zone_localicity"
              placeholder="Localidad"
              value={formData.locality.zone_localicity}
              onChange={handleChange}
            />
            <input
              className="profile-edit-input"
              name="locality.zone_city"
              placeholder="Ciudad"
              value={formData.locality.zone_city}
              onChange={handleChange}
            />
            <input
              className="profile-edit-input"
              name="locality.zone_state"
              placeholder="Departamento"
              value={formData.locality.zone_state}
              onChange={handleChange}
            />
            <input
              className="profile-edit-input"
              name="locality.zone_country"
              placeholder="País"
              value={formData.locality.zone_country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ERROR */}
        {error && <p className="auth-result-error">{error}</p>}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="profile-button"
            style={{ background: "#1e293b" }}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="profile-button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
