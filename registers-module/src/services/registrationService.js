
export async function registerUser(data) {
  try {
    const response = await fetch("http://localhost:5000/deaths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Failed to save data.");

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
