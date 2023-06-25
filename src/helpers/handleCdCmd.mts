import { access } from 'node:fs/promises';
import {isAbsolute, resolve} from 'node:path'

export default async function handleCdCommand(curDir:string,input:string){
    let path = '';
    if(input.startsWith('cd')){
        path = input.slice(2,input.length).trim();
    } 
    if(input.startsWith('cat')){
        path = input.slice(3,input.length).trim();
    } 
    if(input.startsWith('rm')){
        path = input.slice(2,input.length).trim();
    }
    if(input.startsWith('hash')){
        path = input.slice(4,input.length).trim();
    } 
    if(isAbsolute(path)){
            return access(path).then(()=>Promise.resolve(path))
    } else {
        let newPath = resolve(curDir,path);
        return access(newPath).then(()=>Promise.resolve(newPath))
    }
}