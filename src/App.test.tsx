import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Server Composer", () => {
  test("renders the main title", () => {
    render(<App />);
    expect(screen.getByText("Server Composer")).toBeInTheDocument();
  });

  test("renders all form controls", () => {
    render(<App />);
    expect(screen.getByLabelText("CPU")).toBeInTheDocument();
    expect(screen.getByTestId("memory-input")).toBeInTheDocument();
    expect(screen.getByLabelText("GPU Accelerator Card")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
