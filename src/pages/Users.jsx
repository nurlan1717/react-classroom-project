import { useParams } from 'react-router-dom';
import { useGetClassesQuery, useGetUsersQuery } from '../redux/slices/apiSlice';
import { Mail } from 'lucide-react';
import ClassNavbar from './ClassNavbar';
import { useSelector } from 'react-redux';

const User = () => {
    const { id } = useParams();

    const user = useSelector((state) => state.user.currentUser);
    const { data: classes } = useGetClassesQuery();

    const classData = classes?.find((cls) => `:${cls.id}` === id);
    const { data: users } = useGetUsersQuery()
    const students = users ? users?.filter((user) => classData?.studentIds.includes(user.id)) : [];
    const teacher = users ? users?.filter((user) => classData?.teacherId.includes(user.id))[0] : [];
    return (
        <>
            <ClassNavbar />
            <div className="max-w-3xl mx-auto p-6 space-y-8">
                {user && (
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-6">
                            Teacher Information
                        </h2>
                        <div className="flex items-center space-x-4">
                            <img className="w-12" src={teacher.profileImage} alt={teacher.fullName} />
                            <span className="text-gray-900 font-medium">{teacher.fullName || 'Unnamed Teacher'}</span>
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Students in Class</h2>
                    <div className="space-y-4">
                        {students?.length > 0 ? (
                            students?.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img className="w-12" src={student?.profileImage} alt={student?.fullName} />
                                        <span className="text-gray-900 font-medium">{student?.fullName}</span>
                                    </div>
                                    <button
                                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                        aria-label="Send email"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-center p-4">No students found in this class.</div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default User;
