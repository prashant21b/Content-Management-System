
// const DatauriParser = require('datauri-parser').default;

// const path =require("path");
// exports.getDataUri=(file)=>{
//     if(!file || file[0] == 'undefined') return;
// const parser=new DatauriParser();
// console.log("path",path)
// const extName=path.extname(file.originalName).toString();
// console.log(extName);
// return parser.format(extName,file.content);
// }


const path = require('path');
const fs = require('fs');

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.path) {
    return null; // Return null or handle the missing file data case as per your requirement
  }

  const extName = path.extname(file.originalname).toString();
  const fileData = fs.readFileSync(file.path);
  const dataUri = `data:${extName};base64,${fileData.toString('base64')}`;
  return dataUri;
};

module.exports = {
  getDataUri,
};

