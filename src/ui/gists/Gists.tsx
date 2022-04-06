import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { endpointResource } from "../../util/resource";

const GITHUB_URL_PARAM_CODE_KEY = "code";
const GITHUB_TOKEN_COOKIE_KEY = "gh_token";

export function Gists(): JSX.Element {
  const [token, setToken] = useState();
  const [clientId, setClientId] = useState();
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
    const code = new URLSearchParams(window.location.search).get(GITHUB_URL_PARAM_CODE_KEY);

    if (token) {
      // 1. if token exists, get gists
      getSetGists();
    } else if (code) {
      // 2. if code exists, get token
      getSetToken();
    } else {
      // 3. it neither token or code exists, get client id
      getSetClientId();
    }
  }, []);

  async function getSetGists() {
    const gistsData = await endpointResource(`/api/github/gists/${token}`)();
    setGists(gistsData.gists);
  }

  async function getSetToken() {
    const URLParams = new URLSearchParams(window.location.search);
    const code = URLParams.get(GITHUB_URL_PARAM_CODE_KEY);
    const tokenData: any = await endpointResource(`/api/github/token/${code}`)();
    setToken(tokenData.token);
    Cookies.set(GITHUB_TOKEN_COOKIE_KEY, tokenData.token);
    URLParams.delete(GITHUB_URL_PARAM_CODE_KEY);
  }

  async function getSetClientId() {
    const clientData: any = await endpointResource("/api/github/client")();
    setClientId(clientData?.id);
  }

  function auth() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  }

  return (
    <>
      {clientId && <button onClick={() => auth()}>show me my gists!</button>}
      <ul>
        {gists.map((gist: any) => (
          <li>
            <a href={gist.url} target="_blank">
              {gist.description}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
