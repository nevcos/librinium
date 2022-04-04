import { render } from "@testing-library/react";
import { PlantUmlPreview } from "./PlantUmlPreview";
import type { DocumentContent } from "../../domain/document/DocumentContent";

describe("<PlantUmlPreview />", () => {
  test("should display an image with the correct document", async () => {
    const code = "Test->Success" as DocumentContent;

    const result = render(<PlantUmlPreview code={code} />);
    const img = result.container.querySelector("img");

    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
