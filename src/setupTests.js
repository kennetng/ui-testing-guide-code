import "@testing-library/jest-dom";

import { setGlobalConfig } from "@storybook/testing-react";
import * as globalStorybookConfig from "../.storybook/preview";

setGlobalConfig(globalStorybookConfig);
