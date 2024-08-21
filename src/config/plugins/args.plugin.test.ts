import { mockProcessExit } from 'jest-mock-process';

const runCommand = async(args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { ArgsPlugin } = await import('./args.plugin');
    const argsPlugin = new ArgsPlugin();
    
    return argsPlugin.getArgs();
}

describe('plugin: args', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const argsPlugin = await runCommand(['-b', '5']);

        expect(argsPlugin).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'table',
                d: 'outputs',
            })
        );
    });

    test('should return configuration with custom values', async () => {
        const argsPlugin = await runCommand([
            '-b', '7', 
            '-l', '12', 
            '-s', 
            '-n', 'custom-table', 
            '-d', 'custom-outputs'
        ]);

        expect(argsPlugin).toEqual(
            expect.objectContaining({
                b: 7,
                l: 12,
                s: true,
                n: 'custom-table',
                d: 'custom-outputs',
            })
        );
    });

    
    test('should return error if option b is less than 1', async () => {
        const { ArgsPlugin } = await import('./args.plugin');
        process.argv = [...process.argv, '-b', '0'];
        const argsPlugin = new ArgsPlugin();

        const mockExit = mockProcessExit();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
        argsPlugin.getArgs();
    
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: base must be greater than 0'));
        expect(mockExit).toHaveBeenCalledWith(1);
    
        mockExit.mockRestore();
        consoleErrorSpy.mockRestore();

    });
    
    test('should return error if option b is not found', async () => {
        const { ArgsPlugin } = await import('./args.plugin');
        const argsPlugin = new ArgsPlugin();

        const mockExit = mockProcessExit();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
        argsPlugin.getArgs();
    
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Missing'));
        expect(mockExit).toHaveBeenCalledWith(1);
    
        mockExit.mockRestore();
        consoleErrorSpy.mockRestore();

    });
});