import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateUserMutation } from "../redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice"; 
import { CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET } from "../constants/cloudinary"; 

const UpdateUserModal = ({ user, isOpen, onClose }) => {
  const [updateUserApi] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(user?.profileImage || "");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      major: user?.major || "",
      socialLinks: {
        linkedin: user?.socialLinks?.linkedin || "",
        twitter: user?.socialLinks?.twitter || "",
      },
      profileImage: "", 
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      bio: Yup.string(),
      major: Yup.string(),
      socialLinks: Yup.object({
        linkedin: Yup.string().url("Invalid URL"),
        twitter: Yup.string().url("Invalid URL"),
      }),
    }),
    onSubmit: async (values) => {
      console.log("Submitting values:", values);

      try {
       
        let profileImageUrl = imagePreview;

        if (values.profileImage) {
          const formData = new FormData();
          formData.append("file", values.profileImage);
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

          const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          if (data.secure_url) {
            profileImageUrl = data.secure_url;
          }
        }

       
        const response = await updateUserApi({ id: user.id, ...values, profileImage: profileImageUrl }).unwrap();
        console.log("Update response:", response);

        
        dispatch(updateUser(response)); 

        
        onClose();
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Update Profile Information</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Major</label>
            <input
              type="text"
              name="major"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.major}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="url"
              name="socialLinks.linkedin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.socialLinks.linkedin}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
            <input
              type="url"
              name="socialLinks.twitter"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.socialLinks.twitter}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={(e) => {
                formik.setFieldValue("profileImage", e.currentTarget.files[0]);
                setImagePreview(URL.createObjectURL(e.currentTarget.files[0]));
              }}
              className="mt-1 block w-full text-sm"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
