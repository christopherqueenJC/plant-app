import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initial plant data stored in memory
let plants = [
  {
    id: 1,
    name: "Red Maple",
    scientificName: "Acer rubrum"
  },
  {
    id: 2,
    name: "Eastern Redbud",
    scientificName: "Cercis canadensis"
  },
  {
    id: 3,
    name: "Purple Coneflower",
    scientificName: "Echinacea purpurea"
  }
];

// READ: Get all plants
app.get("/plants", (req, res) => {
  res.json(plants);
});

// READ: Get one plant by ID
app.get("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const plant = plants.find((plant) => plant.id === id);

  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }

  res.json(plant);
});

// CREATE: Add a new plant
app.post("/plants", (req, res) => {
  const { name, scientificName } = req.body;

  if (!name || !scientificName) {
    return res.status(400).json({
      message: "Name and scientific name are required"
    });
  }

  const newPlant = {
    id: plants.length
      ? Math.max(...plants.map((plant) => plant.id)) + 1
      : 1,
    name,
    scientificName
  };

  plants.push(newPlant);

  res.status(201).json(newPlant);
});

// UPDATE: Edit an existing plant
app.put("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const plant = plants.find((plant) => plant.id === id);

  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }

  Object.assign(plant, req.body, { id });

  res.json(plant);
});

// DELETE: Remove a plant
app.delete("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = plants.findIndex((plant) => plant.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Plant not found" });
  }

  const deletedPlant = plants.splice(index, 1)[0];

  res.json({
    message: "Plant deleted successfully",
    plant: deletedPlant
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Native Plant API running at http://localhost:${PORT}`);
});