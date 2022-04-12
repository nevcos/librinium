const ENDPOINT = "https://api.imgur.com/3";
const CLIENT_ID = "b16973d408c3d4c";

export async function uploadFile(file: File) {
  const headers = new Headers();
  headers.append("Authorization", `Client-ID ${CLIENT_ID}`);

  const formdata = new FormData();
  formdata.append("image", file);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formdata,
    redirect: "follow"
  };

  const response = await fetch(`${ENDPOINT}/image`, requestOptions)
  const result = await response.json();

  console.log(result);

  return result;
}
