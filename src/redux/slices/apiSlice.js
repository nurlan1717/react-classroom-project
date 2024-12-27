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
  useDeleteUserMutation,
  useGetClassesQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetMaterialsQuery,
  useCreateMaterialMutation,
  useDeleteMaterialMutation,
  useGetMajorsQuery,
  useCreateMajorMutation,
  useDeleteMajorMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
} = apiSlice;

export default apiSlice;
