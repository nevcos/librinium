import { Context } from "../../../interface/Context";
import { defaultError } from "../../../util/callback";

export async function onRequestGet(context: Context): Promise<Response> {
  try {
    if (!context.params.code) throw new Error("missing code");
    const response = await getToken(context);
    if (!response.ok) throw new Error(JSON.stringify({ status: response.status, text: response.statusText }));
    const data = await response.json();
    return new Response(JSON.stringify({ token: data.access_token }));
  } catch (err) {
    return defaultError(err);
  }
}

async function getToken(context: Context): Promise<Response> {
  const endpoint = "https://github.com/login/oauth/access_token";
  const clientId = await context.env.GITHUB_CLIENT_ID;
  const clientSecret = await context.env.GITHUB_CLIENT_SECRET;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: context.params.code
    })
  });
}
