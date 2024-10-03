const Analytics = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Top Row with 4 Partitions */}
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="p-4 bg-blue-200">Partition 1</div>
        <div className="p-4 bg-blue-300">Partition 2</div>
        <div className="p-4 bg-blue-400">Partition 3</div>
        <div className="p-4 bg-blue-500">Partition 4</div>
      </div>

      {/* Bottom Row with 3 Partitions */}
      <div className="grid grid-cols-3 gap-4 w-full mt-4">
        <div className="p-4 bg-green-200">Partition 5</div>
        <div className="p-4 bg-green-300">Partition 6</div>
        <div className="p-4 bg-green-400">Partition 7</div>
      </div>
    </div>
  );
};

export default Analytics;
