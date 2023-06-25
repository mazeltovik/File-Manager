import { readdir, stat } from 'node:fs/promises';
import {resolve} from 'node:path'
import { TransformFiles } from '../types/types';


export default async function handleLsCommand(curDir:string) {
    process.stdout.write(` You are currently in ${curDir}\n`);
    let filesFolder = await readdir(curDir);
    let transformFiles = filesFolder.map( async v=>{
        let filePath = resolve(curDir,v);
        if((await stat(filePath)).isFile()){
            return {
                name:v,
                type:'file'
            }
        } else {
            return {
                name:v,
                type:'directory'
            }
        }
    })
    Promise.all(transformFiles).then(data=>console.table(sortingFiles(data)))
}

function sortingFiles(files:TransformFiles){
    return files.sort((x,y)=>{
        return x.type.localeCompare(y.type) || x.name.localeCompare(y.name);
    })
} 