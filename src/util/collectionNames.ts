import fs from 'fs';
import {basename} from 'path';

const generateRolesForDirectory = (directory: string): string[] => {
  const models: string[] = [];
  for( const file of fs.readdirSync(directory)){ 
    const fullPath = `${directory}/${file}`;
    if(!fs.statSync(fullPath).isDirectory()){
      models.push(basename(fullPath, '.ts'));
    }
  }
  return models;
};
const collectionNames = generateRolesForDirectory('./src/models/');
export {collectionNames};