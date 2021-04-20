import fs from 'fs';

/** Generates copies of husky files ending in .template */
for(const file of fs.readdirSync('.husky').filter(file => file.endsWith('.template'))){
  const templateName = `.husky/${file}`;
  if(!fs.statSync(templateName).isDirectory()){
    const exeName = templateName.substr(0, templateName.lastIndexOf('.template'));

    //replace hook regardless of existence (dangerous)
    fs.copyFile(templateName, exeName, (e) => {
      console.error(e);
    });
  }
}

