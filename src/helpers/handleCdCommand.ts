import { access } from 'node:fs/promises';
import {isAbsolute, resolve} from 'node:path'

export default async function handleCdCommand(curDir:string,input:string){
    let path = input.slice(2,input.length).trim();
    if(isAbsolute(path)){
            return access(path).then(()=>Promise.resolve(path))
    } else {
        let newPath = resolve(curDir,path);
        return access(newPath).then(()=>Promise.resolve(newPath))
    }
}