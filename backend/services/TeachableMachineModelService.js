const tf = require("@tensorflow/tfjs");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

class TeachableMachineModelService {
  constructor() {
    this.model = null;
    this.labels = [];
    this.isLoaded = false;
    this.modelPath = path.join(__dirname, "../models/pest-detection");
    this.confidence_threshold = 0.6; // 60% minimum confidence
    this.loadAttempts = 0;
    this.maxLoadAttempts = 3;
  }

  async loadModel() {
    try {
      this.loadAttempts++;
      console.log(
        `🔄 Loading Teachable Machine model (attempt ${this.loadAttempts})...`
      );

      const modelFile = path.join(this.modelPath, "model.json");
      const labelsFile = path.join(this.modelPath, "labels.txt");

      // Check if model directory exists
      if (!fs.existsSync(this.modelPath)) {
        console.log("📁 Creating model directory...");
        fs.mkdirSync(this.modelPath, { recursive: true });
        this.logModelSetupInstructions();
        return false;
      }

      // Check if model file exists
      if (!fs.existsSync(modelFile)) {
        console.log("⚠️  Model file not found at:", modelFile);
        this.logModelSetupInstructions();
        return false;
      }

      // Load the Teachable Machine model
      console.log("🧠 Loading TensorFlow.js model...");
      this.model = await tf.loadLayersModel(`file://${modelFile}`);

      // Load labels
      this.loadLabels(labelsFile);

      // Warm up the model with a dummy prediction
      await this.warmUpModel();

      this.isLoaded = true;
      console.log("✅ Teachable Machine model loaded successfully!");
      console.log(
        `🏷️  Loaded ${this.labels.length} pest classes:`,
        this.labels
      );
      console.log(
        `🎯 Confidence threshold: ${this.confidence_threshold * 100}%`
      );

      return true;
    } catch (error) {
      console.error("❌ Error loading Teachable Machine model:", error.message);

      if (this.loadAttempts < this.maxLoadAttempts) {
        console.log("🔄 Retrying model load...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return this.loadModel();
      }

      console.log(
        "⚠️  Max load attempts reached. Falling back to mock detection."
      );
      return false;
    }
  }

  loadLabels(labelsFile) {
    if (fs.existsSync(labelsFile)) {
      const labelsText = fs.readFileSync(labelsFile, "utf8");
      this.labels = labelsText
        .trim()
        .split("\n")
        .map((label) => label.trim());
      console.log("📋 Labels loaded from file");
    } else {
      // Update these labels to match YOUR exact Teachable Machine training classes
      this.labels = [
        "Cotton bollworm", // Make sure this matches exactly what you used in Teachable Machine
        "Tobacco whitefly", // Make sure this matches exactly what you used in Teachable Machine
      ];
      console.log("📋 Using default labels");

      // Create the labels file for future reference
      try {
        fs.writeFileSync(labelsFile, this.labels.join("\n"));
        console.log("📝 Created labels.txt file");
      } catch (error) {
        console.warn("⚠️  Could not create labels file:", error.message);
      }
    }
  }

  async warmUpModel() {
    try {
      console.log("🔥 Warming up model...");

      // Create a dummy 224x224x3 tensor (Teachable Machine input size)
      const dummyInput = tf.randomNormal([1, 224, 224, 3]);
      const warmupPrediction = await this.model.predict(dummyInput);

      // Dispose tensors
      dummyInput.dispose();
      warmupPrediction.dispose();

      console.log("✅ Model warm-up complete");
    } catch (error) {
      console.warn("⚠️  Model warm-up failed:", error.message);
    }
  }

  logModelSetupInstructions() {
    console.log("\n" + "=".repeat(60));
    console.log("📚 TEACHABLE MACHINE MODEL SETUP INSTRUCTIONS");
    console.log("=".repeat(60));
    console.log("1. Go to: https://teachablemachine.withgoogle.com");
    console.log("2. Train an Image Classification model with your pest images");
    console.log("3. Export as 'TensorFlow.js' and download the model");
    console.log("4. Extract the files to:", this.modelPath);
    console.log("\n📁 Required files:");
    console.log("   ├── model.json");
    console.log("   ├── weights.bin");
    console.log("   ├── metadata.json (optional)");
    console.log("   └── labels.txt (will be created automatically)");
    console.log("\n🔧 Until then, using mock detection for testing.");
    console.log("=".repeat(60) + "\n");
  }

  async preprocessImage(imageBuffer, targetSize = 224) {
    try {
      // Teachable Machine expects 224x224 RGB images normalized to [0,1]
      const processedBuffer = await sharp(imageBuffer)
        .resize(targetSize, targetSize, { fit: "cover", position: "center" })
        .removeAlpha()
        .raw()
        .toBuffer();

      // Convert buffer to tensor
      const tensor = tf.tensor3d(new Uint8Array(processedBuffer), [
        targetSize,
        targetSize,
        3,
      ]);

      // Normalize pixel values to [0, 1] range
      const normalized = tensor.div(255.0);

      // Add batch dimension [1, 224, 224, 3]
      const batched = normalized.expandDims(0);

      // Cleanup intermediate tensors
      tensor.dispose();
      normalized.dispose();

      return batched;
    } catch (error) {
      console.error("❌ Image preprocessing error:", error);
      throw new Error(`Failed to preprocess image: ${error.message}`);
    }
  }

  async detectPest(imageBuffer) {
    try {
      const startTime = Date.now();

      // Ensure model is loaded
      if (!this.isLoaded) {
        console.log("🔄 Model not loaded, attempting to load...");
        const loaded = await this.loadModel();
        if (!loaded) {
          console.log("⚠️  Model loading failed, using mock detection");
          return this.enhancedMockDetection(imageBuffer);
        }
      }

      console.log("🔍 Running Teachable Machine pest detection...");

      // Preprocess the image
      const inputTensor = await this.preprocessImage(imageBuffer);
      console.log("✅ Image preprocessed successfully");

      // Make prediction
      const predictionTensor = await this.model.predict(inputTensor);
      const predictions = await predictionTensor.data();

      // Process results
      const results = Array.from(predictions).map((confidence, index) => ({
        pest_id: this.mapLabelToPestId(this.labels[index]),
        pest_name: this.labels[index] || `Unknown Pest ${index + 1}`,
        scientific_name: this.getScientificName(this.labels[index]),
        confidence: Math.round(confidence * 10000) / 100, // Round to 2 decimal places
        raw_confidence: confidence,
        above_threshold: confidence >= this.confidence_threshold,
      }));

      // Sort by confidence (highest first)
      results.sort((a, b) => b.confidence - a.confidence);

      const processingTime = Date.now() - startTime;
      const topResult = results[0];

      // Log detection details
      console.log("🎯 Top prediction:", {
        pest: topResult.pest_name,
        confidence: `${topResult.confidence}%`,
        above_threshold: topResult.above_threshold,
        processing_time: `${processingTime}ms`,
      });

      // Cleanup tensors
      inputTensor.dispose();
      predictionTensor.dispose();

      return {
        detected_pest: topResult,
        all_predictions: results.slice(0, 3), // Return top 3 predictions
        model_used: true,
        model_type: "Teachable Machine",
        processing_time: processingTime,
        confidence_threshold: this.confidence_threshold * 100,
        metadata: {
          image_processed: true,
          tensor_shape: [1, 224, 224, 3],
          total_classes: this.labels.length,
        },
      };
    } catch (error) {
      console.error("❌ Teachable Machine detection error:", error);
      console.log("🔄 Falling back to mock detection");
      return this.enhancedMockDetection(imageBuffer);
    }
  }

  mapLabelToPestId(labelName) {
    // Map your Teachable Machine labels to database pest_ids
    const labelToPestIdMap = {
      "Cotton Bollworm": 7,
      "Tobacco Whitefly": 8,
      "Cotton Aphid": 1,
      "Fall Armyworm": 2,
      "Cucumber Beetle": 3,
      "Colorado Potato Beetle": 4,
      Whitefly: 5,
      "Spider Mite": 6,
    };

    return labelToPestIdMap[labelName] || 1; // Default to pest_id 1 if not found
  }

  getScientificName(commonName) {
    const scientificNames = {
      "Cotton Bollworm": "Helicoverpa armigera",
      "Tobacco Whitefly": "Bemisia tabaci",
      "Cotton Aphid": "Aphis gossypii",
      "Fall Armyworm": "Spodoptera frugiperda",
      "Cucumber Beetle": "Diabrotica undecimpunctata",
      "Colorado Potato Beetle": "Leptinotarsa decemlineata",
      Whitefly: "Bemisia tabaci",
      "Spider Mite": "Tetranychus urticae",
    };

    return scientificNames[commonName] || "Unknown species";
  }

  async enhancedMockDetection(imageBuffer) {
    try {
      console.log("🎲 Running enhanced mock detection...");

      // Analyze image properties for more realistic mock results
      const imageStats = await this.analyzeImageForMocking(imageBuffer);

      // Create realistic mock results based on your trained classes
      const mockPests = [
        {
          pest_id: 7,
          pest_name: "Cotton Bollworm",
          scientific_name: "Helicoverpa armigera",
          base_confidence: 85,
        },
        {
          pest_id: 8,
          pest_name: "Tobacco Whitefly",
          scientific_name: "Bemisia tabaci",
          base_confidence: 78,
        },
      ];

      // Add some randomness based on image characteristics
      const adjustedPests = mockPests.map((pest) => ({
        ...pest,
        confidence: Math.max(
          60,
          Math.min(
            95,
            pest.base_confidence +
              (Math.random() - 0.5) * 30 +
              imageStats.qualityBonus
          )
        ),
        above_threshold: true,
      }));

      // Randomly select one (not always highest confidence)
      const selectedPest =
        Math.random() < 0.7
          ? adjustedPests.sort((a, b) => b.confidence - a.confidence)[0] // 70% highest confidence
          : adjustedPests[Math.floor(Math.random() * adjustedPests.length)]; // 30% random

      console.log("🎯 Mock detection result:", {
        pest: selectedPest.pest_name,
        confidence: `${selectedPest.confidence}%`,
        quality_bonus: `${imageStats.qualityBonus}%`,
      });

      return {
        detected_pest: selectedPest,
        all_predictions: adjustedPests,
        model_used: false,
        model_type: "Enhanced Mock",
        processing_time: 800 + Math.random() * 400, // Simulate processing time
        confidence_threshold: this.confidence_threshold * 100,
        metadata: {
          image_analyzed: true,
          quality_score: imageStats.qualityScore,
          mock_detection: true,
        },
      };
    } catch (error) {
      console.error("❌ Enhanced mock detection error:", error);
      return this.basicMockDetection();
    }
  }

  async analyzeImageForMocking(imageBuffer) {
    try {
      const metadata = await sharp(imageBuffer).metadata();
      const stats = await sharp(imageBuffer).stats();

      // Calculate image quality score
      const sizeScore = Math.min(
        10,
        Math.log(metadata.width * metadata.height) / 2
      );
      const contrastScore = Math.min(10, stats.channels[0].stdev / 10);
      const brightnessScore = Math.min(
        10,
        Math.abs(128 - stats.channels[0].mean) / 12.8
      );

      const qualityScore = (sizeScore + contrastScore + brightnessScore) / 3;
      const qualityBonus = (qualityScore - 5) * 2; // -10 to +10 bonus

      return {
        qualityScore: Math.round(qualityScore * 10) / 10,
        qualityBonus: Math.round(qualityBonus * 10) / 10,
        imageSize: `${metadata.width}x${metadata.height}`,
        format: metadata.format,
      };
    } catch (error) {
      console.warn("⚠️  Image analysis failed:", error.message);
      return {
        qualityScore: 7.0,
        qualityBonus: 2.0,
        imageSize: "unknown",
        format: "unknown",
      };
    }
  }

  basicMockDetection() {
    const basicPests = [
      {
        pest_id: 7,
        pest_name: "Cotton Bollworm",
        scientific_name: "Helicoverpa armigera",
        confidence: 82.5,
      },
      {
        pest_id: 8,
        pest_name: "Tobacco Whitefly",
        scientific_name: "Bemisia tabaci",
        confidence: 76.3,
      },
    ];

    const randomIndex = Math.floor(Math.random() * basicPests.length);
    const selectedPest = basicPests[randomIndex];

    return {
      detected_pest: { ...selectedPest, above_threshold: true },
      all_predictions: basicPests.map((pest) => ({
        ...pest,
        above_threshold: true,
      })),
      model_used: false,
      model_type: "Basic Mock",
      processing_time: 500,
      metadata: { fallback_detection: true },
    };
  }

  // Utility methods
  isModelReady() {
    return this.isLoaded;
  }

  getModelInfo() {
    return {
      loaded: this.isLoaded,
      labels: this.labels,
      model_path: this.modelPath,
      confidence_threshold: this.confidence_threshold,
      model_files_exist: fs.existsSync(path.join(this.modelPath, "model.json")),
    };
  }

  setConfidenceThreshold(threshold) {
    this.confidence_threshold = Math.max(0.1, Math.min(1.0, threshold));
    console.log(
      `🎯 Confidence threshold updated to: ${this.confidence_threshold * 100}%`
    );
  }

  // Method for testing the model
  async testModel(testImagePath) {
    try {
      if (!fs.existsSync(testImagePath)) {
        throw new Error(`Test image not found: ${testImagePath}`);
      }

      console.log("🧪 Testing model with:", testImagePath);
      const imageBuffer = fs.readFileSync(testImagePath);
      const result = await this.detectPest(imageBuffer);

      console.log("📊 Test Results:");
      console.log(`   Detected: ${result.detected_pest.pest_name}`);
      console.log(`   Confidence: ${result.detected_pest.confidence}%`);
      console.log(`   Model Used: ${result.model_used}`);
      console.log(`   Processing Time: ${result.processing_time}ms`);

      return result;
    } catch (error) {
      console.error("❌ Model test failed:", error);
      throw error;
    }
  }

  // Check model files
  checkModelFiles() {
    const requiredFiles = ["model.json", "weights.bin"];
    const missingFiles = [];

    requiredFiles.forEach((file) => {
      const filePath = path.join(this.modelPath, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    });

    return {
      allFilesPresent: missingFiles.length === 0,
      missingFiles: missingFiles,
      modelPath: this.modelPath,
    };
  }
}

// Export singleton instance
module.exports = new TeachableMachineModelService();
