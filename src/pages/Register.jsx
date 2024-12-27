import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useCreateUserMutation } from "../redux/slices/apiSlice";
import { toast, ToastContainer } from "react-toastify";

const CLOUDINARY_UPLOAD_PRESET = "cloudinary-animals-app";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgab5avil/image/upload";

const RegistrationForm = () => {
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
      overallGrade: 0
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      fullName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6, "Password must be at least 6 characters").required(),
      major: Yup.string().required(),
      profileImage: Yup.string().required(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const result = await createUser(values).unwrap();
        toast.success("Registration successful!");
        resetForm();
        setImageUrl(null);
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

  const handleRoleChange = () => {
    setIsTeacher(!isTeacher);
    formik.setFieldValue("role", !isTeacher ? "teacher" : "student");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-violet-600">Register</h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 border border-gray-300 rounded-md"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-sm text-red-500">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-3 border border-gray-300 rounded-md"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-sm text-red-500">{formik.errors.fullName}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="major">
              Major
            </label>
            <input
              type="text"
              id="major"
              name="major"
              className="w-full p-3 border border-gray-300 rounded-md"
              {...formik.getFieldProps("major")}
            />
            {formik.touched.major && formik.errors.major && (
              <div className="text-sm text-red-500">{formik.errors.major}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profileImage">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="w-full"
              onChange={handleImageUpload}
            />
            {formik.touched.profileImage && formik.errors.profileImage && (
              <div className="text-sm text-red-500">{formik.errors.profileImage}</div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="role">
              Role
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="teacher"
                className="mr-2"
                checked={isTeacher}
                onChange={handleRoleChange}
              />
              <span>{isTeacher ? "Teacher" : "Student"}</span>
            </div>
          </div>

          <div className="col-span-full">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                className="text-violet-500 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="col-span-full pointer">
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md transition ${formik.isSubmitting ||
                isLoading ||
                !formik.dirty ||
                Object.keys(formik.errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-violet-500 text-white hover:bg-violet-600"
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default RegistrationForm;
