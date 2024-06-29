import { act, renderHook } from "@testing-library/react";

import { useToggle } from "./useToggle";

describe("useToggle", () => {
  test("should render the initial state", () => {
    const { result } = renderHook(useToggle);
    const [value] = result.current;
    expect(value).toBeFalsy();
  });

  test("should toggle the state", () => {
    const { result } = renderHook(useToggle);

    const [_, toggle] = result.current;
    act(() => toggle());

    expect(result.current[0]).toBeTruthy();
  });
});
