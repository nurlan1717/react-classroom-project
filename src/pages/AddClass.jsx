import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetUsersQuery, useCreateClassMutation } from "../redux/slices/apiSlice";
import { toast } from "react-hot-toast";
import { storage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
    const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
    const [createClass, { isLoading: isCreating }] = useCreateClassMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        studentIds: Yup.array().of(Yup.string()).min(1),
        schedule: Yup.array().of(
            Yup.object().shape({
                day: Yup.string().required(),
                time: Yup.string().required(),
                topics: Yup.array().of(
                    Yup.string().required()
                ).min(1),
                major: Yup.string().required(),
            })
        ).min(1),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            studentIds: [],
            schedule: [{ day: "", time: "", topics: [""], major: "" }],
        },
        validationSchema,
        onSubmit: async (values) => {
            const teacherId = storage.getUserId()
            const payload = {
                ...values,
                teacherId
            };

            await createClass(payload).unwrap();
            toast.success("Class created successfully!");
            formik.resetForm();
            navigate("/");
            window.location.reload();
        },
    });

    const studentUsers = users?.filter((user) => user.role === "student") || [];


    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Add Class</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Class Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter class name"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Add Students</label>
                    <select
                        onChange={(e) => {
                            const selectedStudent = e.target.value;
                            if (selectedStudent && !formik.values.studentIds.includes(selectedStudent)) {
                                formik.setFieldValue("studentIds", [...formik.values.studentIds, selectedStudent]);
                            }
                        }}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoadingUsers}
                    >
                        <option value="">Select a student</option>
                        {studentUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>

                    {formik.values.studentIds.length > 0 && (
                        <ul className="mt-2 space-y-2">
                            {formik.values.studentIds.map((id) => (
                                <li key={id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <span>{studentUsers.find((user) => user.id === id)?.username || id}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            formik.setFieldValue(
                                                "studentIds",
                                                formik.values.studentIds.filter((studentId) => studentId !== id)
                                            );
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Schedule</label>
                    {formik.values.schedule.map((entry, index) => (
                        <div key={index} className="p-4 border rounded mb-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Day</label>
                                    <input
                                        type="text"
                                        name={`schedule.${index}.day`}
                                        value={entry.day}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Monday"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Time</label>
                                    <input
                                        type="text"
                                        name={`schedule.${index}.time`}
                                        value={entry.time}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., 09:00 AM"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Topics</label>
                                {entry.topics.map((topic, topicIndex) => (
                                    <div key={topicIndex} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            name={`schedule.${index}.topics.${topicIndex}`}
                                            value={topic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter topic"
                                        />
                                        {entry.topics.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newTopics = [...entry.topics];
                                                    newTopics.splice(topicIndex, 1);
                                                    formik.setFieldValue(`schedule.${index}.topics`, newTopics);
                                                }}
                                                className="ml-2 p-2 text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        formik.setFieldValue(
                                            `schedule.${index}.topics`,
                                            [...entry.topics, ""]
                                        );
                                    }}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    Add Topic
                                </button>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Major</label>
                                <input
                                    type="text"
                                    name={`schedule.${index}.major`}
                                    value={entry.major}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter major"
                                />
                            </div>

                            {formik.values.schedule.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newSchedule = [...formik.values.schedule];
                                        newSchedule.splice(index, 1);
                                        formik.setFieldValue("schedule", newSchedule);
                                    }}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Remove Schedule
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            formik.setFieldValue("schedule", [
                                ...formik.values.schedule,
                                { day: "", time: "", topics: [""], major: "" }
                            ]);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Add Schedule
                    </button>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isCreating || !formik.isValid}
                        className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors
                            ${(isCreating || !formik.isValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isCreating ? 'Creating...' : 'Create Class'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;