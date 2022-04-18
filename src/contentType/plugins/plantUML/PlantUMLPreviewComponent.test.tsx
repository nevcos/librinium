import { PlantUMLPreviewComponent } from "./PlantUMLPreviewComponent";
import type { NoteContent } from "../../../domain/note/NoteContent";
import {createEmptyNote} from "../../../domain/noteStoreState/noteStoreStateSelectors";
import {PlantUMLContentTypeName} from "./index";
import { render } from "@testing-library/react";

describe("<PreviewPlantUml />", () => {
  it("should display an image with the correct note", async () => {
    const note = createEmptyNote(PlantUMLContentTypeName);
    note.code = "Test->Success" as NoteContent;

    const renderResult = render(<PlantUMLPreviewComponent note={note}/>);
    const img = renderResult.container.querySelector("img");

    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
