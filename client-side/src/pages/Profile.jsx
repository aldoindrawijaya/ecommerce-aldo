import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user_token");
  const userGlobal = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let response = await axios.get(
      `http://localhost:8002/auth/user/${userGlobal.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <div
          className="flex flex-row
        "
        >
          <p
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {user.name}
          </p>
          <p className="px-6 py-4">{user.email}</p>
          <p className="px-6 py-4">{user.username}</p>
          <p className="px-6 py-4">{user.isActive ? "Active" : "Not Active"}</p>
        </div>
      );
    });
  };

  const updateProfile = async (value) => {
    console.log(value);
    // try {
    //   let response = await axios.put(
    //     "http://localhost:8002/auth/update-profile",
    //     value
    //   );
    //   console.log(response);
    //   alert(response.data.message);
    //   navigate("/users");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (userGlobal.isAdmin === 1) {
      fetchUsers();
    }
  }, [userGlobal]);

  const updateSchema = Yup.object().shape({
    name: Yup.string().required("name cannot be empty"),
    bio: Yup.string().required("price cannot be empty"),
    username: Yup.string().required("id category cannot be empty"),
    email: Yup.string().required("id user cannot be empty"),
    id_users: Yup.string().required("id user cannot be empty"),
  });

  return (
    <div>
      <div className="flex flex-row">
        <table style={{ width: "580px", margin: "0 auto" }}>
          <img src={"http://localhost:8002" + users[0]?.imagePath} />
          <tbody>
            <tr>
              <td>Fullname</td>
              <td>: {users[0]?.name}</td>
            </tr>
            <tr>
              <td>Bio</td>
              <td>: {users[0]?.bio}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>: {users[0]?.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {users[0]?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          type="button"
          className="text-black bg-gray-50 hover:bg-orange-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          UpdateProfile
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Profile
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <Formik
                  initialValues={users[0]}
                  validationSchema={updateSchema}
                  onSubmit={(value) => {
                    updateProfile(value);
                  }}
                >
                  {(props) => {
                    return (
                      <div>
                        {console.log(props)}
                        <Form
                          className="mt-8 space-y-6"
                          action="#"
                          method="POST"
                        >
                          {/* <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                          /> */}
                          <div className="-space-y-px rounded-md shadow-sm">
                            <div className="m-b-10">
                              <label htmlFor="name" className="sr-only">
                                Nama
                              </label>
                              {console.log(props)}
                              <Field
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                value={props.values?.name}
                                required
                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Name product"
                              />
                              <ErrorMessage
                                component="div"
                                name="name"
                                style={{ color: "red", fontSize: "12px" }}
                              />
                            </div>
                            {/* <div>
                              <label htmlFor="price" className="sr-only">
                                Price
                              </label>
                              <Field
                                id="price"
                                name="price"
                                type="price"
                                autoComplete="price"
                                required
                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Price"
                              />
                              <ErrorMessage
                                component="div"
                                name="price"
                                style={{ color: "red", fontSize: "12px" }}
                              />
                            </div> */}
                            {/* <div>
                              <label htmlFor="id_category" className="sr-only">
                                id_category
                              </label>
                              <Field
                                id="id_category"
                                name="id_category"
                                type="id_category"
                                autoComplete="id_category"
                                required
                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="ID Category"
                              />
                              <ErrorMessage
                                component="div"
                                name="id_category"
                                style={{ color: "red", fontSize: "12px" }}
                              />
                            </div> */}
                            {/* <div>
                              <label htmlFor="id_user" className="sr-only">
                                id_user
                              </label>
                              <Field
                                id="id_user"
                                name="id_user"
                                type="id_user"
                                autoComplete="id_user"
                                required
                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="ID User"
                              />
                              <ErrorMessage
                                component="div"
                                name="id_user"
                                style={{ color: "red", fontSize: "12px" }}
                              />
                            </div> */}
                          </div>

                          <div>
                            <button
                              data-modal-hide="defaultModal"
                              type="submit"
                              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add
                            </button>
                          </div>
                        </Form>
                      </div>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
