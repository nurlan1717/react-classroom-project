import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { storage } from "../utils/localStorage";
import { Link } from "react-router-dom";

const NotFound = () => {
  const userİd = storage.getUserId();
  if (!userİd) {
    return null;
  }
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Link to="/student" color="gray" className="w-full px-4 md:w-[8rem] bg-violet-300 rounded-xl p-2">
          Back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
