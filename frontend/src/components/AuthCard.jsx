const AuthCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AuthCard;
