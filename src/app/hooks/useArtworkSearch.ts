import { useQuery } from "@tanstack/react-query";

export function useArtworkSearch(keyword: string) {
  return useQuery({
    queryKey: ["artworkSearch", keyword],
    queryFn: async () => {
      if (!keyword) return null;
      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(keyword)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!keyword,
  });
}
