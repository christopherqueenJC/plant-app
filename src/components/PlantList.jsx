import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [sunlight, setSunlight] = useState("All");
  const [soilType, setSoilType] = useState("All");
  const [season, setSeason] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPlant, setEditingPlant] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    name: "",
    scientificName: "",
    description: "",
    sunlight: "",
    soil: "",
    water: "",
    height: "",
    bloomSeason: "",
    nativeRange: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  // Load plants from MongoDB
  async function loadPlants() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/plants");

      if (!response.ok) {
        throw new Error("Could not retrieve plants.");
      }

      const data = await response.json();
      setPlants(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlants();
  }, []);

  // Update form fields when the user types
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Open the form for a new plant
  function handleAddClick() {
    setEditingPlant(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  // Open the form with an existing plant's information
  function handleEdit(plant) {
    setEditingPlant(plant);

    setFormData({
      name: plant.name || "",
      scientificName: plant.scientificName || "",
      description: plant.description || "",
      sunlight: plant.sunlight || "",
      soil: plant.soil || "",
      water: plant.water || "",
      height: plant.height || "",
      bloomSeason: plant.bloomSeason || "",
      nativeRange: plant.nativeRange || ""
    });

    setShowForm(true);
  }

  // Add a new plant or update an existing plant
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const isEditing = editingPlant !== null;

      const url = isEditing
        ? `http://localhost:3000/plants/${editingPlant.id || editingPlant._id}`
        : "http://localhost:3000/plants";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save plant.");
      }

      setShowForm(false);
      setEditingPlant(null);
      setFormData(emptyForm);

      await loadPlants();

      alert(isEditing ? "Plant updated successfully!" : "Plant added successfully!");
    } catch (error) {
      setError(error.message);
    }
  }

  // Delete a plant from MongoDB
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plant?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/plants/${id}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete plant.");
      }

      await loadPlants();
      alert("Plant deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  }

  // Search and filter plants
  const filteredPlants = plants.filter(function (plant) {
    const searchText = search.toLowerCase();

    const matchesName =
      plant.name?.toLowerCase().includes(searchText) ||
      plant.scientificName?.toLowerCase().includes(searchText);

    const matchesSunlight =
      sunlight === "All" || plant.sunlight === sunlight;

    const matchesSoil =
      soilType === "All" || plant.soil === soilType;

    const matchesSeason =
      season === "All" || plant.bloomSeason === season;

    return (
      matchesName &&
      matchesSunlight &&
      matchesSoil &&
      matchesSeason
    );
  });

  function resetFilters() {
    setSearch("");
    setSunlight("All");
    setSoilType("All");
    setSeason("All");
  }

  return (
    <main id="plants">
      <h2>Plant Directory</h2>

      <button type="button" onClick={handleAddClick}>
        Add New Plant
      </button>

      {showForm && (
        <form className="plant-form" onSubmit={handleSubmit}>
          <h3>{editingPlant ? "Edit Plant" : "Add New Plant"}</h3>

          <label>Plant Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Scientific Name</label>
          <input
            name="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Sunlight</label>
          <input
            name="sunlight"
            value={formData.sunlight}
            onChange={handleChange}
            placeholder="Full Sun or Partial Sun"
          />

          <label>Soil Type</label>
          <input
            name="soil"
            value={formData.soil}
            onChange={handleChange}
          />

          <label>Water Requirements</label>
          <input
            name="water"
            value={formData.water}
            onChange={handleChange}
          />

          <label>Height</label>
          <input
            name="height"
            value={formData.height}
            onChange={handleChange}
          />

          <label>Bloom Season</label>
          <input
            name="bloomSeason"
            value={formData.bloomSeason}
            onChange={handleChange}
          />

          <label>Native Range</label>
          <input
            name="nativeRange"
            value={formData.nativeRange}
            onChange={handleChange}
          />

          <button type="submit">
            {editingPlant ? "Save Changes" : "Add Plant"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setEditingPlant(null);
              setFormData(emptyForm);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="controls">
        <input
          type="text"
          placeholder="Search common or scientific name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={sunlight}
          onChange={(event) => setSunlight(event.target.value)}
        >
          <option value="All">All Sunlight</option>
          <option value="Full Sun">Full Sun</option>
          <option value="Partial Sun">Partial Sun</option>
        </select>

        <select
          value={soilType}
          onChange={(event) => setSoilType(event.target.value)}
        >
          <option value="All">All Soil Types</option>
          <option value="Well-drained">Well-drained</option>
          <option value="Loamy">Loamy</option>
          <option value="Sandy">Sandy</option>
          <option value="Moist">Moist</option>
        </select>

        <select
          value={season}
          onChange={(event) => setSeason(event.target.value)}
        >
          <option value="All">All Seasons</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>

        <button type="button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {loading && <p>Loading plants...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!loading && (
        <>
          <p>
            Showing {filteredPlants.length} of {plants.length} plants
          </p>

          <div className="plant-list">
            {filteredPlants.length > 0 ? (
              filteredPlants.map(function (plant) {
                return (
                  <PlantCard
                    key={plant.id || plant._id}
                    name={plant.name}
                    scientificName={plant.scientificName}
                    height={plant.height}
                    sunlight={plant.sunlight}
                    soilType={plant.soil}
                    season={plant.bloomSeason}
                    onEdit={() => handleEdit(plant)}
                    onDelete={() => handleDelete(plant.id || plant._id)}
                  />
                );
              })
            ) : (
              <p>No plants found. Try different search terms or filters.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default PlantList;