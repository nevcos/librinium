export type DocumentId = BrandType<string, "DocumentId">;

export function getNextDocumentId(): DocumentId {
  return String(Date.now()) as DocumentId;
}
