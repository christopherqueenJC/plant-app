import { useState } from "react";

function NativePlantApi() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setPlants([]);

      const key = "sk-AmKa6adf664ab33f220428";

      const params = new URLSearchParams({
        key: key,
        page: "1",
      });

      if (search.trim()) {
        params.set("q", search.trim());
      }

      const response = await fetch(
        `https://perenual.com/api/v2/species-list?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}.`
        );
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

  return (
    <section className="api-plants">
      <h2>Search the Plant Database</h2>

      <p>
        Search for plants using the Perenual public REST API.
      </p>

      <form className="api-search" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search plants, e.g. sunflower"
          aria-label="Search plants"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setPlants([]);
            setError("");
            setSearched(false);
          }}
        >
          Clear
        </button>
      </form>

      {loading && <p>Loading plants...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && searched && plants.length === 0 && (
        <p>No plants found. Try another search.</p>
      )}

      {!loading && !error && plants.length > 0 && (
        <>
          <p>Results: {plants.length} plants</p>

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

                <h3>
                  {plant.common_name || "Common name unavailable"}
                </h3>

                <p>
                  <em>
                    {Array.isArray(plant.scientific_name)
                      ? plant.scientific_name.join(", ")
                      : plant.scientific_name || "Scientific name unavailable"}
                  </em>
                </p>

                <p>Family: {plant.family || "Unknown"}</p>
                <p>Genus: {plant.genus || "Unknown"}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="api-credit">
        API:{" "}
        <a href="https://perenual.com/docs/api">
          Perenual API Documentation
        </a>
      </p>
    </section>
  );
}

export default NativePlantApi