import { PreviewPlantUml } from "./PreviewPlantUml";
import type { NoteContent } from "../../domain/note/NoteContent";
import { renderWithRoutingAndStore } from '../../test/reactTestUtils';
import { createNewPlantUml } from '../../domain/noteStoreState/noteStoreStateSelectors';
import { addNote } from '../../domain/noteStoreState/noteStoreStateReducers';
import {createEmptyState} from "../../domain/storeState/storeStateSelectors";

describe("<PreviewPlantUml />", () => {
  it("should display an image with the correct note", async () => {
    const code = "Test->Success" as NoteContent;
    const note = createNewPlantUml()
    note.code = code;
    const state = createEmptyState();
    addNote(state.gist, {payload: note});

    const {renderResult} = renderWithRoutingAndStore(<PreviewPlantUml />, state, `/gists/${note.id}`, "/gists/:gistId");
    const img = renderResult.container.querySelector("img");

    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
