// Basic Modules

import { EventEmitter } from 'node:events';
import os from "node:os"
import { readdir } from 'node:fs/promises';

// Custom Modules

import handleUpCommand from './helpers/handleUpCommand.js';
import handleCdCommand from './helpers/handleCdCommand.js';
import handleLsCommand from './helpers/handleLsCommand.js';

// Types






class FileManager extends EventEmitter{
    constructor(public curDir:string,public name?:string,){
        super();
        this.initDefaultSettings();
        this.initInputOperations();
    }
    initDefaultSettings(){
        let [userName] = process.argv.filter(v=>v.match(/-username=\w+/g));
        this.name = (userName)? userName.split('=')[1] : 'default';
    }
    initInputOperations(){
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (input)=>{
            if(input !== null){
                this.check(input.toString());
            }
        });
        process.stdout.write(`Welcome to the File Manager, ${this.name}!\nYou are currently in ${this.curDir}\n`)
    } 
    check(input:string){
        let command = input.trim();
        if(command == 'up'){
            this.emit('up');
        } else if(command.includes('cd')){
            this.emit('cd',command);
        } else if(command == 'ls'){
            this.emit('ls');
        } else {
            this.emit('unknownOperation');
        }
    }
}

let fileManager = new FileManager(os.homedir());


fileManager.on('up',()=>{
    fileManager.curDir = handleUpCommand(fileManager.curDir);
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
})

fileManager.on('cd',(command:string)=>{
    let res = handleCdCommand(fileManager.curDir,command);
    res.then(path=>{
        if(path){
            fileManager.curDir = path;
            process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
        }
    }).catch(()=>{
        process.stdout.write('Operation failed\n')
    })
})

fileManager.on('ls',async ()=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleLsCommand(fileManager.curDir);
})

fileManager.on('unknownOperation',()=>{
    process.stdout.write('Invalid input\n');
})

fileManager.on('end',()=>{
    process.exit(1);
})

