import { Context } from "../../../interface/Context";

export async function onRequestGet(context: Context): Promise<Response> {
  const clientId = await context.env.GITHUB_CLIENT_ID;
  return new Response(JSON.stringify({ id: clientId }));
}
