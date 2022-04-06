import { Context } from "../../../interface/Context";
import { defaultError } from "../../../util/callback";

export async function onRequestGet(context: Context): Promise<Response> {
  try {
    if (!context.params.token) throw new Error("missing token");
    const response = await getGists(context);
    if (!response.ok) throw new Error(JSON.stringify({ status: response.status, text: response.statusText }));
    const data = await response.json();
    return new Response(JSON.stringify({ gists: data }));
  } catch (err) {
    return defaultError(err);
  }
}

async function getGists(context: Context): Promise<Response> {
  const endpoint = "https://api.github.com/gists";

  return fetch(endpoint, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${context.params.token}`,
      "User-Agent": "PostmanRuntime/7.29.0"
    }
  });
}
