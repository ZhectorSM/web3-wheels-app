const StatsCard = ({ title, value, up, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {children}
      </div>
      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-4">
        {value}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {`+${up}% from last month`}
      </p>
    </div>
  );
};

export default StatsCard;
