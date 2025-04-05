import { CPUOption, ServerModel } from "./types";

export const cpuOptions: CPUOption[] = [
  { value: "X86", label: "X86" },
  { value: "Power", label: "Power" },
  { value: "ARM", label: "ARM" },
];

export const serverModels: Record<ServerModel, ServerModel> = {
  "Tower Server": "Tower Server",
  "4U Rack Server": "4U Rack Server",
  Mainframe: "Mainframe",
  "High Density Server": "High Density Server",
};
