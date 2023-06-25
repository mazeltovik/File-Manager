import {parse} from 'node:path'
import { access } from 'node:fs/promises';
import {isAbsolute, resolve} from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';


export default async function handleDecompressCmd(curDir:string,input:string){
    let [pathToFile,newFileName] = input.split(' ').filter(v=>{ if(v) return v}).slice(1);
    if(pathToFile && !isAbsolute(pathToFile)){
        pathToFile = resolve(curDir,pathToFile);
    }
    if(newFileName && !isAbsolute(newFileName)){
        newFileName = resolve(curDir,newFileName);
    }
    if(pathToFile && parse(pathToFile).ext && newFileName && parse(newFileName).ext){
        access(pathToFile)
        .then(()=>{
            let readable = createReadStream(pathToFile); 
            let writable = createWriteStream(newFileName);
            let brotli =  zlib.createBrotliDecompress();
            readable.pipe(brotli).pipe(writable);
        })
        .catch(()=>process.stdout.write('Operation failed\n'))
    } else {
        process.stdout.write('Operation failed\n');
    }
}