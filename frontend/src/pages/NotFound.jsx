import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-devops-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-devops-text mb-4">404</h1>
        <p className="text-xl text-devops-text-secondary mb-8">Page not found</p>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-devops-purple hover:bg-devops-purple-light text-white rounded-xl font-medium transition-all shadow-lg shadow-devops-purple/20 hover:shadow-devops-purple/40"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
