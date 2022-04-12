import { PreviewPlantUml } from "./PreviewPlantUml";
import type { DocumentContent } from "../../domain/document/DocumentContent";
import { renderWithRoutingAndStore } from '../../test/reactTestUtils';
import { createNewPlantUml } from '../../domain/documentStoreState/documentStoreStateSelectors';
import { addDocument } from '../../domain/documentStoreState/documentStoreStateReducers';
import {createEmptyState} from "../../domain/storeState/storeStateSelectors";

describe("<PreviewPlantUml />", () => {
  it("should display an image with the correct document", async () => {
    const code = "Test->Success" as DocumentContent;
    const document = createNewPlantUml()
    document.code = code;
    const state = createEmptyState();
    addDocument(state.gist, {payload: document});

    const {renderResult} = renderWithRoutingAndStore(<PreviewPlantUml />, state, `/gists/${document.id}`, "/gists/:gistId");
    const img = renderResult.container.querySelector("img");

    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
