import os from 'node:os'

export default function handleOsCmd(command:string){
    let reqData = command.slice(2,command.length).trim().split(' ');
    if(reqData.length > 1){
        process.stdout.write('Operation failed\n');
    } else {
        let operation = reqData.shift();
        switch(operation?.slice(2,operation.length)){
            case 'EOL':
                process.stdout.write(os.EOL + '\n');
                break;
            case 'cpus':
                console.table(helperForCpus());
                break;
            case 'homedir':
                process.stdout.write(os.homedir() + '\n');
                break;
            case 'username':
                process.stdout.write(os.userInfo().username + '\n');
                break;  
            case 'architecture':
                process.stdout.write(os.arch() + '\n');
                break;
            default:
                process.stdout.write('Operation failed\n');
        }
    }
    
}

function helperForCpus(){
    let cpus = os.cpus();
    return cpus.map(v=>{
        return {
            model:v.model,
            speed: `${(v.speed/1000).toFixed(1)} GHz`
        }
    })
}