import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../redux/slices/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../utils/localStorage";
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "../constants/cloudinary";
import { Helmet } from "react-helmet-async";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      profileImage: "",
      role: "student",
      major: "",
      grades: [],
      overallGrade: 0,
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      fullName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required(),
      major: Yup.string().required(),
      profileImage: Yup.string().required(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      try {
        const result = await createUser(values).unwrap();
        toast.success("Registration successful!");
        resetForm();
        setImageUrl(null);
        navigate("/login");
        window.location.reload();
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageUrl(data.secure_url);
      formik.setFieldValue("profileImage", data.secure_url);
    }
  };

  const handleRoleChange = (newValue) => {
    setIsTeacher(newValue);
    formik.setFieldValue("role", newValue ? "teacher" : "student");
  };

  useEffect(() => {
    const userRole = storage.getUserRole();
    if (userRole === "student") {
      navigate("/student");
    }
    if (userRole === "teacher") {
      navigate("/teacher");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>ClassCraft Register</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="src/assets/image/user-login.png" />
      </Helmet>
      <div>
        <div>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-violet-200">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-8 text-center text-violet-700">
                Register
              </h2>
              <div className="flex gap-10">
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      {...formik.getFieldProps("username")}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div className="text-sm text-red-500">{formik.errors.username}</div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      {...formik.getFieldProps("fullName")}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <div className="text-sm text-red-500">{formik.errors.fullName}</div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-sm text-red-500">{formik.errors.email}</div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-sm text-red-500">{formik.errors.password}</div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="major"
                    >
                      Major
                    </label>
                    <input
                      type="text"
                      id="major"
                      name="major"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      {...formik.getFieldProps("major")}
                    />
                    {formik.touched.major && formik.errors.major && (
                      <div className="text-sm text-red-500">{formik.errors.major}</div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="profileImage"
                    >
                      Profile Image
                    </label>
                    <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-violet-500 transition">
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="profileImage"
                        className="text-sm text-gray-500 cursor-pointer"
                      >
                        Click to upload
                      </label>
                    </div>
                    {formik.touched.profileImage && formik.errors.profileImage && (
                      <div className="text-sm text-red-500">
                        {formik.errors.profileImage}
                      </div>
                    )}
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="teacher"
                      name="role"
                      className="hidden"
                      checked={isTeacher}
                      onChange={(e) => handleRoleChange(e.target.checked)}
                    />
                    <div
                      className={`bg-gray-300 w-12 h-6 rounded-full transition relative cursor-pointer`}
                      onClick={() => handleRoleChange(!isTeacher)}
                    >
                      <div
                        className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition ${isTeacher ? "translate-x-6" : "translate-x-0"
                          }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm">
                      {isTeacher ? "Teacher" : "Student"}
                    </span>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-violet-500 hover:text-violet-700 font-medium"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>


                  <div className="col-span-full">
                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${formik.isSubmitting || isLoading || !formik.dirty || Object.keys(formik.errors).length > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-violet-500 hover:bg-violet-600"
                        }`}
                      disabled={
                        formik.isSubmitting ||
                        isLoading ||
                        !formik.dirty ||
                        Object.keys(formik.errors).length > 0
                      }
                    >
                      {isLoading ? "Submitting..." : "Register"}
                    </button>
                  </div>

                </form>
                <div>
                  <img src="src/assets/svg/Sign-up.gif" alt="" />
                </div>
              </div>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default RegistrationForm;
