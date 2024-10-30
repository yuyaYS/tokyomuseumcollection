export type NameValue = {
  "@value": string;
  "@lang": string;
};

export type Artwork = {
  "@id": string;
  "schema:name": NameValue[];
  "schema:dateCreated"?: string;
  "schema:creator"?: {
    "schema:name": NameValue[];
  };
  "schema:size"?: string;
  "schema:genre"?: Array<{ "skos:preflabel": NameValue }>;
  "schema:isPartOf"?: Array<{
    "schema:maintainer"?: Array<{
      "schema:name": NameValue[];
    }>;
  }>;
};
