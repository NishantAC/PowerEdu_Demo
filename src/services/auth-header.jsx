export default function authHeader() {
  const token = localStorage.getItem("powerEduAuthToken");

  // Check if token exists and is not null/undefined
  if (token) {
    try {
      const parsedToken = JSON.parse(token);

      if (parsedToken) {
        return { "x-access-token": parsedToken };
      }
    } catch (error) {
      console.error("Failed to parse token:", error);
    }
  }

  return {};
}
