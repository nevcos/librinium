import { DocumentContent } from "../domain/document/DocumentContent";
import { DocumentId } from "../domain/document/DocumentId";
import { DocumentMap } from "../domain/document/DocumentMap";
import { DocumentName } from "../domain/document/DocumentName";
import { FolderId } from "../domain/folder/FolderId";
import { FolderMap } from "../domain/folder/FolderMap";
import { FolderName } from "../domain/folder/FolderName";
import { Gist } from "../remoteApi/gitHub/Gist";
import { getFileTypeFromExtension } from "../domain/document/util";

export function getFolderFromGists(gists: Gist[]): FolderMap {
  const folders: FolderMap = {};

  gists.map((gist: Gist) => {
    folders[gist.id as FolderId] = {
      id: gist.id as FolderId,
      name: gist.description as FolderName
    };
  });

  return folders;
}

export async function getFilesFromGists(gists: Gist[]): Promise<DocumentMap> {
  const files: DocumentMap = {};

  await Promise.all(
    gists.map(async (gist) => {
      const folderId = gist.id as FolderId;

      await Promise.all(
        Object.keys(gist.files).map(async (key) => {
          const file = gist.files[key];
          const codeRequest = await fetch(file.raw_url);
          const code = (await codeRequest.text()) as DocumentContent;

          files[key as DocumentId] = {
            id: file.filename as DocumentId,
            name: file.filename as DocumentName,
            code,
            type: getFileTypeFromExtension(file.filename),
            folderId: folderId
          };
        })
      );
    })
  );

  return files;
}
