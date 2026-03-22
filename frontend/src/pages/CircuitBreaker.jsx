import { useState, useEffect } from "react";

const CircuitBreaker = () => {
  const [circuitBreakerState, setCircuitBreakerState] = useState({
    state: "CLOSED",
    failureCount: 0,
    successCount: 0,
    lastFailureTime: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCircuitBreakerState = async () => {
      try {
        // Fetch from API
        setCircuitBreakerState({
          state: "CLOSED",
          failureCount: 2,
          successCount: 50,
          lastFailureTime: "2024-01-15T10:30:00Z",
        });
      } catch (error) {
        console.error("Error fetching circuit breaker state:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuitBreakerState();
  }, []);

  const getStateColor = (state) => {
    switch (state) {
      case "CLOSED":
        return "bg-green-100 text-green-800";
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "HALF_OPEN":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetCircuitBreaker = () => {
    setCircuitBreakerState((prev) => ({
      ...prev,
      state: "CLOSED",
      failureCount: 0,
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Circuit Breaker</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Current State</h2>
          <span
            className={`px-4 py-2 rounded-full text-lg font-bold ${getStateColor(circuitBreakerState.state)}`}
          >
            {circuitBreakerState.state}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Failure Count</p>
            <p className="text-2xl font-bold text-red-600">
              {circuitBreakerState.failureCount}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Success Count</p>
            <p className="text-2xl font-bold text-green-600">
              {circuitBreakerState.successCount}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Last Failure</p>
            <p className="text-lg font-semibold">
              {circuitBreakerState.lastFailureTime
                ? new Date(circuitBreakerState.lastFailureTime).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={resetCircuitBreaker}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Reset Circuit Breaker
        </button>
      </div>
    </div>
  );
};

export default CircuitBreaker;
