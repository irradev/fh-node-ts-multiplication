import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


interface ArgsProps {
    b: number;
    l: number;
    s: boolean;
    n: string;
    d: string;
}

type ArgsOptions = yargs.Argv<ArgsProps>;
type ArgsArguments = yargs.Arguments<ArgsProps>

export class ArgsPlugin {

    private argsProcess: string[] = [];
    private argsParsed: ArgsProps | null = null;
    private argsCreated: ArgsOptions | null = null;

    constructor(argProcess: string[] = process.argv) {
        this.setArgsProcess(argProcess);
        this.setArgsCreator();
    }

    private setArgsProcess(argsProcess: string[] = []) {
        this.argsProcess = argsProcess;
    }

    private setArgsCreator = () => {
        this.argsCreated = yargs(hideBin(this.argsProcess))
        .option('b', {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Multiplication table base'
        })
        .option('l', {
            alias: 'limit',
            type: 'number',
            default: 10,
            describe: 'Multiplication table limit'
        })
        .option('s', {
            alias: 'show',
            type: 'boolean',
            default: false,
            describe: 'Show multiplication table'
        })
        .option('n', {
            alias: 'name',
            type: 'string',
            default: 'table',
            describe: 'File name'
        })
        .option('d', {
            alias: 'destination',
            type: 'string',
            default: 'outputs',
            describe: 'File destinarion'
        })
        .check(this.argsValidator);
    }

    private argsValidator =  (argv: ArgsArguments): boolean => {
        if (argv.b < 1) throw 'Error: base must be greater than 0';
        
        return true;
    }

    public getArgPlugin = () => {
        return yargs;
    }

    public getCreatedArgs = (): ArgsOptions | null => {
        return this.argsCreated;
    }

    public getArgs = (): ArgsProps | null => {
        this.argsParsed = this.argsCreated!.parseSync();
        return this.argsParsed;
    }
}
