import { useQuery } from "@tanstack/react-query";
import { FilterOptions } from "../page";

export function useArtworkSearch(keyword: string, filters: FilterOptions) {
  return useQuery({
    queryKey: ["artworkSearch", keyword, filters],
    queryFn: async () => {
      if (!keyword) return null;
      const params = new URLSearchParams({
        keyword: keyword,
        output: "json",
      });

      if (filters.artist_name)
        params.append("artist_name", filters.artist_name);
      if (filters.museums) {
        filters.museums.forEach((museum) => params.append("museums[]", museum));
      }
      // Add other filters similarly

      console.log("Search URL:", `/api/search?${params.toString()}`);

      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
      return data;
    },
    enabled: !!keyword,
  });
}
