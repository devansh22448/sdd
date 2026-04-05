const StatusCard = ({ title, value, type }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'total':
        return { 
          bg: 'bg-[#172A3A]', 
          text: 'text-[#3AAFA9]', 
          iconBg: 'bg-[#3AAFA9]/10',
          icon: <svg className="w-6 h-6 text-[#3AAFA9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
        };
      case 'success':
        return { 
          bg: 'bg-[#0F2E34]', 
          text: 'text-[#2ECC71]', 
          iconBg: 'bg-[#2ECC71]/10',
          icon: <svg className="w-6 h-6 text-[#2ECC71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        };
      case 'failed':
        return { 
          bg: 'bg-[#0F2E34]', 
          text: 'text-[#E63946]', 
          iconBg: 'bg-[#E63946]/10',
          icon: <svg className="w-6 h-6 text-[#E63946]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        };
      case 'pending':
        return { 
          bg: 'bg-[#0F2E34]', 
          text: 'text-[#FFD166]', 
          iconBg: 'bg-[#FFD166]/10',
          icon: <svg className="w-6 h-6 text-[#FFD166]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        };
      default:
        return { bg: 'bg-[#172A3A]', text: 'text-[#F7F9FA]', iconBg: 'bg-gray-500/10', icon: null };
    }
  };

  const style = getCardStyle();

  return (
    <div className={`${style.bg} border border-[#172A3A] rounded-2xl p-6 flex justify-between items-center transition-transform hover:scale-105 duration-200`}>
      <div>
        <p className="text-[#9FB3B6] text-sm font-medium mb-1">{title}</p>
        <h3 className={`text-3xl font-bold ${style.text}`}>{value}</h3>
      </div>
      <div className={`p-4 rounded-xl ${style.iconBg}`}>
        {style.icon}
      </div>
    </div>
  );
};

export default StatusCard;