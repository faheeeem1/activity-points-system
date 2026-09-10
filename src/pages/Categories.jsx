import useActivities from "../hooks/useActivities";
import categoriesData from "../data/categories.json";

function Categories() {
  const { activities: allActivities } = useActivities();

  const uid = localStorage.getItem("loggedInStudent");

  const activities = allActivities.filter(
    (activity) => activity.uid === uid
  );

  const categories = categoriesData;

  const getCategoryActivities = (categoryName) => {
    return activities.filter(
      (activity) => activity.category === categoryName
    );
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Activity Categories</h1>
          <p>
            Explore your activity participation across different categories.
          </p>
        </div>
      </div>

      <div className="categories-grid">

        {categories.map((category) => {
          const categoryActivities =
            getCategoryActivities(category.name);

          const claimedPoints =
            categoryActivities.reduce(
              (total, activity) =>
                total + activity.pointsClaimed,
              0
            );

          const approvedPoints =
            categoryActivities.reduce(
              (total, activity) =>
                total + activity.pointsApproved,
              0
            );

          return (
            <div
              className="category-card"
              key={category.id}
            >

              <div className="category-top">

                <div className="category-icon">
                  {category.icon}
                </div>

                <span className="category-count">
                  {categoryActivities.length}{" "}
                  {categoryActivities.length === 1
                    ? "activity"
                    : "activities"}
                </span>

              </div>

              <h2>{category.name}</h2>

              <p className="category-description">
                {category.description}
              </p>

              <div className="category-points">

                <div>
                  <span>Claimed</span>
                  <strong>{claimedPoints}</strong>
                </div>

                <div>
                  <span>Approved</span>
                  <strong>{approvedPoints}</strong>
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Categories;