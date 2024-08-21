import { SaveFile } from './save-file.use-case';
import fs from 'fs';


describe('use case: SaveFile', () => {

    afterEach(() => {
        // clean up
        fs.existsSync('./outputs') &&
        fs.rmSync('./outputs', { recursive: true });

        fs.existsSync('./custom-outputs') &&
        fs.rmSync('./custom-outputs', { recursive: true });
    });
    
    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = './outputs/table.txt';
        const options = { fileContent: 'test content' };
        
        const result = saveFile.execute(options);
        const isExistFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        expect(result).toBeTruthy();
        expect(isExistFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();
        const options = { 
            fileContent: 'custom content', 
            fileDestination: 'custom-outputs', 
            fileName: 'custom-table-name' 
        };
        const filePath = `./${options.fileDestination}/${options.fileName}.txt`;
        
        const result = saveFile.execute(options);
        const isExistFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        expect(result).toBeTruthy();
        expect(isExistFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should return false if directory could not be created', () => {

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Error creating directory');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        const saveFile = new SaveFile();
        const result = saveFile.execute({ fileContent: 'test content' });

        expect(result).toBeFalsy();
        expect(mkdirSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalled();

        mkdirSpy.mockRestore();
        consoleErrorSpy.mockRestore();

    });
    
    test('should return false if file could not be created', () => {

        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('Error creating directory');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        const saveFile = new SaveFile();
        const result = saveFile.execute({ fileContent: 'test content' });

        expect(result).toBeFalsy();
        expect(writeFileSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalled();

        writeFileSpy.mockRestore();
        consoleErrorSpy.mockRestore();

    });

});