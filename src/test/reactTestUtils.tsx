import { render as rtlRender } from "@testing-library/react";
import {configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {MemoryRouter, useLocation} from "react-router-dom";
/* Required for using `toHaveTextContent` */
import "@testing-library/jest-dom/extend-expect";

import { documentStoreReducer } from '../store/documentStore';
import { DocumentStoreState } from "../domain/documentStoreState/DocumentStoreState";
import { createEmptyState } from '../domain/documentStoreState/documentStoreStateSelectors';

/**
 * @see https://redux.js.org/usage/writing-tests#components
 */
export function renderWithRoutingAndStore(
  ui: JSX.Element,
  route: string = "",
  preloadedState: DocumentStoreState = createEmptyState(),
  renderOptions: {[key: string]: unknown} = {}
) {
  const store = configureStore({ reducer: documentStoreReducer, preloadedState });

  function Wrapper({ children }: { children: JSX.Element }) {
    return <MemoryRouter initialEntries={[route]}>
      <LocationDisplay />
      <Provider store={store}>{children}</Provider>;
    </MemoryRouter>
  }

  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    renderResult,
    getState: (): DocumentStoreState => store.getState()
  };
}

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>
}
