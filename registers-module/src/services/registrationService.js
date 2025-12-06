export const registerUser = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User registered:", data);
      resolve({ success: true });
    }, 1000);
  });
};
