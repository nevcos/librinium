import { DocumentContent } from "../document/DocumentContent";
import { DocumentId } from "../document/DocumentId";
import { DocumentName } from "../document/DocumentName";
import { DocumentContentType } from "../document/DocumentContentType";

export const documentMock0 = {
  id: "0" as DocumentId,
  name: "document0" as DocumentName,
  code: "code0 -> code0" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

export const documentMock1 = {
  id: "1" as DocumentId,
  name: "document1" as DocumentName,
  code: "code1 -> code1" as DocumentContent,
  type: DocumentContentType.PLANT_UML
};

export const documentMock2 = {
  id: "2" as DocumentId,
  name: "document2" as DocumentName,
  code: "code2 -> code2" as DocumentContent,
  type: DocumentContentType.REMARK
};

export const documentsListMock = [documentMock0, documentMock1];

export const documentsMapMock = {
  [documentMock0.id]: documentMock0,
  [documentMock1.id]: documentMock1,
  [documentMock2.id]: documentMock2
};
