const baseUrl = `https://670f54e33e71518616575e20.mockapi.io/orchids-lab`;

export const getAllOrchids = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orchids:", error);
    throw error;
  }
};

export const getSpecialOrchids = async () => {
  try {
    const response = await fetch(`${baseUrl}?isSpecial=true`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orchids:", error);
    throw error;
  }
};

export const getOrchidById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}?Id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching orchids:", error);
    throw error;
  }
};
