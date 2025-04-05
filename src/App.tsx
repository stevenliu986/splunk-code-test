import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { serverModels, cpuOptions } from "./utils/constants";
import { CPUType, ServerModel } from "./utils/types";
import { formatNumber } from "./utils/helpers";

const App: React.FC = () => {
  const [cpu, setCpu] = useState<CPUType>("");
  const [memory, setMemory] = useState<string>("");
  const [rawMemory, setRawMemory] = useState<string>("");
  const [gpu, setGpu] = useState<boolean>(false);
  const [validMemory, setValidMemory] = useState<boolean>(false);
  const [availableModels, setAvailableModels] = useState<ServerModel[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleMemoryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const cleanedValue = value.replace(/,/g, "");
    setRawMemory(cleanedValue);

    if (cleanedValue === "") {
      setMemory("");
    } else {
      setMemory(formatNumber(cleanedValue));
    }
  };

  useEffect(() => {
    if (!rawMemory) {
      setValidMemory(false);
      return;
    }

    const memoryNum = parseInt(rawMemory, 10);

    if (isNaN(memoryNum)) {
      setValidMemory(false);
      return;
    }

    const isMultipleOf1024 = memoryNum % 1024 === 0;
    const isPowerOf2 = (memoryNum & (memoryNum - 1)) === 0;

    setValidMemory(
      isMultipleOf1024 &&
        isPowerOf2 &&
        memoryNum >= 2048 &&
        memoryNum <= 8388608
    );
  }, [rawMemory]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    setSubmitted(true);

    const memoryNum = parseInt(rawMemory, 10) || 0;

    if (!cpu || !validMemory || memoryNum < 2048) {
      setAvailableModels([]);
      return;
    }

    let models: ServerModel[] = [];

    if (gpu && cpu === "ARM" && memoryNum >= 524288) {
      models.push(serverModels["High Density Server"]);
      setAvailableModels(models);
      return;
    }

    models.push(serverModels["Tower Server"]);

    if (memoryNum >= 131072) {
      models.push(serverModels["4U Rack Server"]);
    }

    if (cpu === "Power") {
      models.push(serverModels.Mainframe);
    }

    setAvailableModels(models);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="left" sx={{ mb: 4 }}>
        Server Composer
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <Box sx={{ width: "33%" }}>
            <Typography variant="subtitle1" gutterBottom>
              CPU
            </Typography>
            <FormControl fullWidth>
              <Select
                data-testid="cpu-select" // test
                aria-labelledby="cpu-label" // test
                labelId="cpu-label"
                id="cpu-select"
                value={cpu}
                onChange={(evt) => setCpu(evt.target.value as CPUType)}
                displayEmpty
                sx={{ borderRadius: 2 }}
                inputProps={{
                  "aria-label": "CPU",
                }}
              >
                <MenuItem value="" disabled>
                  Select CPU
                </MenuItem>
                {cpuOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "33%" }}>
            <Typography variant="subtitle1" gutterBottom>
              Memory Size
            </Typography>
            <TextField
              data-testid="memory-input" // test
              aria-labelledby="memory-label" // test
              fullWidth
              value={memory}
              onChange={handleMemoryChange}
              placeholder="e.g., 2,048"
              slotProps={{
                input: {
                  endAdornment: <Typography sx={{ ml: 1 }}>MB</Typography>,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: "33%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "background.paper",
              borderRadius: 1,
              p: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={gpu}
                  onChange={(evt) => setGpu(evt.target.checked)}
                />
              }
              label="GPU Accelerator Card"
            />
          </Box>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: 2, px: 4, textTransform: "none" }}
          >
            Submit
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {submitted && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Server Model Options
            </Typography>
            {availableModels.length > 0 ? (
              <List dense>
                {availableModels.map((model) => (
                  <ListItem key={model} sx={{ py: 0.5 }}>
                    <ListItemText primary={`· ${model}`} sx={{ my: 0 }} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 2, display: "flex", alignItems: "center" }}
              >
                <Box component="span" sx={{ mr: 1 }}>
                  ·
                </Box>
                No Options
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
