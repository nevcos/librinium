import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { documentStoreReducer } from '../store/documentStore';
import { DocumentStoreState } from "../domain/documentStoreState/DocumentStoreState";

/**
 * @see https://redux.js.org/usage/writing-tests#components
 */
export function renderWithDocumentStore(
  ui: JSX.Element,
  preloadedState: DocumentStoreState,
  renderOptions: unknown[] = []
) {
  const store = configureStore({ reducer: documentStoreReducer, preloadedState });

  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
