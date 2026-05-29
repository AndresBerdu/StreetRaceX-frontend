import type { ChallengeForm } from "../../types/challengeForm.type";

type Driver = {
  id: string;
  slug: string;
  username: string;
  rank: string;
  victories: number;
  defeats: number;
  profile_photo?: string;
};

type Props = {
  driver: Driver;
  formData: ChallengeForm;
  setFormData: (data: ChallengeForm) => void;
  onClose: () => void;
  onSubmit: () => void;
  error?: string;
  sending: boolean;
};

export const ChallengeModal = ({
  driver,
  formData,
  setFormData,
  onClose,
  onSubmit,
  error,
  sending,
}: Props) => {
  return (
    <div className="av-overlay">
      <div className="av-modal">
        <h3>
          Challenge <span style={{ color: "#f59e0b" }}>{driver.username}</span>
        </h3>

        <div className="av-field">
          <label>Race type</label>
          <select
            name="type_race"
            value={formData.type_race}
            onChange={(e) => setFormData({ ...formData, type_race: e.target.value })}
          >
            <option value="quarter_mile">Quarter Mile</option>
            <option value="loops">Loops</option>
            <option value="drift">Drift</option>
          </select>
        </div>

        <div className="av-field">
          <label>Locality</label>
          <input
            name="locality_rece"
            placeholder="Ex: Medellín, Laureles"
            value={formData.locality_rece}
            onChange={(e) => setFormData({ ...formData, locality_rece: e.target.value })}
          />
        </div>

        <div className="av-field">
          <label>Date</label>
          <input
            name="date_race"
            type="date"
            value={formData.date_race}
            onChange={(e) => setFormData({ ...formData, date_race: e.target.value })}
          />
        </div>

        <div className="av-field">
          <label>Time (HH:MM)</label>
          <input
            name="time_race"
            type="time"
            value={formData.time_race}
            onChange={(e) => setFormData({ ...formData, time_race: e.target.value })}
          />
        </div>

        <div className="av-field">
          <label>Notes</label>
          <textarea
            placeholder="Any details about the race..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        {error && <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>{error}</p>}

        <div className="av-modal-actions">
          <button className="av-btn-cancel" onClick={onClose} disabled={sending}>
            Cancel
          </button>
          <button className="av-btn-confirm" onClick={onSubmit} disabled={sending}>
            {sending ? "Sending..." : "Send Challenge ⚔️"}
          </button>
        </div>
      </div>
    </div>
  );
};
