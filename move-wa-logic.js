const fs = require('fs');
const path = require('path');

// 1. Update contact.html
const contactPath = path.join(__dirname, 'contact.html');
if (fs.existsSync(contactPath)) {
  let content = fs.readFileSync(contactPath, 'utf8');
  
  // Remove onsubmit from form tag
  content = content.replace('<form id="whatsappForm" onsubmit="sendToWhatsApp(event)">', '<form id="whatsappForm">');
  
  // Remove inline script block
  const scriptBlock = `<script>
                function sendToWhatsApp(e) {
                  e.preventDefault();
                  const name = document.getElementById('waName').value;
                  const email = document.getElementById('waEmail').value;
                  const phone = document.getElementById('waPhone').value;
                  const message = document.getElementById('waMessage').value;
                  
                  const text = \`*New Inquiry from Website*%0A%0A*Name:* \${name}%0A*Email:* \${email}%0A*Phone:* \${phone}%0A*Message:*%0A\${message}\`;
                  
                  window.open(\`https://wa.me/971544453885?text=\${text}\`, '_blank');
                }
              </script>`;
              
  content = content.replace(scriptBlock, '');
  
  fs.writeFileSync(contactPath, content);
  console.log('Updated contact.html');
}

// 2. Update main.js
const mainPath = path.join(__dirname, 'main.js');
if (fs.existsSync(mainPath)) {
  let mainContent = fs.readFileSync(mainPath, 'utf8');
  
  const waLogic = `
document.addEventListener('DOMContentLoaded', () => {
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waName').value;
            const email = document.getElementById('waEmail').value;
            const phone = document.getElementById('waPhone').value;
            const message = document.getElementById('waMessage').value;
            
            const text = \`*New Inquiry from Website*\\n\\n*Name:* \${name}\\n*Email:* \${email}\\n*Phone:* \${phone}\\n*Message:*\\n\${message}\`;
            const encodedText = encodeURIComponent(text);
            
            window.open(\`https://wa.me/971544453885?text=\${encodedText}\`, '_blank');
        });
    }
});
`;
  
  if (!mainContent.includes("whatsappForm.addEventListener")) {
    fs.appendFileSync(mainPath, waLogic);
    console.log('Updated main.js');
  }
}
