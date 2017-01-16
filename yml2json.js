yaml = require('js-yaml');
fs   = require('fs');
 
// Get document, or throw exception on error 
var doc;
var temp;
function split()
{
	console.log('*********inside split***********');
	var obj = Object.getOwnPropertyNames(doc);
	var obj1 = Object.getOwnPropertyNames(doc[obj[2]]);
	console.log(obj1[0].type);
	// for(var i=0;obj.length;i++)
	// {
	// 	console.log("displayin obj 1"+obj[1]);
	// }
	// for(var i=0;i<doc.length;i++)
	// {
	// 	console.log('inside forloop');
	// 	var obj = doc[i];
	// 	console.log(obj);
	// }
}
function convert(split)
{
try {
   doc = yaml.safeLoad(fs.readFileSync('ci-template.yml', 'utf8'));
  	console.log(doc);
  	split();
} catch (e) {
  console.log(e);
}
}
convert(split);