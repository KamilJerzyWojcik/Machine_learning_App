class Operator{
    public parameter: number;
    constructor(public name: string,
                public hasParameter: boolean,
                public onSelf: boolean //on self column (true) or to another column (false)
                ){
    }
}


export const OPERATORS: string[] = ["+", "-", "/", "*", "//"];

export const SELF_OPERATORS: string[] = ["ceil", "floor", "fabs", "exp", "pow", "log", "log2", "log10"];

