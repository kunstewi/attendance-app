import type { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:5173", // frontend
  "https://your-production-domain.com",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true, // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
