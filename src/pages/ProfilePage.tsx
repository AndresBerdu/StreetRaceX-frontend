import { BiSolidCarCrash } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { HiTrophy } from "react-icons/hi2";
import ae86 from "../assets/vehicles/toyota-AE86.webp";
import user from "../assets/perfils/takumi.jpg";
import rank from "../assets/ranks/rank.webp";
import { PiRanking } from "react-icons/pi";
import { IoCarSportOutline, IoLocationOutline } from "react-icons/io5";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaMap, FaMountain, FaTreeCity } from "react-icons/fa6";

export const ProfilePage = () => {
  return (
    <div className="min-h-screen mx-5">
      <div className="flex flex-col justify-center items-center">
        <img
          src={user}
          className="rounded-full h-30 w-30 object-center object-cover outline-4 outline-green-500 outline-offset-4"
        />
        <h2 className="font-bold text-4xl mt-4">username</h2>
      </div>
      <div className="flex justify-between mt-5 text-xl">
        <div className="flex flex-col justify-center items-center">
          <HiTrophy
            size={70}
            className="bg-yellow-500 p-3 text-white rounded-full"
          />
          <h3 className="font-medium">victories</h3>
          <span>3</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <GoGoal
            size={70}
            className="bg-blue-500 p-3 text-white rounded-full"
          />
          <h3 className="font-medium">c. victories</h3>
          <span>3</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <BiSolidCarCrash
            size={70}
            className="bg-red-500 p-3 text-white rounded-full"
          />
          <h3 className="font-medium">defeats</h3>
          <span>3</span>
        </div>
      </div>
      {/* Ranks */}
      <div className="flex flex-col gap-2 justify-center mt-7">
        <h3 className="flex items-center jus capitalize text-3xl font-bold">
          rank{" "}
          <span className="ml-2">
            <PiRanking />
          </span>
        </h3>
        <div className="flex items-center justify-between mt-3">
          <img src={rank} className="bg-gray-900 w-20 h-20 p-2 rounded-xl" />
          <span className="text-2xl">legend: S</span>
        </div>
      </div>
      {/* Location */}
      <div className="flex flex-col gap-2 justify-center mt-7">
        <h3 className="flex items-center capitalize text-3xl font-bold">
          location{" "}
          <span className="ml-2">
            <IoLocationOutline />
          </span>
        </h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 text-xl mt-3">
          <div>
            <h4 className="flex items-center  capitalize font-bold">
              locality{" "}
              <span className="ml-2">
                <BsFillBuildingFill />
              </span>
            </h4>
            <span>Akina</span>
          </div>
          <div>
            <h4 className="flex items-center capitalize font-bold">
              city{" "}
              <span className="ml-2">
                <FaTreeCity />
              </span>
            </h4>
            <span>tokyo</span>
          </div>
          <div>
            <h4 className="flex items-center capitalize font-bold">
              state{" "}
              <span className="ml-2">
                <FaMountain />
              </span>
            </h4>
            <span>tokyo d.c</span>
          </div>
          <div>
            <h4 className="flex items-center capitalize font-bold">
              country{" "}
              <span className="ml-2">
                <FaMap />
              </span>
            </h4>
            <span>japan</span>
          </div>
        </div>
      </div>
      {/* Vehicles */}
      <div className="flex flex-col gap-2 justify-center mt-10">
        <h3 className="flex items-center capitalize text-3xl font-bold">
          vehicles{" "}
          <span className="ml-2">
            <IoCarSportOutline />
          </span>
        </h3>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">AE86</h3>
            <span className="bg-green-600 text-white font-semibold py-0.5 px-2 rounded-sm">
              active
            </span>
          </div>
          <img
            src={ae86}
            className="w-full object-center object-cover rounded-sm mt-2 shadow-2xl"
          />
          <div className="flex gap-2">
            <h3>Races:</h3>
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
  );
};
