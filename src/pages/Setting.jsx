import React, { useState } from 'react';
import {
    Bell,
    Book,
    Clock,
    Globe,
    GraduationCap,
    Languages,
    Lock,
    MessageSquare,
    Settings,
    User,
    Users,
    UserCog
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';


function Setting() {
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('az');
    const [timezone, setTimezone] = useState('UTC+04:00');
    const [userRole, setUserRole] = useState('teacher');
    const { t } = useTranslation();


    const user = useSelector((state) => state.user.currentUser);

    return (
        <>
            <Helmet>
                <title>{t("sidebar.settings")}</title>
                <meta name="description" content="Classroom" />
                <meta name="author" content="Nurlan, Qerib" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
            </Helmet>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex items-center gap-3">
                            <Settings className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-2xl font-bold text-gray-800">Users {t("sidebar.settings")}</h1>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setUserRole('teacher')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${userRole === 'teacher'
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-indigo-200'
                                    }`}
                            >
                                <UserCog className="w-5 h-5" />
                                Teacher
                            </button>
                            <button
                                onClick={() => setUserRole('student')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${userRole === 'student'
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-indigo-200'
                                    }`}
                            >
                                <GraduationCap className="w-5 h-5" />
                                Student
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Profile {t("sidebar.settings")}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        value={user?.fullName}
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Email
                                    </label>
                                    <input
                                        value={user?.email}
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                        </section>

                        {userRole === 'student' && (
                            <section className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <Book className="w-5 h-5 text-indigo-500" />
                                    Education Info
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Class
                                        </label>
                                        <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option>Class</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Student ID
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                                            defaultValue={user.id}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {userRole === 'teacher' && (
                            <section className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <Book className="w-5 h-5 text-indigo-500" />
                                    Teacher {t("sidebar.settings")}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Major
                                        </label>
                                        <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option>{user?.major}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Teacher ID
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                                            defaultValue={user?.id}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-indigo-500" />
                                Notification {t("sidebar.settings")}
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-700">
                                            {userRole === 'teacher' ? 'Class Announcements' : 'Class Announcements'}
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications}
                                            onChange={(e) => setNotifications(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-500" />
                                Language and Time Zone
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <div className="flex items-center gap-2">
                                            <Languages className="w-4 h-4" />
                                            System Language
                                        </div>
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="az">Azərbaycan dili</option>
                                        <option value="en">English</option>
                                        <option value="ru">Русский</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Time Zone
                                        </div>
                                    </label>
                                    <select
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="UTC+04:00">Bakı (UTC+04:00)</option>
                                        <option value="UTC+03:00">Moscow (UTC+03:00)</option>
                                        <option value="UTC+00:00">London (UTC+00:00)</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-indigo-500" />
                                Security
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="New password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Re-enter password"
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="pt-4">
                            <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                                Remember {t("sidebar.settings")}
                            </button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default Setting;