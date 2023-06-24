// Basic Modules

import { EventEmitter } from 'node:events';
import os from "node:os";
import { stat } from 'node:fs/promises';

// Custom Modules

import handleUpCommand from './helpers/handleUpCmd.mjs';
import handleCdCommand from './helpers/handleCdCmd.mjs';
import handleLsCommand from './helpers/handleLsCmd.mjs';
import handleCatCmd from './helpers/handleCatCmd.mjs';
import handleAddCmd from './helpers/handleAddCmd.mjs';
import handleRnCmd from './helpers/handleRnCmd.mjs';
import handleCpCmd from './helpers/handleCpCmd.mjs';
import handleMvCmd from './helpers/handleMv.Cmd.mjs';
import handleRmCmd from './helpers/handleRmCmd.mjs';

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
        } else if(command.includes('cat')){
            this.emit('cat',command);
        } else if(command.includes('add')){
            this.emit('add',command)
        } else if(command.includes('rn')){
            this.emit('rn',command);
        } else if(command.includes('cp')){
            this.emit('cp',command);
        } else if(command.includes('mv')){
            this.emit('mv',command);
        } else if(command.includes('rm')){
            this.emit('rm',command);
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
    res.then(async path=>{
        if ((await stat(path)).isDirectory()) {
            fileManager.curDir = path;
            process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
        } else {
            process.stdout.write('Operation failed\n')
        }
    }).catch(()=>{
        process.stdout.write('Operation failed\n')
    })
})

fileManager.on('ls',async ()=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleLsCommand(fileManager.curDir);
})

fileManager.on('cat',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleCatCmd(fileManager.curDir,command);
})

fileManager.on('add',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleAddCmd(fileManager.curDir,command);
})

fileManager.on('rn',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleRnCmd(fileManager.curDir,command);
})

fileManager.on('cp',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleCpCmd(fileManager.curDir,command);
})

fileManager.on('mv',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleMvCmd(fileManager.curDir,command);
})

fileManager.on('rm',(command:string)=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    handleRmCmd(fileManager.curDir,command);
})

fileManager.on('unknownOperation',()=>{
    process.stdout.write(` You are currently in ${fileManager.curDir}\n`);
    process.stdout.write('Invalid input\n');
})

fileManager.on('end',()=>{
    process.exit(1);
})

