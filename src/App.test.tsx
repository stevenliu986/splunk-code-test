import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Server Composer", () => {
  test("renders the main title", () => {
    render(<App />);
    expect(screen.getByText("Server Composer")).toBeInTheDocument();
  });
});
