export type DiagramId = BrandType<string, "DiagramId">;

export function getNextDiagramId(): DiagramId {
  return String(Date.now()) as DiagramId;
}
