import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('ServerApp', () => {

    
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileName: 'test-filename',
        fileDestination: 'test-destination',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create server app instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation();
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute').mockImplementation(() => 'test table content');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute').mockImplementation(() => true);

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenLastCalledWith('File created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

        logSpy.mockRestore();
        createTableSpy.mockRestore();
        saveFileSpy.mockRestore();
    });

    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const createMock = jest.fn(() => 'test table content');
        const saveFileMock = jest.fn(() => true);

        global.console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(logMock).toHaveBeenLastCalledWith('File created!');

        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

    });

    test('should return file not created', () => {
        const consoleLogMock = jest.fn();
        const consoleErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('test table content');
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = consoleLogMock;
        console.error = consoleErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run(options);

        expect(consoleLogMock).toHaveBeenCalledWith('Server running...');
        expect(consoleErrorMock).toHaveBeenLastCalledWith('File not created!');

        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

    });

});