import path from 'node:path'

export default function handleUpCommand(curDir:string){
    let distPath = curDir.split(path.sep);
    let res = '';
    if(distPath.length > 1){
        distPath.pop();
        res = distPath.join('\\');
    }
    if(distPath.length == 1){
        res = distPath[0] += '\\';
    }
    return path.normalize(res);
}