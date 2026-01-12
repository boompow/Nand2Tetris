import { Parse } from "./Parser.js";
import {CtoBinaryMap} from "./CodeModule.js";
import { SymbolTable } from "./SymbolTable.js";
import path from "path"
import { writeFile } from "fs/promises";

const AsmFile = path.join(import.meta.dirname, "File.asm")

class Assembler extends Parse{
    constructor(AsmFile){
        super(AsmFile)
        this.symbolTable = new SymbolTable();
    }

    async convertToBinary(){
        const parsedInstruction = await this.instructionType()
        const binaryInstruction = []
        for(const instruction of parsedInstruction){
            if(instruction.type === "A_INSTRUCTION"){
                const value = instruction.value.slice(1);
                if(this.symbolTable.isNumber(value)){
                    const valueBinary = value.toString(2).padStart(15, "0")
                    const A_instruction = "0" + valueBinary
                    binaryInstruction.push(A_instruction)
                }else if(!this.symbolTable.isNumber(value)){
                    if(this.symbolTable.contains(value)){
                        const address = this.symbolTable.getAddress(value);
                        const valueBinary = address.toString(2).padStart(15, "0")
                        const A_instruction = "0" + valueBinary
                        binaryInstruction.push(A_instruction)
                    }else{
                        const address = this.symbolTable.addEntry(value);
                        const valueBinary = address.toString(2).padStart(15, "0")
                        const A_instruction = "0" + valueBinary
                        binaryInstruction.push(A_instruction)
                    }
                }
            }
            else if(instruction.type === "C_INSTRUCTION"){
                const dest = CtoBinaryMap("dest", instruction.dest)
                const comp = CtoBinaryMap("comp", instruction.comp)
                const jump = CtoBinaryMap("jump", instruction.jump)
                const C_instruction = "111" + comp + dest + jump
                binaryInstruction.push(C_instruction)
            }
            else if(instruction.type === "L_INSTRUCTION"){
                // const value = instruction.value.slice(1, item.length-1)

            }

        }
        return binaryInstruction
    }

    async writeHack(){
        try {
            const instructionArray = await this.convertToBinary()
            const instruction = instructionArray.join("\n")
            await writeFile("File.hack", instruction)
            console.log("File.hack created successfully")
        } catch (error) {
            console.log(error)
        }
    }
}

const assemble = new Assembler(AsmFile)
assemble.writeHack()