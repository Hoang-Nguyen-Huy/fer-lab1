const baseUrl = `https://670f54e33e71518616575e20.mockapi.io/orchids-lab`;

export const getAllOrchids = async () => {
  try {
    const response = await fetch(`${baseUrl}?sortBy=Id&order=desc`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orchids:", error);
    throw error;
  }
};
