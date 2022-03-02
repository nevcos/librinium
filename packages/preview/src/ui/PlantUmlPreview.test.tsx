import React from "react";
import {render} from "@testing-library/react";
import {PlantUmlPreview} from "./PlantUmlPreview";
import {DiagramCode} from "@nevcos/react-plantuml-ide-shared/src/types";

describe("<PlantUmlPreview />", () => {
  test("should display an image with the correct diagram", async () => {
    const code = "Test->Success" as DiagramCode;

    const result = render(<PlantUmlPreview code={code} />);
    const img = result.container.querySelector("img");

    expect(img).toBeDefined();
    expect(img?.src).toBe("http://www.plantuml.com/plantuml/png/~1UDeBIIqkqRKBBarEJYqk1W0X4GJb");
  });
});
