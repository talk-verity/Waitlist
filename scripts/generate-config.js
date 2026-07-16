import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.SUPABASE_URL || '';
const anonKey = process.env.SUPABASE_ANON_KEY || '';

if (!url || !anonKey) {
  console.warn('Missing SUPABASE_URL or SUPABASE_ANON_KEY — writing empty placeholders (waitlist form will not submit)');
}

const contents = `window.SUPABASE_CONFIG = {
  url: '${url}',
  anonKey: '${anonKey}'
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'config.js'), contents);
console.log('Generated config.js');
