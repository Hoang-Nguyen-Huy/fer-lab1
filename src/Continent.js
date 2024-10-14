export const getContinent = (origin) => {
  const continents = {
    Asia: [
      "China",
      "Japan",
      "Thailand",
      "Vietnam",
      "Indonesia",
      "Philippines",
      "Malaysia",
      "India",
    ],
    Europe: [
      "Netherlands",
      "Germany",
      "France",
      "Italy",
      "Spain",
      "United Kingdom",
    ],
    "North America": ["United States", "Canada", "Mexico"],
    "South America": ["Brazil", "Colombia", "Peru", "Ecuador"],
    Africa: ["South Africa", "Kenya", "Tanzania", "Madagascar"],
    Oceania: ["Australia", "New Zealand", "Papua New Guinea"],
  };

  for (const [continent, countries] of Object.entries(continents)) {
    if (countries.includes(origin)) {
      return continent;
    }
  }
  return "Other";
};
