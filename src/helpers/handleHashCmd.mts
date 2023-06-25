import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import handleCdCommand from "./handleCdCmd.mjs";
import { stat } from 'node:fs/promises';

export default function handleHashCmd(curDir:string,path:string){
    let res = handleCdCommand(curDir,path);
    res.then(path=>{
        calcHash(curDir,path);
    }).catch(()=>{
        process.stdout.write('Operation failed\n')
    })
}

async function calcHash(curDir:string,path:string){
    if ((await stat(path)).isDirectory()) { 
        process.stdout.write('Operation failed\n')   
    } else {
        let data = await readFile(path, { encoding: 'utf8' });
        process.stdout.write(createHash('SHA256').update(data).digest('hex') + '\n');
    }
}