# Server Model Selection

## Overview

This is a React-based frontend application that determines possible server model options based on user-selected hardware configurations. The app evaluates CPU type, memory size, and GPU accelerator requirements to recommend compatible server models.

## Features

- Interactive UI with form inputs for server recommendations
- Rule-bases server model options
- Responsive design with MUI

## Tech Stacks

- React with TS built by Create React App
- MUI for component styling
- Jest/RTL for unit testing

## Installation & Run

1. Clone the repo:

   ```bash
    git clone https://github.com/stevenliu986/splunk-code-test.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server;
   ```bash
   npm start
   ```

## Usage

1. Select CPU type from dropdown menu (X86, Power, ARM)
2. Enter memory size in MB (must be multiple of 1024 and power of 2)
3. Check GPU Accelerator Card if needed
4. Click "Submit" to see the recommended server models
