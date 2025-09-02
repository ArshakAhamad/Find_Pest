import React from "react";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/saga-green/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

const Detection = () => {
  const onUpload = (e) => {
    console.log("Files uploaded:", e.files);
    alert("Upload successful! Check console for file details.");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Pest Detection Upload
      </h2>

      <FileUpload
        name="file"
        url="/api/upload"
        accept="image/*"
        maxFileSize={1000000}
        chooseLabel="Select Image"
        uploadLabel="Upload"
        cancelLabel="Cancel"
        emptyTemplate={
          <p className="m-0 text-gray-500">
            Drag and drop pest images here, or click <b>Select Image</b>
          </p>
        }
        onUpload={onUpload}
      />
    </div>
  );
};

export default Detection;
