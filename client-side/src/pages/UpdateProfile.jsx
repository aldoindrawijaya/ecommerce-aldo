import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./updateProfile.css";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userGlobal = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const onCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const uploadImage = async (id_content) => {
    setIsLoading(true);
    if (file) {
      const obj = {
        id: userGlobal.id,
        id_content,
      };
      let formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(obj));

      const response = await axios.post(
        "http://localhost:8002/post/upload",
        formData
      );
      if (!response.error) {
        alert("Upload Content Berhasil");
        navigate("/");
      }
    } else {
      alert("select image first");
    }
    setIsLoading(false);
  };

  const addContent = async () => {
    const obj = {
      id_users: userGlobal.id,
      caption,
      number_of_like: 0,
      image: "",
    };

    await axios
      .post("http://localhost:8002/post/add-content", obj)
      .then((response) => {
        uploadImage(response.data.data.insertId);
      });
  };

  return (
    <div className="w-3/4 m-auto updateProfile flex">
      <div>
        <p className="">Update Profile</p>
        <div>
          <img id="imagepreview" width="200px" height="200px" />
        </div>

        <div>
          <input
            className=" my-10"
            type="file"
            id="file"
            onChange={(event) => {
              onFileChange(event);
            }}
          />
          <button
            className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-400"
            onClick={addContent}
          >
            UPLOAD
          </button>
        </div>
      </div>
      <div class="relative h-11 mt-10 w-full min-w-[200px]">
        <input
          onChange={(event) => onCaptionChange(event)}
          class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Caption
        </label>
      </div>
    </div>
  );
}

export default UpdateProfile;
