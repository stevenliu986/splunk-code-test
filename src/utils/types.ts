export type CPUType = "X86" | "Power" | "ARM" | "";
export type ServerModel =
  | "Tower Server"
  | "4U Rack Server"
  | "Mainframe"
  | "High Density Server";

export interface CPUOption {
  value: CPUType;
  label: string;
}

export type FormState = {
  cpu: CPUType;
  memory: string;
  rawMemory: string;
  gpu: boolean;
  validMemory: boolean;
  submitted: boolean;
  availableModels: ServerModel[];
};
