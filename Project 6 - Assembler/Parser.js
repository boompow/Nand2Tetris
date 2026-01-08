import fs from "fs/promises"
import path from "path"
import os from "os"

const AsmFile = path.join(import.meta.dirname, "File.asm")

class Parse{
    constructor(AsmFile){
        this.AsmFile = AsmFile;
    }

    async cleanInstruction(){
        try {
            const asm = await fs.readFile(this.AsmFile, "utf-8")
            //properly split the file contents based on the end of the line using os module so that it works in any OS
            const asmList = asm.split(os.EOL)

            //from the list remove all the ignored texts like comments and white spaces
            if(asmList){
                const newList = []
                asmList.forEach(element => {
                    if(element.length !== 0 && element.slice(0,2) !== "//"){ 
                        if(element.indexOf("//") !== -1 ){
                            const cleanedElement = element.substring(0, element.indexOf("//")).trim()
                            newList.push(cleanedElement)
                        }else{
                            const cleanedElement = element.trim()
                            newList.push(cleanedElement)
                        }            
                    }
                });
        
                return newList
            }
        } catch (error) {
            console.log(error)
        }
    }

    async instructionType(){
        try {
            const instructions = await this.cleanInstruction()
            const parsedInstruction = []
            
            // A-instruction starts with @ and label symbol starts and ends with ()
            // if neither then it is a C-instruction, with the element before the equal sign being the "dest", b/n '=' and ';' the comp and the one after the ';' the jump - dest=comp;jump

            if(instructions){
                instructions.map((instruction, i)=>{
                    if(instruction[0] === "@"){
                        const object = {
                            line: i,
                            type: "A_INSTRUCTION",
                            value:instruction
                        };

                        parsedInstruction.push(object)
                    }
                    else if(instruction[0] === "(" && instruction[instruction.length-1] === ")"){
                        const object = {
                            line: i,
                            type: "L_INSTRUCTION",
                            value:instruction
                        };

                        parsedInstruction.push(object)
                    }else{
                        let dest = null 
                        let comp = null 
                        let jump = null

                        // dest 
                        if(instruction.indexOf("=") !== -1){
                            dest = instruction.slice(0, instruction.indexOf("="))
                        }
                        if(instruction.indexOf("=") !== -1 && instruction.indexOf(";") === -1){
                            comp = instruction.slice(instruction.indexOf("=")+1)
                        }
                        if(instruction.indexOf("=") === -1 && instruction.indexOf(";") !== -1){
                            comp = instruction.slice(0, instruction.indexOf(";"))
                        }
                        if(instruction.indexOf("=") !== -1 && instruction.indexOf(";") !== -1){
                            comp = instruction.slice(instruction.indexOf("=")+1, instruction.indexOf(";"))
                        }
                        if(instruction.indexOf(";") !== -1){
                            jump = instruction.slice(instruction.indexOf(";")+1)
                        }
                        const object = {
                            line: i,
                            type: "C_INSTRUCTION",
                            value:instruction,
                            dest: dest,
                            comp: comp,
                            jump: jump
                        };

                        parsedInstruction.push(object)
                    }
                })
            }

            return console.log(parsedInstruction)

            
        } catch (error) {
            console.log(error)
        }

    }
}


const parse = new Parse(AsmFile)
parse.instructionType()