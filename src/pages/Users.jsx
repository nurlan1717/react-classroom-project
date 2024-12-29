import { useGetUsersQuery } from '../redux/slices/apiSlice';
import { Mail } from 'lucide-react';
import ClassNavbar from './ClassNavbar';

const User = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                Error loading users: {error.message}
            </div>
        );
    }

    const teachers = users?.filter(user => user.role === 'teacher') || [];
    const students = users?.filter(user => user.role === 'student') || [];

    return (
        <>
            <ClassNavbar />
            <div className="max-w-3xl mx-auto p-6 space-y-8">
                <section>
                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Teachers</h2>
                    <div className="space-y-4">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-4">
                                    <img className='w-12' src={teacher.profileImage} alt="" />
                                    <span className="text-gray-900 font-medium">{teacher.fullName || 'Unnamed Teacher'}</span>
                                </div>
                                <button
                                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label="Send email"
                                >
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-medium text-gray-900">Other students</h2>
                        <span className="text-gray-500">{students.length} students</span>
                    </div>
                    <div className="space-y-4">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-4">
                                  
                                    <div>
                                        <img className='w-12' src={student.profileImage} alt="" />
                                    </div>
                                    <span className="text-gray-900 font-medium">{student.fullName || 'Unnamed Student'}</span>
                                </div>
                                <button
                                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label="Send email"
                                >
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};


const getRandomColor = (id) => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500'
    ];
    const index = parseInt(id, 16) % colors.length;
    return colors[index];
};

export default User;
