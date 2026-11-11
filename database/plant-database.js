db.plants.insertMany([
  {
    name: "Red Maple",
    scientificName: "Acer rubrum",
    description: "A deciduous tree native to eastern North America.",
    sunlight: "Full sun to partial shade",
    soil: "Moist, well-drained soil",
    water: "Moderate",
    height: "40-60 feet",
    bloomSeason: "Late winter to early spring",
    nativeRange: "Eastern and central North America",
    wildlifeBenefits: ["Provides seeds for birds and small mammals"],
    image: ""
  },
  {
    name: "Eastern Redbud",
    scientificName: "Cercis canadensis",
    description: "A small flowering tree known for its pink spring blossoms.",
    sunlight: "Full sun to partial shade",
    soil: "Well-drained soil",
    water: "Moderate",
    height: "20-30 feet",
    bloomSeason: "Spring",
    nativeRange: "Eastern North America",
    wildlifeBenefits: ["Flowers attract bees"],
    image: ""
  },
  {
    name: "Purple Coneflower",
    scientificName: "Echinacea purpurea",
    description: "A perennial wildflower with purple petals.",
    sunlight: "Full sun",
    soil: "Well-drained soil",
    water: "Low to moderate",
    height: "2-5 feet",
    bloomSeason: "Summer to fall",
    nativeRange: "Eastern and central North America",
    wildlifeBenefits: ["Attracts butterflies and bees"],
    image: ""
  },
  {
    name: "Black-Eyed Susan",
    scientificName: "Rudbeckia hirta",
    description: "A bright yellow wildflower with a dark center.",
    sunlight: "Full sun",
    soil: "Well-drained soil",
    water: "Low to moderate",
    height: "1-3 feet",
    bloomSeason: "Summer to fall",
    nativeRange: "North America",
    wildlifeBenefits: ["Attracts pollinators"],
    image: ""
  },
  {
    name: "Common Milkweed",
    scientificName: "Asclepias syriaca",
    description: "A native perennial plant important to monarch butterflies.",
    sunlight: "Full sun",
    soil: "Well-drained soil",
    water: "Low to moderate",
    height: "3-5 feet",
    bloomSeason: "Summer",
    nativeRange: "Eastern and central North America",
    wildlifeBenefits: ["Host plant for monarch caterpillars"],
    image: ""
  }
]);

// QUERY DOCUMENTS
db.plants.find();
db.plants.findOne({ name: "Red Maple" });
db.plants.find({ sunlight: "Full sun" });

// UPDATE DOCUMENT
db.plants.updateOne(
  { name: "Red Maple" },
  {
    $set: {
      description: "A beautiful native tree known for its brilliant red fall foliage."
    }
  }
);

// DELETE DOCUMENT
db.plants.deleteOne({ name: "Black-Eyed Susan" });