// =============================================================================
// 🌐 BACKEND API CONFIGURATION (EcoBazar React Native)
// 👉 এখানে আপনার ব্যাকএন্ড API লিঙ্ক বসিয়ে দিন (Paste your Backend API URL here)
// =============================================================================

// উদাহরণ:
// - লোকালহোস্ট টেস্ট করতে আপনার পিসির IP দিন: "http://192.168.0.105:5000/api"
// - লাইভ সার্ভার: "https://api.yourdomain.com/api"
export const API_BASE_URL = ""; 

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
