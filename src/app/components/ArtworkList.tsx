import { useArtworkSearch } from "../hooks/useArtworkSearch";
import { Artwork, NameValue } from "../lib/type/artwork";
import { FilterOptions } from "../page";

type ArtworkListProps = {
  keyword: string;
  filters: FilterOptions;
};

const getLocalizedValue = (
  values?: NameValue | NameValue[] | undefined,
  preferredLang: string = "en"
): string => {
  if (!values) return "";
  if (Array.isArray(values)) {
    const preferredValue = values.find((v) => v["@lang"] === preferredLang)?.[
      "@value"
    ];
    return preferredValue || values[0]?.["@value"] || "";
  }
  return values["@value"] || "";
};

export default function ArtworkList({ keyword, filters }: ArtworkListProps) {
  const { data, isLoading, error } = useArtworkSearch(keyword, filters);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );

  let artworks: Artwork[] = [];

  if (Array.isArray(data)) {
    artworks = data;
  } else if (data && data["@graph"]) {
    artworks = data["@graph"];
  }

  console.log("Original artworks:", artworks);

  // Client-side filtering
  if (filters.artist_name) {
    artworks = artworks.filter((artwork) => {
      const artistName = getLocalizedValue(
        artwork["schema:creator"]?.["schema:name"]
      );
      return artistName
        .toLowerCase()
        .includes(filters.artist_name?.toLowerCase() || "");
    });
  }

  console.log("Filtered artworks:", artworks);

  if (artworks.length === 0) {
    return (
      <div className="text-center">
        No results found for {keyword} with the applied filters
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork: Artwork) => (
        <div key={artwork["@id"]} className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">
            {getLocalizedValue(artwork["schema:name"])}
          </h3>
          {artwork["schema:creator"] && (
            <p className="text-sm text-gray-600">
              Artist:{" "}
              {getLocalizedValue(artwork["schema:creator"]["schema:name"])}
            </p>
          )}
          {artwork["schema:dateCreated"] && (
            <p className="text-sm text-gray-600">
              Year: {artwork["schema:dateCreated"]}
            </p>
          )}
          {artwork["schema:size"] && (
            <p className="text-sm text-gray-600">
              Size: {artwork["schema:size"]}
            </p>
          )}
          {artwork["schema:genre"] && artwork["schema:genre"].length > 0 && (
            <p className="text-sm text-gray-600">
              Genre:{" "}
              {getLocalizedValue(artwork["schema:genre"][0]["skos:preflabel"])}
            </p>
          )}
          {artwork["schema:isPartOf"] &&
            artwork["schema:isPartOf"].length > 0 &&
            artwork["schema:isPartOf"][0]["schema:maintainer"] && (
              <p className="text-sm text-gray-600">
                Collection:{" "}
                {getLocalizedValue(
                  artwork["schema:isPartOf"][0]["schema:maintainer"][0][
                    "schema:name"
                  ]
                )}
              </p>
            )}
          <a
            href={artwork["@id"]}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-500 hover:underline"
          >
            View details
          </a>
        </div>
      ))}
    </div>
  );
}
