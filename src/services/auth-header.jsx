export default function authHeader() {
  const token = localStorage.getItem("token");

  // Check if token exists and is not null/undefined
  if (token) {
    try {
      const parsedToken = JSON.parse(token);
      console.log(parsedToken,"parsedtojken")

      if (parsedToken) {
        // Return the parsed token in the expected format
        return { "x-access-token": parsedToken };
      }
    } catch (error) {
      console.error("Failed to parse token:", error);
    }
  }

  return {};
}
