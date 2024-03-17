import * as path from 'path';
import * as fs from 'fs';

export const initialize = () => {

}

const createDirectoryIfIsNotExist = (dirName: string) => {
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
}