import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import like from "../images/like.png";
import deleteImage from "../images/delete.png";

function Home() {
  const userGlobal = useSelector((state) => state.user.user);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const fetchContent = async () => {
    let response = await axios.get(`http://localhost:8002/post/fetch-content`);
    setContent(response.data);
  };

  const onClickLike = async (data) => {
    console.log("aaa");
    const requestBody = {
      number_of_like: data.number_of_like,
      id_content: data.id_content,
    };
    await axios
      .post("http://localhost:8002/post/like", requestBody)
      .then(() => {
        fetchContent();
      });
  };

  const deleteContent = async (id_content) => {
    const requestBody = {
      id_content,
    };
    await axios
      .post(`http://localhost:8002/post/delete-content`, requestBody)
      .then((response) => {
        alert(response.data.message);
        fetchContent();
      });
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const renderContent = () => {
    return content.map((data) => {
      return (
        <div style={{ marginBottom: "24px" }} className="mx-6 my-4 ProductCard">
          <div className="group relative">
            <div
              style={{ margin: "0 auto" }}
              className="min-h-80 aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
            >
              <img
                src={`http://localhost:8002/${data.image}`}
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div
              style={{ width: "320px", margin: "0 auto" }}
              className="mt-4 flex justify-between"
            >
              <div>
                <h3>{data.name}</h3>
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {data.caption}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {data.created_date}
                </p>
              </div>
              <div className="flex">
                <p className="text-m font-medium text-gray-900">
                  {data.number_of_like}{" "}
                </p>

                <img
                  onClick={() => onClickLike(data)}
                  style={{ width: "24px", height: "24px", zIndex: "10" }}
                  src={like}
                ></img>

                {data.id_users === userGlobal.id && (
                  <img
                    onClick={() => deleteContent(data.id_content)}
                    style={{ width: "24px", height: "24px", zIndex: "10" }}
                    src={deleteImage}
                  ></img>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="columns-1 content-center">{renderContent()}</div>
    </div>
  );
}

export default Home;
