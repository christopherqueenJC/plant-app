import { useEffect, useState } from "react";

function NativePlantApi() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPlants() {
      try {
        const response = await fetch(
          "https://perenual.com/api/v2/species-list?key=sk-AmKa6adf664ab33f220428&page=1"
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(
            typeof result.error === "string"
              ? result.error
              : "The API returned an error."
          );
        }

        setPlants(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getPlants();
  }, []);

  return (
    <section className="api-plants">
      <h2>Plants from Perenual</h2>
      <p>Plant information retrieved from a public API.</p>

      {loading && <p>Loading plants...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && plants.length === 0 && (
        <p>No plants were returned.</p>
      )}

      <div className="plant-list">
        {plants.map((plant) => (
          <div className="plant-card" key={plant.id}>
            {plant.default_image?.thumbnail && (
              <img
                src={plant.default_image.thumbnail}
                alt={plant.common_name || "Plant"}
                className="api-plant-image"
              />
            )}

            <h3>{plant.common_name || "Common name unavailable"}</h3>

            <p>
              <em>
                {Array.isArray(plant.scientific_name)
                  ? plant.scientific_name.join(", ")
                  : plant.scientific_name || "Scientific name unavailable"}
              </em>
            </p>

            <p>Family: {plant.family || "Unknown"}</p>
          </div>
        ))}
      </div>

      <p className="api-credit">
        Data from <a href="https://perenual.com/">Perenual</a>
      </p>
    </section>
  );
}

export default NativePlantApi;