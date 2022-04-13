import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {noteStoreActions} from "../../store/noteStore";
import {useActiveNote} from "../shared/useActiveNote";

export function Toolbar(): JSX.Element {
  const dispatch = useDispatch()
  const {noteId} = useActiveNote();

  const onSelectedFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(noteStoreActions.insertImage({noteId, file}));
    }
  }, []);

  return <>
    <label>
      <input type="file" onChange={onSelectedFile} accept="image/*" hidden />
      Image
    </label>
  </>;
}
