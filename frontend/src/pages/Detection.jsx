import React, { useState } from "react";
import {
  Upload,
  Camera,
  AlertCircle,
  CheckCircle,
  Loader,
  Info,
  Bug,
  Zap,
} from "lucide-react";

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setError(null);
      setDetectionResult(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      console.log("Sending request to backend...");

      // Fixed: Use full URL to backend
      const response = await fetch(
        "http://localhost:5000/api/detection/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Detection response:", data);

      if (data.success) {
        setDetectionResult(data.detection);

        // Record the detection session - also fixed URL
        try {
          await fetch("http://localhost:5000/api/detection/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              detected_pest_id: data.detection.pest_id,
              confidence_score: data.detection.confidence,
              detection_method: data.detection.model_used
                ? "tensorflow"
                : "mock",
            }),
          });
        } catch (sessionError) {
          console.warn("Failed to record session:", sessionError);
          // Don't fail the whole detection if session recording fails
        }
      } else {
        setError(data.error || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(`Failed to analyze image: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResult(null);
    setError(null);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 60) return "Medium Confidence";
    return "Low Confidence";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bug className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Pest Detection System
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload an image of a pest to identify it using our AI-powered
            detection system. Get instant results with pest information and
            management strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Image
            </h2>

            {!imagePreview ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop an image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer inline-flex items-center transition-colors duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    onClick={resetDetection}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>

                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Detection Results
            </h2>

            {!detectionResult ? (
              <div className="text-center py-8 text-gray-500">
                <Bug className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Upload and analyze an image to see results</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Result */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {detectionResult.pest_name || detectionResult.common_name}
                    </h3>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>

                  {detectionResult.scientific_name && (
                    <p className="text-sm italic text-gray-600 mb-2">
                      {detectionResult.scientific_name}
                    </p>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-2">
                        Confidence:
                      </span>
                      <span
                        className={`font-bold ${getConfidenceColor(
                          detectionResult.confidence
                        )}`}
                      >
                        {detectionResult.confidence}%
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        detectionResult.confidence >= 80
                          ? "bg-green-100 text-green-800"
                          : detectionResult.confidence >= 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getConfidenceLabel(detectionResult.confidence)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {detectionResult.description && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Description
                    </h4>
                    <p className="text-sm text-gray-700">
                      {detectionResult.description}
                    </p>
                  </div>
                )}

                {/* Damage Symptoms */}
                {detectionResult.damage_symptoms && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Damage Symptoms
                    </h4>
                    <p className="text-sm text-orange-700">
                      {detectionResult.damage_symptoms}
                    </p>
                  </div>
                )}

                {/* Model Info */}
                {detectionResult.model_info && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700">
                      <div className="flex justify-between">
                        <span>
                          Model:{" "}
                          {detectionResult.model_info.model_type || "Unknown"}
                        </span>
                        <span>
                          Time:{" "}
                          {detectionResult.model_info.processing_time || "N/A"}
                          ms
                        </span>
                      </div>
                      <div className="mt-1">
                        Status:{" "}
                        {detectionResult.model_info.model_used
                          ? "AI Model"
                          : "Mock Detection"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() =>
                    window.open(`/pests/${detectionResult.pest_id}`, "_blank")
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  View Management Strategies →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tips for Best Results
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Good Lighting</p>
                <p className="text-gray-600">
                  Take photos in bright, natural light
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Close-up View</p>
                <p className="text-gray-600">
                  Get close to show pest details clearly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-800">Clear Focus</p>
                <p className="text-gray-600">
                  Ensure the pest is in sharp focus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;
