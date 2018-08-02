const fs = require('fs');
const PATH = require('path');

console.log(process.argv)
console.log(__dirname)

let a = fs.readdirSync(__dirname + '/../')

scanForGit(PATH.join(__dirname,'/../'))

function scanForGit(path, depth = 0){

  try{
    var folders = fs.readdirSync(path);
  }catch(err){
    return 
  }
  


  // console.log(path);
  if (depth > 10){
    return 
  }
  if(folders.includes('.git')){
    gitRemote(path);
  }else{
    for(let i =0;i<folders.length;i++){
      if (folders[i][0] !=='.'){
        scanForGit(PATH.join(path , folders[i]), depth+1)
      }
    }
  }

}

function gitRemote(path){
  let str = fs.readFileSync(PATH.join(path, '.git', 'config'), 'UTF-8');
  let matches = str.match(/(url\s*=.*)/)
  if(matches){
    console.log('-'.repeat(5),'\n' , path ,'\n' , matches[0]);
  }else{
    // console.log('-'.repeat(20), str, '-'.repeat(20))
  }
  
}