#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const chalk = require('chalk');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const talk = (data) => {
    console.clear();
    console.log(`          ____  
        o8%8888,    
      o88%8888888.  
     8'-    -:8888b   
    8'         8888  
   d8.-=. ,==-.:888b       ${data}
   >8 \`~\` :\`~\' d8888     /
   88         ,88888    /
   88b. \`-~  \':88888  
   888b ~==~ .:88888 
   88888o--:':::8888      
   \`88888| :::' 8888b  
   8888^^'       8888b  
  d888           ,%888b.   
 d88%            %%%8--'-.  
/88:.__ ,       _%-' ---  -  
    '''::===..-'   =  --.\n`);
};

const base64encoding = (string) =>{
    base64EncodedText = Buffer.from(string, "utf8").toString('base64');
    console.log("Base64 Encoded Text : ", base64EncodedText);
    rl.close();
}

const base64decoding = (string) =>{
    base64DecodedText = Buffer.from(string, "base64").toString('utf8');
    console.log("Base64 Decoded Text : ", base64DecodedText);
    rl.close();
}

const hashEncoding = (data)=>{
    hashEncodedText = crypto.createHash('sha512').update(data).digest('base64');
    console.log(hashEncodedText);
    rl.close();
}

const base64Coding = (data) =>{
        if(data=='1'){
            console.log('암호화할 평문을 적어주세요.');
            rl.question('=> ',base64encoding);
        } else if (data=='2'){
            console.log('복호화할 암호문을 적어주세요.');
            rl.question('=> ',base64decoding);
        } else{
            console.clear();
            talk(chalk.bold.red('둘 중에 하나만 선택해주시겠어요? 뒤1지기 싫으면'));
            console.log('\n1.암호화 2.복호화');
            rl.question('=> ', base64Coding);
        }
    };

function encrypting(dataArray) {
    const data=dataArray[0];
    const key=dataArray[1];
    const iv = dataArray[2];
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let result = cipher.update(data, 'utf8', 'base64')
    + cipher.final('base64');
    console.log('암호화: ', result);
    rl.close();
}

console.clear();
talk('환영합니다. 원하시는 작업이 뭐죠?');
console.log('\n1.Base64 2.단방향 3.양방향(개발중)');
rl.question('=> ', (answer)=>{
    if(answer=='1'){
        talk('Base64 관련 일이로군요. 뭘 원하시죠?');
        console.log('1.암호화 2.복호화');
       rl.question('=> ',base64Coding);
    } 
    else if(answer=='2'){
        talk('해시 암호화 하시려고요? 평문 적어보시면 적어드림요.');
        rl.question('=> ', hashEncoding);
    }
    else if (answer=='3'){
        talk('양방향 암호하려면 키가 또 필요하답니다.. 잘 간직하시길!');
        console.log('암호화할 문장-Key-IV 순으로 작성해주세요.');
        rl.question(
            '=>',
            (data) => {
              const dataArray = data
                .trim()
                .split(' ')
            encrypting(dataArray);
            }
          );
    }
})
