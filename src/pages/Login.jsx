import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../redux/slices/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../utils/localStorage";
import bcrypt from "bcryptjs";
import { Helmet } from "react-helmet-async";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { data: users } = useGetUsersQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = storage.getUserRole();
    if (userRole === "student") {
      navigate("/student");
    } else if (userRole === "teacher") {
      navigate("/teacher");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (users) {
        const user = users.find((u) => u.email === values.email);

        if (user) {
          const isPasswordValid = await bcrypt.compare(
            values.password,
            user.password
          );
          console.log(isPasswordValid);
          if (isPasswordValid) {
            storage.setUserAuth(user.id, user.role);
            toast.success("Login successful!", { position: "top-right" });
            navigate(user.role === "teacher" ? "/teacher" : "/student");
            window.location.reload();
          } else {
            formik.setErrors({
              email: "Invalid email or password",
              password: "Invalid email or password",
            });
            toast.error("Invalid email or password", { position: "top-right" });
          }
        } else {
          formik.setErrors({
            email: "Invalid email or password",
            password: "Invalid email or password",
          });
          toast.error("Invalid email or password", { position: "top-right" });
        }
      } else {
        toast.error("Users data not available", { position: "top-right" });
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>ClassCraft Login</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="src/assets/image/user-login.png" />
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-violet-200">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-8 text-center text-violet-700">
            Login
          </h2>
          <div className="flex gap-10">
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 w-1/2 h-6 gap-8 mt-12"
            >
              <div className="col-span-full">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
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

              <div className="col-span-full">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
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

              <div className="col-span-full">
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${formik.isSubmitting || !formik.dirty || Object.keys(formik.errors).length > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-violet-500 hover:bg-violet-600"
                    }`}
                  disabled={
                    formik.isSubmitting ||
                    !formik.dirty ||
                    Object.keys(formik.errors).length > 0
                  }
                >
                  Log in
                </button>
              </div>
            </form>


            <div>
              <img src="src/assets/svg/Login.gif" alt="Login Illustration" />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/" className="text-violet-500 hover:text-violet-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>

    </>
  );
};

export default Login;
