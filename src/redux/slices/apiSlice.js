import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updatedData, 
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),

    getClasses: builder.query({
      query: () => "/classes",
    }),

    createClass: builder.mutation({
      query: (newClass) => ({
        url: "/classes",
        method: "POST",
        body: newClass,
      }),
    }),

    updateClass: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/classes/${id}`,
        method: "PATCH", 
        body: updatedData, 
      }),
    }),

    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
    }),

    getTasks: builder.query({
      query: () => "/tasks",
    }),

    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
    }),

    updateTask: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedData, 
      }),
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),

    getAssignments: builder.query({
      query: () => "/assignments",
    }),

    createAssignment: builder.mutation({
      query: (newAssignment) => ({
        url: "/assignments",
        method: "POST",
        body: newAssignment,
      }),
    }),

    updateAssignment: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/assignments/${id}`,
        method: "PATCH", 
        body: updatedData, 
      }),
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
    }),

    getMaterials: builder.query({
      query: () => "/materials",
    }),

    createMaterial: builder.mutation({
      query: (newMaterial) => ({
        url: "/materials",
        method: "POST",
        body: newMaterial,
      }),
    }),

    updateMaterial: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/materials/${id}`,
        method: "PATCH",
        body: updatedData, 
      }),
    }),

    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
    }),

    getMajors: builder.query({
      query: () => "/majors",
    }),

    createMajor: builder.mutation({
      query: (newMajor) => ({
        url: "/majors",
        method: "POST",
        body: newMajor,
      }),
    }),

    updateMajor: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/majors/${id}`,
        method: "PATCH", 
        body: updatedData, 
      }),
    }),

    deleteMajor: builder.mutation({
      query: (id) => ({
        url: `/majors/${id}`,
        method: "DELETE",
      }),
    }),

    getInvitations: builder.query({
      query: () => "/invitations",
    }),

    createInvitation: builder.mutation({
      query: (newInvitation) => ({
        url: "/invitations",
        method: "POST",
        body: newInvitation,
      }),
    }),

    updateInvitation: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/invitations/${id}`,
        method: "PATCH", 
        body: updatedData, 
      }),
    }),

    deleteInvitation: builder.mutation({
      query: (id) => ({
        url: `/invitations/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetMaterialsQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
  useGetMajorsQuery,
  useCreateMajorMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useUpdateInvitationMutation,
  useDeleteInvitationMutation,
} = apiSlice;

export default apiSlice;
