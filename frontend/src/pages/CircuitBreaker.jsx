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
        return "bg-devops-success/20 text-devops-success border-devops-success/30";
      case "OPEN":
        return "bg-devops-error/20 text-devops-error border-devops-error/30";
      case "HALF_OPEN":
        return "bg-devops-warning/20 text-devops-warning border-devops-warning/30";
      default:
        return "bg-devops-text-secondary/20 text-devops-text-secondary border-devops-text-secondary/30";
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-devops-text">Circuit Breaker</h1>
        <p className="text-devops-text-secondary mt-1">Monitor and manage service resilience</p>
      </div>

      <div className="bg-devops-card rounded-xl border border-devops-border p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-devops-text">Current State</h2>
          <span
            className={`px-4 py-2 rounded-full text-lg font-bold border ${getStateColor(circuitBreakerState.state)}`}
          >
            {circuitBreakerState.state}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-devops-bg rounded-lg">
            <p className="text-sm text-devops-text-secondary">Failure Count</p>
            <p className="text-2xl font-bold text-devops-error">
              {circuitBreakerState.failureCount}
            </p>
          </div>
          <div className="p-4 bg-devops-bg rounded-lg">
            <p className="text-sm text-devops-text-secondary">Success Count</p>
            <p className="text-2xl font-bold text-devops-success">
              {circuitBreakerState.successCount}
            </p>
          </div>
          <div className="p-4 bg-devops-bg rounded-lg">
            <p className="text-sm text-devops-text-secondary">Last Failure</p>
            <p className="text-lg font-semibold text-devops-text">
              {circuitBreakerState.lastFailureTime
                ? new Date(circuitBreakerState.lastFailureTime).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={resetCircuitBreaker}
          className="px-4 py-2 bg-devops-purple hover:bg-devops-purple-light text-white rounded-lg transition-colors shadow-lg shadow-devops-purple/20"
        >
          Reset Circuit Breaker
        </button>
      </div>
    </div>
  );
};

export default CircuitBreaker;
