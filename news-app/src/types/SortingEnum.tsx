const SortingEnum = {
  NONE: "none",
  ASC: "asc",
  DESC: "desc",
} as const;

export { SortingEnum };
export type SortingEnumType = (typeof SortingEnum)[keyof typeof SortingEnum];
