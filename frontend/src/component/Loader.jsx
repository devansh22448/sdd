const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-light-purple/30 border-t-primary ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default Loader;