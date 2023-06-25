import { readdir } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path'

export default async function handleAddCmd(curDir:string, fileName:string) {
    let file = fileName.slice(3,fileName.length).trim();
    const files = await readdir(curDir);
    if (files.includes(file)) {
        process.stdout.write('Operation failed\n')
    } else {
        let newPath = resolve(curDir,file);
        writeFile(newPath,'').catch(()=>process.stdout.write('Operation failed\n'))
    }
}