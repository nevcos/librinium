import { PreviewPlantUml } from "./PreviewPlantUml";
import type { DocumentContent } from "../../domain/document/DocumentContent";
import { renderWithDocumentStore } from '../../test/reactTestUtils';
import { createEmptyState, createNewPlantUml } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument } from '../../domain/documentStoreState/documentStoreStateReducers';

describe("<PreviewPlantUml />", () => {
  it("should display an image with the correct document", async () => {
    const code = "Test->Success" as DocumentContent;
    const document = createNewPlantUml()
    document.code = code;
    const state = createEmptyState();
    addDocument(state, {payload: document});

    const {renderResult} = renderWithDocumentStore(<PreviewPlantUml />, state);
    const img = renderResult.container.querySelector("img");

    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
