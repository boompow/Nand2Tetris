import { Parse } from "./Parser.js";
import CtoBinaryMap from "./CodeModule.js";
import { SymbolTable } from "./SymbolTable.js";
import path from "path"

const AsmFile = path.join(import.meta.dirname, "File.asm")

class Assembler extends Parse{
    constructor(AsmFile){
        super(AsmFile)
        this.symbolTable = new SymbolTable();
    }

    async convertToBinary(){
        const parsedInstruction = await this.instructionType()
        const binaryInstruction = []
        parsedInstruction.map((instruction, index)=>{
            if(instruction.type === "A_INSTRUCTION"){
                const value = instruction.value.slice(1);
                if(this.symbolTable.isNumber(value)){
                    const valueBinary = value.toString(2)
                    const A_instruction =  "0" + valueBinary.slice(0, 15)
                    binaryInstruction.push({
                        line:index,
                        instruction: A_instruction
                    })
                }
            }
            else if(instruction.type === "C_INSTRUCTION"){
                
            }

        })
        return console.log(parsedInstruction)
    }
}

const assemble = new Assembler(AsmFile)

console.log(assemble.convertToBinary())