import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 15 plant objects stored in memory
let plants = [
  { id: 1, name: "Red Maple", scientificName: "Acer rubrum" },
  { id: 2, name: "Eastern Redbud", scientificName: "Cercis canadensis" },
  { id: 3, name: "Purple Coneflower", scientificName: "Echinacea purpurea" },
  { id: 4, name: "Black-Eyed Susan", scientificName: "Rudbeckia hirta" },
  { id: 5, name: "Common Milkweed", scientificName: "Asclepias syriaca" },
  { id: 6, name: "Wild Bergamot", scientificName: "Monarda fistulosa" },
  { id: 7, name: "Butterfly Weed", scientificName: "Asclepias tuberosa" },
  { id: 8, name: "White Oak", scientificName: "Quercus alba" },
  { id: 9, name: "Serviceberry", scientificName: "Amelanchier canadensis" },
  { id: 10, name: "Wild Columbine", scientificName: "Aquilegia canadensis" },
  { id: 11, name: "New England Aster", scientificName: "Symphyotrichum novae-angliae" },
  { id: 12, name: "Switchgrass", scientificName: "Panicum virgatum" },
  { id: 13, name: "Spotted Bee Balm", scientificName: "Monarda punctata" },
  { id: 14, name: "American Holly", scientificName: "Ilex opaca" },
  { id: 15, name: "Joe-Pye Weed", scientificName: "Eutrochium purpureum" }
];

// GET all plants
app.get("/plants", (req, res) => {
  res.json(plants);
});

// GET one plant by ID
app.get("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }

  res.json(plant);
});

// POST a new plant
app.post("/plants", (req, res) => {
  const { name, scientificName } = req.body;

  if (!name || !scientificName) {
    return res.status(400).json({
      message: "Name and scientific name are required"
    });
  }

  const newPlant = {
    id: plants.length
      ? Math.max(...plants.map(p => p.id)) + 1
      : 1,
    name,
    scientificName
  };

  plants.push(newPlant);

  res.status(201).json(newPlant);
});

// PUT update an existing plant
app.put("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }

  Object.assign(plant, req.body, { id });

  res.json(plant);
});

// DELETE a plant
app.delete("/plants/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = plants.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Plant not found" });
  }

  const deletedPlant = plants.splice(index, 1)[0];

  res.json({
    message: "Plant deleted successfully",
    plant: deletedPlant
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Native Plant API running at http://localhost:${PORT}`);
});