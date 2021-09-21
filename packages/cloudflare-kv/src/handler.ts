import { encode, decode } from "cborg";
import { Multiaddr } from "multiaddr";

declare const RECORDS: KVNamespace;

const MAX_RECORDS = 3;

function toPathComponents(path = ""): string[] {
  // split on / unless escaped with \
  return (path.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    return new Response(null, {
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const segs = toPathComponents(url.pathname);

  // anything after the next / should be ignored
  const key = segs[0];
  if (!key) {
    return fetch(request);
  }

  if (key === "list") {
    return listRecords();
  }

  if (key === "peers") {
    return listPeers();
  }

  switch (request.method) {
    case "PUT":
      return putRecord(key, request);
    case "GET":
      return findRecord(key);
    case "DELETE":
      return deleteRecord(key);
    case "OPTIONS":
      return handleOptions(request);
    default:
      return fetch(request);
  }
}

export async function putRecord(key: string, req: Request): Promise<Response> {
  if (!req.body) {
    return fetch(req);
  }
  const buf = await req.arrayBuffer();
  const record = decode(new Uint8Array(buf));
  const addr = new Multiaddr(record[0]);
  await RECORDS.put(key, req.body, {
    metadata: { multiaddr: addr.toString() },
    expirationTtl: 907200, // ~10days
  });
  return new Response(key);
}

export async function findRecord(key: string): Promise<Response> {
  const { keys } = await RECORDS.list({ prefix: key });
  const results: ArrayBuffer[] = [];
  for (const k of keys) {
    const rec = await RECORDS.get(k.name, { type: "arrayBuffer" });
    if (rec && results.length <= MAX_RECORDS) {
      results.push(rec);
    }
  }
  return new Response(encode(results), {
    headers: corsHeaders,
  });
}

export async function deleteRecord(key: string): Promise<Response> {
  // TODO: verify signature
  await RECORDS.delete(key);
  return new Response(key);
}

// list the first 30 records set
export async function listRecords(): Promise<Response> {
  const { keys } = await RECORDS.list({ limit: 30 });
  const results: ArrayBuffer[] = [];
  for (const k of keys) {
    const rec = await RECORDS.get(k.name, { type: "arrayBuffer" });
    if (rec) {
      results.push(rec);
    }
  }
  return new Response(encode(results), {
    headers: corsHeaders,
  });
}

// list the peers serving live records
export async function listPeers(): Promise<Response> {
  const { keys } = await RECORDS.list();
  const results: string[] = [];
  const added: { [key: string]: boolean } = {};

  for (const k of keys) {
    const metadata = k.metadata as { [key: string]: any };
    const peeraddr: string = metadata.multiaddr;
    if (!added[peeraddr]) {
      results.push(peeraddr);
      added[peeraddr] = true;
    }
  }
  return new Response(JSON.stringify(results), { headers: corsHeaders });
}
