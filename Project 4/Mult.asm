@R2
M=0
@n
M=0

(LOOP)
@n
D=M
@R1
D=D-M
@END
D;JEQ

@R0
D=M
@R2
D=D+M
M=D

@n
M=M+1

@LOOP
0;JMP

(END)
@END
0;JMP