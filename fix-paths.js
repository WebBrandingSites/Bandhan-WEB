const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'services.html', 'contact.html', 'policy.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="/" with href="./index.html"
    content = content.replace(/href="\/"/g, 'href="./index.html"');
    
    // Replace href="/page.html" with href="./page.html"
    content = content.replace(/href="\/([^"]+\.html)"/g, 'href="./$1"');
    
    // Replace src="/file" with src="./file"
    content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
    
    // Replace href="/file.jpg/css" with href="./file.jpg/css"
    content = content.replace(/href="\/([^"]+\.(?:jpg|css|png|ico))"/g, 'href="./$1"');
    
    // Replace inline background urls url(/file.jpg) with url(./file.jpg)
    content = content.replace(/url\(\/([^)]+)\)/g, 'url(./$1)');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated paths in ${file}`);
  }
});
