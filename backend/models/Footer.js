import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default:
        "Smart DevOps Dashboard - Monitor your deployments, logs, metrics, and infrastructure in real-time.",
    },
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      youtube: {
        type: String,
        trim: true,
      },
    },
    quickLinks: [
      {
        label: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure only one active footer record
footerSchema.pre("save", async function (next) {
  if (this.isActive) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id }, isActive: true },
      { isActive: false },
    );
  }
  next();
});

// Static method to get active footer
footerSchema.statics.getActiveFooter = async function () {
  return this.findOne({ isActive: true });
};

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;
