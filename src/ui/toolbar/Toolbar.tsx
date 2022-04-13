import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {documentStoreActions} from "../../store/documentStore";
import {useActiveGist} from "../shared/useActiveGist";

export function Toolbar(): JSX.Element {
  const dispatch = useDispatch()
  const {gistId} = useActiveGist();

  const onSelectedFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(documentStoreActions.insertImage({documentId: gistId, file}));
    }
  }, []);

  return <>
    <label>
      <input type="file" onChange={onSelectedFile} accept="image/*" hidden />
      Image
    </label>
  </>;
}
