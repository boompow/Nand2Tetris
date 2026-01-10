
export class SymbolTable{
    constructor(){
        this.nextAddress = 16
        this.table =  {
            "R0" : 0,
            "R1" : 1,
            "R2" : 2,
            "R3" : 3,
            "R4" : 4,
            "R5" : 5,
            "R6" : 6,
            "R7" : 7,
            "R8" : 8,
            "R9" : 9,
            "R10" : 10,
            "R11" : 11,
            "R12" : 12,
            "R13" : 13,
            "R14" : 14,
            "R15" : 15,

            "SP" : 0,
            "LCL" : 1,
            "ARG" : 2,
            "THIS" : 3,
            "THAT" : 4,

            "SCREEN" : 16384,
            "KBD" : 24576
        }
    }

    // check if symbol is number with REGEX
    isNumber(symbol){
        const regex = /^\d+$/;
        return regex.test(symbol);
    }

    addEntry(symbol, address){
        if(!Object.hasOwn(this.table, symbol) && !this.isNumber(symbol)){
            if(address == null){
                this.table[symbol] = this.nextAddress++
            }else{
                this.table[symbol] = address
            }
        }else{
            console.log("Symbol already has address")
        }
    }

    contains(symbol){
        return Object.hasOwn(this.table, symbol)
    }

    getAddress(symbol){
        if(Object.hasOwn(this.table, symbol)){
            return this.table[symbol]
        }else{
            console.log("Symbol doesn't exist")
        }
    }
}



