const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'services.html', 'contact.html', 'policy.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update footer email
    content = content.replace(
      /<li><i data-lucide="mail" class="contact-item-icon"><\/i> <span>info\.bandhanuae@gmail\.com<\/span><\/li>/g,
      '<li><i data-lucide="mail" class="contact-item-icon"></i> <span>info.bandhanuae@gmail.com<br>am.seal1982@gmail.com</span></li>'
    );
    
    // Update contact page specific email paragraph
    content = content.replace(
      /<p style="color: var\(--text-dark\); line-height: 1\.6; font-size: 0\.95rem;">info\.bandhanuae@gmail\.com<\/p>/g,
      '<p style="color: var(--text-dark); line-height: 1.6; font-size: 0.95rem;">info.bandhanuae@gmail.com<br>am.seal1982@gmail.com</p>'
    );
    
    // Update footer copyright
    content = content.replace(
      /<p>&copy; 2026 Bandhan Contracting &amp; General Maintenance LLC\. All rights reserved\.<\/p>/g,
      '<p>&copy; 2026 Bandhan Contracting &amp; General Maintenance LLC. All rights reserved. <br> Copyright &copy; Web Branding</p>'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated content in ${file}`);
  }
});
