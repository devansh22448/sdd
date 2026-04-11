const CircuitBreaker = require("opossum");

const options = {
  timeout: 5000, // 5 seconds max
  errorThresholdPercentage: 50, // open circuit if 50% requests fail
  resetTimeout: 10000, // try again after 10 seconds
};

// Generic async executor (accepts function and runs it)
const asyncHandler = async (fn) => {
  return await fn();
};

// Create single reusable breaker instance
const breaker = new CircuitBreaker(asyncHandler, options);

// Fallback when circuit is OPEN or request fails
breaker.fallback((fn) => {
  console.error("⚡ Circuit breaker fallback triggered");

  return {
    success: false,
    message: "Service temporarily unavailable",
  };
});

// Logging (very helpful for debugging & interviews)
breaker.on("open", () => console.log("🔴 Circuit OPEN"));
breaker.on("halfOpen", () => console.log("🟡 Circuit HALF-OPEN"));
breaker.on("close", () => console.log("🟢 Circuit CLOSED"));

module.exports = breaker;
