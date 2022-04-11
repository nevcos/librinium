import { render as rtlRender } from "@testing-library/react";
import {configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {MemoryRouter, Routes, Route, useLocation} from "react-router-dom";
/** Required for `toHaveTextContent` */
import "@testing-library/jest-dom/extend-expect";

import { documentStoreReducer } from '../store/documentStore';
import { DocumentStoreState } from "../domain/documentStoreState/DocumentStoreState";
import { createEmptyState } from '../domain/documentStoreState/documentStoreStateSelectors';

/**
 * @see https://redux.js.org/usage/writing-tests#components
 */
export function renderWithRoutingAndStore(
  ui: JSX.Element,
  preloadedState: DocumentStoreState = createEmptyState(),
  currentRoute: string = "",
  componentRoutePath: string = "*",
  renderOptions: {[key: string]: unknown} = {}
) {
  const store = configureStore({ reducer: documentStoreReducer, preloadedState });

  function Wrapper({ children }: { children: JSX.Element }) {
    return <MemoryRouter initialEntries={[currentRoute]}>
      <LocationDisplay />
      <Provider store={store}>
        <Routes>
          <Route path={componentRoutePath} element={children} />
        </Routes>
      </Provider>;
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
