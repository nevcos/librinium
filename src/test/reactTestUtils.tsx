import { render as rtlRender } from "@testing-library/react";
import {configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {MemoryRouter, Routes, Route, useLocation} from "react-router-dom";
/** Required for `toHaveTextContent` */
import "@testing-library/jest-dom/extend-expect";

import { noteStoreReducer } from '../store/noteStore';
import {StoreState} from "../store/StoreState";
import {createEmptyState} from "../domain/storeState/storeStateSelectors";
import {userStoreReducer} from "../store/userStore";

/**
 * @see https://redux.js.org/usage/writing-tests#components
 */
export function renderWithRoutingAndStore(
  ui: JSX.Element,
  preloadedState: StoreState = createEmptyState(),
  currentRoute: string = "",
  componentRoutePath: string = "*",
  renderOptions: {[key: string]: unknown} = {}
) {
  const reducer = {user: userStoreReducer, note: noteStoreReducer};
  const store = configureStore({ reducer, preloadedState });

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
    getState: (): StoreState => store.getState()
  };
}

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>
}
