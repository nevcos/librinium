import {ImgurFile} from "./model/ImgurFile";
import {ImageDescriptor} from "../../domain/image/Image";

const ENDPOINT = "https://api.imgur.com/3";
const CLIENT_ID = "b16973d408c3d4c";

export async function uploadFile(file: File): Promise<ImgurFile> {
  const headers = new Headers();
  headers.append("Authorization", `Client-ID ${CLIENT_ID}`);

  const formdata = new FormData();
  formdata.append("image", file);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: formdata,
    redirect: "follow"
  };

  const response = await fetch(`${ENDPOINT}/image`, requestOptions);
  const result = await response.json();

  if (result.success) {
    return result.data;
  } else {
    throw new Error(`Error uploading file - ${result.status}: ${result.data?.error}`);
  }
}

export function fromImgurFileToImageDescriptor(imgurFile: ImgurFile): ImageDescriptor {
  return {
    src: imgurFile.link,
    width: imgurFile.width,
    height: imgurFile.height,
    alt: imgurFile.description || undefined
  }
}
