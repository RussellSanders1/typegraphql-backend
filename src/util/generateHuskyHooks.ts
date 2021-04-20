import fs from 'fs';

/** Generates copies of husky files ending in .template */
for(const file of fs.readdirSync('.husky').filter(file => file.endsWith('.template'))){
  const templateName = `.husky/${file}`;
  if(!fs.statSync(templateName).isDirectory()){
    const exeName = templateName.substr(0, templateName.lastIndexOf('.template'));
    fs.access(exeName, (e) => {
      //problem accessing hook file,
      //assume it doesn't exist
      if(e){
        //copy the template
        fs.copyFile(templateName, exeName, (e) => {
          console.error(e);
        });
      } else {
        console.log(`${exeName} already exists, skipping.`);
      }
    });
  }
}

