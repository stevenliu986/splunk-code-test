import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

  test("renders correct options", async () => {
    render(<App />);
    const cpuSelect = screen.getByTestId("cpu-select");
    const selectInput = cpuSelect.querySelector("input");
    fireEvent.mouseDown(within(cpuSelect).getByRole("combobox"));
    const selectOptions = screen.getAllByRole("option");
    fireEvent.click(selectOptions[0]);
    expect(selectInput).toHaveValue(
      selectOptions[0].getAttribute("data-value")
    );
  });
});

describe("Memory Input", () => {
  test("shows placeholder", () => {
    render(<App />);
    const memoryInputPlaceholder = screen.getByPlaceholderText("e.g., 2,048");
    expect(memoryInputPlaceholder).toBeInTheDocument();
  });
});
