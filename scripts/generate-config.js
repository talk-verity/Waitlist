import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Try to read .env file if it exists
let envUrl = '';
let envAnonKey = '';
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envFile.match(/SUPABASE_URL\s*=\s*['"]?([^'"]\S*)['"]?/);
    const keyMatch = envFile.match(/SUPABASE_ANON_KEY\s*=\s*['"]?([^'"]\S*)['"]?/);
    if (urlMatch) envUrl = urlMatch[1].trim();
    if (keyMatch) envAnonKey = keyMatch[1].trim();
  }
} catch (e) {
  // Ignore
}

const url = process.env.SUPABASE_URL || envUrl || '';
const anonKey = process.env.SUPABASE_ANON_KEY || envAnonKey || '';

const targetPath = path.join(__dirname, '..', 'config.js');

if (!url || !anonKey) {
  // Check if config.js already exists and has values
  if (fs.existsSync(targetPath)) {
    const currentConfig = fs.readFileSync(targetPath, 'utf8');
    if (currentConfig.includes('url:') && !currentConfig.includes("url: ''") && !currentConfig.includes('url: ""')) {
      console.log('Skipping generate-config.js: config.js already has values and no env vars are defined.');
      process.exit(0);
    }
  }
  console.warn('Missing SUPABASE_URL or SUPABASE_ANON_KEY — writing empty placeholders (waitlist form will not submit)');
}

const contents = `window.SUPABASE_CONFIG = {
  url: '${url}',
  anonKey: '${anonKey}'
};
`;

fs.writeFileSync(targetPath, contents);
console.log('Generated config.js');

