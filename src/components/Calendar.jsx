import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <>
            <Helmet>
                <title>Calendar</title>
                <meta name="description" content="Classroom" />
                <meta name="author" content="Nurlan, Qerib" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
            </Helmet>
            <div className="mt-24 flex items-center justify-center">
                <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Calendar
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                inline
                                className="rounded-lg border-gray-300 shadow-lg"
                            />
                        </div>

                        {/* Selected Date Info */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
                            <p className="text-lg font-medium text-gray-600">
                                Date:
                            </p>
                            <p className="text-2xl font-semibold text-blue-600 mt-2">
                                {selectedDate.toDateString()}
                            </p>

                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default Calendar;
