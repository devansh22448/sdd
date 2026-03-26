import { useState, useEffect } from "react";
import { Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";

const FooterSettings = () => {
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactPhone: "",
    address: "",
    description: "",
    linkedin: "",
    github: "",
    twitter: "",
    youtube: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/footer`);
      const result = await response.json();

      if (result.success && result.data) {
        const { socialLinks = {} } = result.data;
        setFormData({
          contactEmail: result.data.contactEmail || "",
          contactPhone: result.data.contactPhone || "",
          address: result.data.address || "",
          description: result.data.description || "",
          linkedin: socialLinks.linkedin || "",
          github: socialLinks.github || "",
          twitter: socialLinks.twitter || "",
          youtube: socialLinks.youtube || "",
          isActive: result.data.isActive !== false,
        });
      }
    } catch (err) {
      console.error("Error fetching footer:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: formData.address,
        description: formData.description,
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github,
          twitter: formData.twitter,
          youtube: formData.youtube,
        },
        isActive: formData.isActive,
      };

      // First try to get existing footer to update it
      const getResponse = await fetch(`${API_URL}/api/footer`);
      const getResult = await getResponse.json();

      let response;
      if (getResult.success && getResult.data && getResult.data._id) {
        // Update existing
        response = await fetch(`${API_URL}/api/footer/${getResult.data._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new
        response = await fetch(`${API_URL}/api/footer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: "success",
          message: "Footer settings saved successfully!",
        });
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to save footer settings",
        });
      }
    } catch (err) {
      console.error("Error saving footer:", err);
      setStatus({ type: "error", message: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0A2328] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3AAFA9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2328] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F7F9FA]">Footer Settings</h1>
          <p className="text-[#9FB3B6] mt-1">
            Manage your dashboard footer information
          </p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              status.type === "success"
                ? "bg-[#3AAFA9]/10 border border-[#3AAFA9]/30 text-[#3AAFA9]"
                : "bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946]"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information Card */}
          <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A]">
            <h2 className="text-lg font-semibold text-[#F7F9FA] mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="support@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9] resize-none"
                  placeholder="Brief description about your dashboard"
                />
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A]">
            <h2 className="text-lg font-semibold text-[#F7F9FA] mb-4">
              Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9FB3B6] mb-2">
                  YouTube URL
                </label>
                <input
                  type="url"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9]"
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#F7F9FA]">
                  Active Status
                </h2>
                <p className="text-sm text-[#9FB3B6] mt-1">
                  Enable to show footer on the dashboard
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-[#172A3A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3AAFA9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#3AAFA9]"></div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Footer Settings</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FooterSettings;
