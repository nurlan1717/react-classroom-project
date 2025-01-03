import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Users", "Classes", "Tasks", "Assignments", "Materials", "Majors", "Invitations","Announcements"], 
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    getClasses: builder.query({
      query: () => "/classes",
      providesTags: ["Classes"],
    }),
    createClass: builder.mutation({
      query: (newClass) => ({
        url: "/classes",
        method: "POST",
        body: newClass,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClass: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Classes"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
    }),

    
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignments"],
    }),
    createAssignment: builder.mutation({
      query: (newAssignment) => ({
        url: "/assignments",
        method: "POST",
        body: newAssignment,
      }),
      invalidatesTags: ["Assignments"],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),

    
    getMaterials: builder.query({
      query: () => "/materials",
      providesTags: ["Materials"],
    }),
    createMaterial: builder.mutation({
      query: (newMaterial) => ({
        url: "/materials",
        method: "POST",
        body: newMaterial,
      }),
      invalidatesTags: ["Materials"],
    }),
    updateMaterial: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/materials/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Materials"],
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Materials"],
    }),

    
    getMajors: builder.query({
      query: () => "/majors",
      providesTags: ["Majors"],
    }),
    createMajor: builder.mutation({
      query: (newMajor) => ({
        url: "/majors",
        method: "POST",
        body: newMajor,
      }),
      invalidatesTags: ["Majors"],
    }),
    updateMajor: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/majors/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Majors"],
    }),
    deleteMajor: builder.mutation({
      query: (id) => ({
        url: `/majors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Majors"],
    }),

  
    getInvitations: builder.query({
      query: () => "/invitations",
      providesTags: ["Invitations"],
    }),
    createInvitation: builder.mutation({
      query: (newInvitation) => ({
        url: "/invitations",
        method: "POST",
        body: newInvitation,
      }),
      invalidatesTags: ["Invitations"],
    }),
    updateInvitation: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/invitations/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Invitations"],
    }),
    deleteInvitation: builder.mutation({
      query: (id) => ({
        url: `/invitations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invitations"],
    }),




    getAnnouncements: builder.query({
      query: () => "/announcements",
      providesTags: ["Announcements"],
    }),
    createAnnouncements: builder.mutation({
      query: (newAnnouncements) => ({
        url: "/announcements",
        method: "POST",
        body: newAnnouncements,
      }),
      invalidatesTags: ["Announcements"],
    }),
    updateAnnouncements: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/announcements/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Majors"],
    }),
    deleteAnnouncements: builder.mutation({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcements"],
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
  useGetAnnouncementsQuery,
  useCreateAnnouncementsMutation,
  useUpdateAnnouncementsMutation,
  useDeleteAnnouncementsMutation
} = apiSlice;

export default apiSlice;
