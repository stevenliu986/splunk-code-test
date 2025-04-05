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

describe("CPU Select Component", () => {
  test("CPU default option", () => {
    render(<App />);
    const cpuSelect = screen.getByTestId("cpu-select");
    expect(cpuSelect).toHaveTextContent("Select CPU");
  });
});

describe("Memory Input", () => {
  test("shows placeholder", () => {
    render(<App />);
    const memoryInputPlaceholder = screen.getByPlaceholderText("e.g., 2,048");
    expect(memoryInputPlaceholder).toBeInTheDocument();
  });
});
