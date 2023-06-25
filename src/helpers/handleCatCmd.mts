import { createReadStream } from 'node:fs';
import handleCdCommand from "./handleCdCmd.mjs";
import { stat } from 'node:fs/promises';

export default async function handleCatCmd(curDir:string,path:string){
    let res = handleCdCommand(curDir,path);
    res.then(path=>{
        createReadable(curDir,path);
    }).catch(()=>{
        process.stdout.write('Operation failed\n')
    })
}

async function createReadable(curDir:string,path:string){
    if ((await stat(path)).isDirectory()) { 
        process.stdout.write('Operation failed\n')   
    } else {
        let readable = createReadStream(path); 
        readable.pipe(process.stdout);
    }
}