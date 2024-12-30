import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateUserMutation } from '../redux/slices/apiSlice';

const UpdateUserModal = ({ user, isOpen, onClose }) => {
    const [updateUser] = useUpdateUserMutation();
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName || '',
        email: user?.email || '',
        bio: user?.bio || '',
        major: user?.major || '',
        socialLinks: {
          linkedin: user?.socialLinks?.linkedin || '',
          twitter: user?.socialLinks?.twitter || ''
        }
      },
      validationSchema: Yup.object({
        fullName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        bio: Yup.string(),
        major: Yup.string(),
        socialLinks: Yup.object({
          linkedin: Yup.string().url('Invalid URL'),
          twitter: Yup.string().url('Invalid URL')
        })
      }),
      onSubmit: async (values) => {
       
        try {
          const response = await updateUser({ id: user.id, ...values }).unwrap();
         
          onClose();
        } catch (error) {
          console.error('Failed to update user:', error); 
        }
      }
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