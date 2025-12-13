/**
 * Cloudflare Worker (minimal)
 * - Serve static assets uploaded from ./public via Wrangler "assets"
 * - Rewrite "/" -> "/index.html" so the app loads at the root path
 *
 * Note: This Worker does NOT call Google Apps Script directly.
 * The client still uses JSONP to talk to Apps Script.
 */

export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    const url = new URL(request.url);

    // Rewrite root to index.html
    if (url.pathname === "/") {
      url.pathname = "/index.html";
      request = new Request(url.toString(), request);
    }

    // Serve assets
    return env.ASSETS.fetch(request);
  },
};


