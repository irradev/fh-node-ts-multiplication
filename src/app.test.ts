import { ServerApp } from "./presentation/server-app";

describe('Test App.ts', () => {
    
    test('should call Server.run with values', async() => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = [
            'node',
            'app.ts',
            '-b',
            '5',
            '-l',
            '12',
            '-s',
            '-n',
            'testFile',
            '-d',
            'testFolder'
        ];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 5,
            limit: 12,
            showTable: true, 
            fileName: 'testFile', 
            fileDestination: 'testFolder'
        });

    });

})