import type { Note } from "../domain/note/Note";
import type { NoteMap } from "../domain/note/NoteMap";
import type { NoteId } from "../domain/note/NoteId";

const BASE_URL = "https://my-json-server.typicode.com/nevcos/react-plantuml-ide";

export async function getNotes(): Promise<NoteMap> {
  const response = await fetch(BASE_URL + "/notes");
  return await response.json();
}

export async function postNote(note: Note): Promise<void> {
  const response = await fetch(BASE_URL + "/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
  return await response.json();
}

export async function putNote(id: NoteId, update: Partial<Note>): Promise<void> {
  const response = await fetch(BASE_URL + `/notes/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update)
  });
  return await response.json();
}
