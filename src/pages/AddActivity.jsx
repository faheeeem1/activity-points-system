import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories.json";
import useActivities from "../hooks/useActivities";

function AddActivity() {
  const navigate = useNavigate();
  const { addActivity } = useActivities();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    pointsClaimed: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.date ||
      !formData.description ||
      !formData.pointsClaimed
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.pointsClaimed) <= 0) {
      setError("Points claimed must be greater than 0.");
      return;
    }

    const uid = localStorage.getItem("loggedInStudent");

    const newActivity = {
      id: Date.now(),
      uid: uid,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      description: formData.description,
      pointsClaimed: Number(formData.pointsClaimed),
      pointsApproved: 0,
      status: "Pending",
    };

addActivity(newActivity);

    navigate("/activities");
  };

  const handleCancel = () => {
    navigate("/activities");
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Activity</h1>
          <p>
            Submit a new activity for points approval.
          </p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>Activity Information</h2>
            <p>
              Enter the details of the activity you completed.
            </p>
          </div>

          <div className="form-grid">

            <div className="form-group full-width">
              <label htmlFor="title">
                Activity Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Hackathon Participation"
                value={formData.title}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label htmlFor="date">
                Activity Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label htmlFor="pointsClaimed">
                Points Claimed
              </label>

              <input
                id="pointsClaimed"
                name="pointsClaimed"
                type="number"
                min="1"
                placeholder="e.g. 10"
                value={formData.pointsClaimed}
                onChange={handleChange}
              />
            </div>


            <div className="form-group full-width">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Describe your participation and contribution..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

          </div>


          {error && (
            <div className="form-error">
              {error}
            </div>
          )}


          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Submit Activity
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddActivity;