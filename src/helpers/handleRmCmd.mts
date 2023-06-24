import handleCdCommand from "./handleCdCmd.mjs";
import { unlink } from 'node:fs/promises';

export default async function handleRmCmd(curDir:string,path:string){
    let res = handleCdCommand(curDir,path);
    res.then(async path=>{
        await unlink(path);
    }).catch(()=>{
        process.stdout.write('Operation failed\n')
    })
}