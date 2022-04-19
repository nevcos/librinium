import { NoteContent } from "../domain/note/NoteContent";
import { getNoteId, NoteId } from "../domain/note/NoteId";
import { NoteMap } from "../domain/note/NoteMap";
import { NoteName } from "../domain/note/NoteName";
import { FolderId } from "../domain/folder/FolderId";
import { FolderMap } from "../domain/folder/FolderMap";
import { FolderName } from "../domain/folder/FolderName";
import { Gist } from "../remoteApi/gitHub/Gist";
import { determineContentTypeName } from "../contentType/ContentTypeService";

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

export async function getNotesFromGists(gists: Gist[]): Promise<NoteMap> {
  const files: NoteMap = {};

  await Promise.all(
    gists.map(async (gist) => {
      const folderId = gist.id as FolderId;

      await Promise.all(
        Object.keys(gist.files).map(async (key) => {
          const file = gist.files[key];
          const id = getNoteId(file.filename, folderId);

          const codeRequest = await fetch(file.raw_url);
          const code = (await codeRequest.text()) as NoteContent;

          files[id] = {
            id,
            name: file.filename as NoteName,
            code,
            type: determineContentTypeName(file.filename as NoteName),
            folderId: folderId
          };
        })
      );
    })
  );

  return files;
}
