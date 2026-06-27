/** Bump when favicon/logo assets change to bust browser and SW caches. */
export const ASSET_VERSION = "2";

export function assetUrl(path: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${ASSET_VERSION}`;
}
