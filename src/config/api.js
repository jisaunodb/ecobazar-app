// =============================================================================
// 🌐 BACKEND API CONFIGURATION (EcoBazar React Native)
// 👉 এখানে আপনার ব্যাকএন্ড API লিঙ্ক বসিয়ে দিন (Paste your Backend API URL here)
// =============================================================================

// উদাহরণ:
// - লোকালহোস্ট টেস্ট করতে আপনার পিসির IP দিন: "http://192.168.0.105:5000/api"
// - আপনার লাইভ রেন্ডার ব্যাকএন্ড:
export const API_BASE_URL = "https://ecobazar-backend-1qs6.onrender.com"; 

// Default headers helper
export const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
