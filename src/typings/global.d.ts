/** ViteJS exposes image path when importing */
declare module "*.svg" {
  const logoPath: string;
  export default logoPath;
}

/** @see https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d */
declare type BrandType<K, T> = K & { __brand: T };

declare interface Type<T> extends Function {
  new (...args: unknown[]): T;
}
