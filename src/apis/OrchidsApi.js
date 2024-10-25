const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

export const createOrchid = async (orchid) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orchid),
      credentials: "same-origin",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating orchid: ", error);
    throw error;
  }
};
