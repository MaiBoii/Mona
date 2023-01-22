#!/usr/bin/env node
const readlineSync = require('readline-sync');
const crypto = require('crypto');
const chalk = require('chalk');

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
}

const base64decoding = (string) =>{
    base64DecodedText = Buffer.from(string, "base64").toString('utf8');
    console.log("Base64 Decoded Text : ", base64DecodedText);
}

const hashEncoding = (data)=>{
    hashEncodedText = crypto.createHash('sha512').update(data).digest('base64');
    console.log("SHA512 Encoded Text : ",hashEncodedText);
}

const base64Coding = (data) =>{
        if(data==0){
            talk('암호화할 평문을 적어주세요.');
            let word=readlineSync.question('=> ');
            base64encoding(word);
        } else if (data==1){
            talk('복호화할 암호문을 적어주세요.');
            let word=readlineSync.question('=> ');
            base64decoding(word);
        }
    };

function encrypting(index) {
    if(index==0){
        talk('암호화할 평문을 적어주세요.');
        let word=readlineSync.question('=> ');
        talk('key를 입력해주세요.(32자)');
        let key=readlineSync.question('=> ');
        while(key.length!=32){
            talk(chalk.red('32자를 맞추지 않는다면 타격을 가하겠습니다.'));
            key=readlineSync.question('=> ');
        }
        talk('IV를 입력해주세요.(16자)');
        let iv=readlineSync.question('=> ');
        while(iv.length!=16){
            talk(chalk.red('16자를 맞추지 않는다면 타격을 가하겠습니다.'));
            iv=readlineSync.question('=> ');
        }
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let result = cipher.update(word, 'utf8', 'base64')
        + cipher.final('base64');
        console.log('Encoded Text : ', result);
    }
    else if(index==1){
        talk('복호화할 평문을 적어주세요.');
        let word=readlineSync.question('=> ', () => {
        });
        talk('key를 입력해주세요.(32자)');
        let key=readlineSync.question('=> ');
        while(key.length!=32){
            talk(chalk.red('32자를 맞추지 않는다면 타격을 가하겠습니다.'));
            key=readlineSync.question('=> ');
        }
        talk('IV를 입력해주세요.(16자)');
        let iv=readlineSync.question('=> ');
        while(iv.length!=16){
            talk(chalk.red('16자를 맞추지 않는다면 타격을 가하겠습니다.'));
            iv=readlineSync.question('=> ');
        }
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let result = decipher.update(word, 'base64', 'utf8')
        + decipher.final('utf8');
        console.log('복호화: ', result);
    }
}

console.clear();
talk('환영합니다. 원하시는 작업이 뭐죠?');
const toDo = ['Base64','단방향 암호화','양방향 암호화']
const index = readlineSync.keyInSelect(toDo, '무슨 작업을 하시겠어요?');
if(index==0){
    talk('Base64를 선택하셨군요.');
    const toDo = ['암호화','복호화'],
    index = readlineSync.keyInSelect(toDo, '무슨 작업을 하시겠어요?');
    base64Coding(index);
}
else if(index==1){
    talk('해쉬 암호화 하시게요?');
    const index = readlineSync.question('암호화할 평문을 적어주세요.\n=> ');
    hashEncoding(index);
}
else if(index==2){
    talk('키와 IV는 꼭 잘 간직하시길... 잃어버려도 책임 못 져요');
    const toDo = ['암호화','복호화'],
    index = readlineSync.keyInSelect(toDo, '무슨 작업을 하시겠어요?');
    encrypting(index);
}