import { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mock data
        setNotifications([
          {
            id: 1,
            type: "success",
            message: "Deployment completed successfully",
            timestamp: "2024-01-15T10:30:00Z",
            read: false,
          },
          {
            id: 2,
            type: "warning",
            message: "High CPU usage detected",
            timestamp: "2024-01-15T09:15:00Z",
            read: false,
          },
          {
            id: 3,
            type: "info",
            message: "New deployment available",
            timestamp: "2024-01-14T16:45:00Z",
            read: true,
          },
        ]);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "success":
        return "bg-devops-success/20 text-devops-success border-devops-success/30";
      case "warning":
        return "bg-devops-warning/20 text-devops-warning border-devops-warning/30";
      case "error":
        return "bg-devops-error/20 text-devops-error border-devops-error/30";
      default:
        return "bg-devops-purple/20 text-devops-purple border-devops-purple/30";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-devops-text">Notifications</h1>
          <p className="text-devops-text-secondary mt-1">Stay updated with your deployments</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-devops-purple hover:text-devops-purple-light text-sm font-medium transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-devops-card rounded-xl border border-devops-border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-devops-text-secondary">No notifications</div>
        ) : (
          <div className="divide-y divide-devops-border/50">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start gap-4 hover:bg-devops-bg/30 transition-colors ${!notification.read ? "bg-devops-purple/5" : ""}`}
              >
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(notification.type)}`}
                >
                  {notification.type}
                </div>
                <div className="flex-1">
                  <p className={!notification.read ? "text-devops-text font-semibold" : "text-devops-text-secondary"}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-devops-text-secondary mt-1 font-mono">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-devops-purple hover:text-devops-purple-light font-medium transition-colors"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
