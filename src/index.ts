#!/usr/bin/env node

import process from "process";
import dotenv from "dotenv";
import fs from "fs";

import { spawnSync } from "child_process";
import { transformEnv } from "./utils";

const nodeEnv = process.env.NODE_ENV || "development";

if (fs.existsSync(`.env.${nodeEnv}`)) {
    dotenv.config({ path: `.env.${nodeEnv}` });
} else if (fs.existsSync(`.env.${nodeEnv}.local`)) {
    dotenv.config({ path: `.env.${nodeEnv}.local` });
} else if (fs.existsSync(".env.local")) {
    dotenv.config({ path: ".env.local" });
} else {
    dotenv.config();
}

const argv = process.argv.slice(2);

const env = process.env as Record<string, string>;

const toRun = transformEnv(argv.join(" "), env);

if (!toRun) {
    throw new Error("No command to run");
}

spawnSync(toRun, {
    stdio: "inherit",
    shell: true
});
