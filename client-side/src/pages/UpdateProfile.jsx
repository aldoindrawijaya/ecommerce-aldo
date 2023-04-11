import React, { useState } from "react";
import axios from "axios";

function UpdateProfile() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const uploadImage = async () => {
    setIsLoading(true);
    if (file) {
      const obj = {
        id: 5,
      };
      let formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(obj));

      const response = await axios.post(
        "http://localhost:8001/upload",
        formData
      );
      if (!response.error) {
        alert("Upload berhasil");
      }
    } else {
      alert("select image first");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-3/4 m-auto bg-blue-200">
      <div>
        <p>Update Profile</p>
        <div>
          <img id="imagepreview" width="200px" height="200px" />
        </div>

        <div>
          <input
            type="file"
            id="file"
            onChange={(event) => {
              onFileChange(event);
            }}
          />
        </div>
        {isLoading ? (
          <button
            className="bg-red-400 px-4 py-2 rounded-md hover:bg-red-400"
            onClick={uploadImage}
            disabled
          >
            UPLOAD
          </button>
        ) : (
          <button
            className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-400"
            onClick={uploadImage}
          >
            UPLOAD
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
