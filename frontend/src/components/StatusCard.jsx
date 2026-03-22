const StatusCard = ({ title, value, icon, color = "aqua" }) => {
  const colorClasses = {
    aqua: "text-[#3AAFA9] bg-[#3AAFA9]/10",
    yellow: "text-[#FFD166] bg-[#FFD166]/10",
    green: "text-[#2ECC71] bg-[#2ECC71]/10",
    red: "text-[#E63946] bg-[#E63946]/10",
  };

  return (
    <div className="bg-[#0F2E34] rounded-xl p-6 border border-[#172A3A] hover:border-[#3AAFA9] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#9FB3B6] text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#F7F9FA]">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
