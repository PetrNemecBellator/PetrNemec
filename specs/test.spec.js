const { isMainThread } = require("worker_threads");



var runTest= require("../src/results/run.js");

var Save = runTest.Save;
var isAlphanumeric = runTest.isAlphanumeric;
var comandExecution= runTest.comandExecution;


var chai = require("chai");
const { isArrowFunction } = require("typescript");

var expect = chai.expect;



describe("Test suit",function(){
    it(" is Alphanumeric",function(){
        expect(isAlphanumeric("45as")).to.be.equal(true);
        expect(isAlphanumeric("45 as")).to.be.equal(false);

    });

    it("comand execution output",function(){
        expect(comandExecution("a6t")).to.be.equal("T6A")
        expect(comandExecution("abCD12")).to.be.equal("21dcBA")
        expect(comandExecution("21dcBA")).to.be.equal("abCD12")


    });

    it("save to file",function(){
        let save;
        save = new Save("abCD12","21dcBA",20);
        
        expect(save.input).to.be.equal("abCD12");
        expect(save.output).to.be.equal("21dcBA");
        expect(save.execTimeInMillis).to.be.lessThan(31);
        
        save.saveToFile();
        save.loadFile();

        expect(save.input).to.be.equal("abCD12");
        expect(save.output).to.be.equal("21dcBA");
        expect(save.execTimeInMillis).to.be.equal(20);
        
    });
});