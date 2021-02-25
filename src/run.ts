

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Save{
    private input: string;
    private output:string;
    private execTimeInMillis:number;
    private fileLocationAndName = ("src/results/"+  "savedFile"+".json");
    /*private fileName:string;
    private fileLocation:string;
    */

    constructor(input: string, output:string, execTimeInMillis:number){
        this.input=input;
        this.output=output;
        this.execTimeInMillis=execTimeInMillis;
    }

    saveToFile():void{
        let myjson = JSON.stringify(this)
        
        var fs = require('fs');
        
        fs.writeFile(this.fileLocationAndName, myjson, function(err) {
        if (err) {
            console.log(err);
            throw err; 
        }
        });
    }

    loadFile():void{
        
        var fs = require('fs');
        fs.readFile(this.fileLocationAndName, function (err, data) {
          if (err) {
            console.log(err);
            throw err;  
          }
         
          let mydata = JSON.parse(data.toString());
          this.input = mydata.input;
          this.output = mydata.output;
          this.execTimeInMillis = mydata.execTimeInMillis;
        });
    }
}

var input: string;
var output:string;

rl.question('Type your word:', function (answer) {

    if(isAlphanumeric(answer)){
        console.log(comandExecution(answer));
        rl.close();

    }else{
        console.log("input is not alphanumeric")
        rl.close();
    }

    
});

function isAlphanumeric(word):boolean{
    return /^[a-zA-Z0-9_]*$/.test(word);
}

function comandExecution(answer):string{
    let startTime = new Date();

    input=answer;

    let stringSplit = input.split("");
    let reversed = stringSplit.reverse();


    let inverted:string ="";
    reversed.forEach(char => {
        if (/[A-Z]/.test(char)){

            inverted += char.toLocaleLowerCase();
            
        }else if (/[a-z]/.test(char)){

            inverted += char.toLocaleUpperCase();

        }else{

            inverted += char;
        }
    });

    output = inverted;
       

    let endTime = new Date();
    let timeDiff:number = endTime.getMilliseconds() - startTime.getMilliseconds();
    let save:Save = new Save(input,output,timeDiff);

    save.saveToFile();
  
    
    return output;
}

exports.Save = Save;
exports.comandExecution =  comandExecution;
exports.isAlphanumeric = isAlphanumeric;

