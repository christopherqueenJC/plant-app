import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 3000;

const client = new MongoClient("mongodb://127.0.0.1:27017");

app.use(cors());
app.use(express.json());

let plantsCollection;

// Format MongoDB documents for React
function formatPlant(plant) {
  return {
    ...plant,
    id: plant._id.toString()
  };
}

// GET all plants and search plants
app.get("/plants", async (req, res) => {
  try {
    const search = String(req.query.search ?? "").trim();

    let filter = {};

    if (search !== "") {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { scientificName: { $regex: search, $options: "i" } }
        ]
      };
    }

    const plants = await plantsCollection
      .find(filter)
      .toArray();

    res.json(plants.map(formatPlant));

  } catch (error) {
    console.error("GET plants error:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET one plant by ID
app.get("/plants/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid plant ID" });
    }

    const plant = await plantsCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(formatPlant(plant));

  } catch (error) {
    console.error("GET single plant error:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST a new plant
app.post("/plants", async (req, res) => {
  try {
    const { name, scientificName } = req.body;

    if (!name || !scientificName) {
      return res.status(400).json({
        message: "Name and scientific name are required"
      });
    }

    const newPlant = {
      ...req.body,
      name,
      scientificName
    };

    delete newPlant.id;
    delete newPlant._id;

    const result = await plantsCollection.insertOne(newPlant);

    const savedPlant = await plantsCollection.findOne({
      _id: result.insertedId
    });

    res.status(201).json(formatPlant(savedPlant));

  } catch (error) {
    console.error("POST plant error:", error);
    res.status(500).json({ message: error.message });
  }
});

// PUT update a plant
app.put("/plants/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid plant ID" });
    }

    const { id, _id, ...updates } = req.body;

    const result = await plantsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const updatedPlant = await plantsCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    res.json(formatPlant(updatedPlant));

  } catch (error) {
    console.error("PUT plant error:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE a plant
app.delete("/plants/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid plant ID" });
    }

    const deletedPlant = await plantsCollection.findOneAndDelete({
      _id: new ObjectId(req.params.id)
    });

    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json({
      message: "Plant deleted successfully",
      plant: formatPlant(deletedPlant)
    });

  } catch (error) {
    console.error("DELETE plant error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB and start Express
async function startServer() {
  try {
    await client.connect();

    const database = client.db("nativePlantDB");
    plantsCollection = database.collection("plants");

    console.log("Connected to MongoDB!");

    app.listen(PORT, () => {
      console.log(`Native Plant API running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();