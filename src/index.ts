import { readFile } from 'node:fs/promises';
import {Num} from './types/types';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'types', 'types.ts');

async function name(num:Num) {
    let files = await readFile(filePath);
    console.log(files)
}

await name(4);