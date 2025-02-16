import { Schema, model, models } from "mongoose";

// Define Mongoose schema with optimized NoSQL structure
const UserSchema = new Schema({
  externalId: { type: String, unique: true },
  username: { type: String, unique: true, sparse: true },
  fullName: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  phone: {
    number: { type: String, unique: true, sparse: true },
    verified: { type: Boolean, default: false }
  },
  birthDate: { type: Date, default: null },

  roles: [{ type: String, enum: ['superadmin', 'admin', 'editor', 'translator', 'proofreader', 'moderator'] }],

  profile: {
    picture: { type: String, default: null },
    bio: { type: String, default: null },
    website: { type: String, default: null },
    socialLinks: { type: Map, of: String, default: {} }
  },

  status: {
    active: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    lastActivity: { type: Date, default: Date.now },
    emailVerified: { type: Boolean, default: false }
  },

  security: {
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: null },
    passwordResetToken: { type: String, default: null },
    passwordResetExpiry: { type: Date, default: null },
    lastPasswordChange: { type: Date, default: null },
    failedLoginAttempts: { type: Number, default: 0 },
    accountLockedUntil: { type: Date, default: null }
  },

  location: {
    country: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    postalCode: { type: String, default: null },
    address: { type: String, default: null }
  },

  preferences: {
    language: { type: String, default: null },
    timezone: { type: String, default: null },
    notifications: { type: String, default: null },
    darkMode: { type: Boolean, default: false }
  },

  metadata: {
    customAttributes: { type: Map, of: String, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  deletion: {
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', default: null
    }
  }
});
const User = models.User || model("User", UserSchema);
export default User;
