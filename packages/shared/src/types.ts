/** @see https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d */
export type BrandType<K, T> = K & { __brand: T };

export type DiagramId = BrandType<number, "DiagramId">;
export type DiagramName = BrandType<string, "DiagramName">;
export type DiagramCode = BrandType<string, "DiagramCode">;
