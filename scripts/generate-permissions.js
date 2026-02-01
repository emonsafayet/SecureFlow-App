import fs from "node:fs";
import path from "node:path";
import axios from "axios";

function parseDotEnv(contents) {
  const out = {};
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function pickEnvFile() {
  // Accept "--mode uat" for parity with Vite.
  const idx = process.argv.indexOf("--mode");
  const mode = idx !== -1 ? process.argv[idx + 1] : (process.env.MODE || "local");

  if (mode === "uat") return "env.uat";
  if (mode === "production") return "env.production";
  return "env.local";
}

function getEnvFromFile(key, filename) {
  if (process.env[key]) return process.env[key];
  try {
    const envPath = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(envPath)) return undefined;
    const parsed = parseDotEnv(fs.readFileSync(envPath, "utf8"));
    return parsed[key];
  } catch {
    return undefined;
  }
}

const envFile = pickEnvFile();
const baseUrl = getEnvFromFile("VITE_API_BASE_URL", envFile);
if (!baseUrl) {
  console.error("❌ Missing VITE_API_BASE_URL in .env");
  console.error(`   Expected in ${envFile}`);
  console.error('   Example: VITE_API_BASE_URL="http://localhost:5000"');
  process.exit(1);
}

const permissionsUrl = new URL("/api/system/permissions", baseUrl).toString();
const OUTPUT_FILE = path.resolve("src/core/auth/permissions.ts");

async function generate() {
  const res = await axios.get(permissionsUrl);
  const payload = res.data;
  const list =
    Array.isArray(payload) ? payload : payload?.data ?? payload?.Data ?? [];

  const grouped = {};

  for (const p of list) {
    const key = p?.key ?? p?.Key;
    if (typeof key !== "string") continue;
    const parts = key.split(".");
    const resource = parts[1];
    const action = parts[2];
    if (!resource || !action) continue;
    grouped[resource] ??= {};
    grouped[resource][action] = key;
  }

  const resources = Object.keys(grouped).sort();
  let output = `/* AUTO-GENERATED — DO NOT EDIT.
   Generated from SecureFlow backend (/api/system/permissions).
*/

export const Permissions = {\n`;

  for (const resource of resources) {
    output += `  ${resource}: {\n`;
    const actions = Object.keys(grouped[resource]).sort();
    for (const action of actions) {
      output += `    ${action}: "${grouped[resource][action]}",\n`;
    }
    output += `  },\n\n`;
  }

  output += `} as const;\n\n`;
  output += `export type Permission =
  (typeof Permissions)[keyof typeof Permissions][keyof (typeof Permissions)[keyof typeof Permissions]];\n`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log("✅ permissions.ts generated at", OUTPUT_FILE);
}

generate().catch((err) => {
  console.error("❌ Permission generation failed");
  console.error(err);
  process.exit(1);
});
