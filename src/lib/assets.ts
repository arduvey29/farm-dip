/**
 * Version stamp for files in /public/images. Bump it whenever those files change (for example
 * when placeholder art is replaced with real photography), so browsers and CDNs fetch the new
 * files instead of serving cached copies. next.config.ts allows exactly this query string.
 */
export const ASSET_VERSION = "3";
export const ASSET_QUERY = `?v=${ASSET_VERSION}`;

export const asset = (path: string) => `${path}${ASSET_QUERY}`;
