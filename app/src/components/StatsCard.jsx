import axios from "axios";
import { useState } from "react";

const StatsCard = ({ title, value, up, children, passenger }) => {

  const [linkPrice, setLinkPrice] = useState(0);

  const dextools = async () => {
    try {
      const res = await axios.get(
        "https://api.dextools.io/v2/token/ether/0x514910771af9ca656af840dff83e8264ecf986ca",
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY
          }
        }
      );
      console.log(res.data.price);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {children}
      </div>
      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-4">
        {passenger? " ": "$"}
        {value}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {`+${value === 0? "0":up}% from last week`}
      </p>
    </div>
  );
};

export default StatsCard;
