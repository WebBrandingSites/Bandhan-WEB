const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'contact.html');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The old web3forms form block
  const formRegex = /<form action="https:\/\/api\.web3forms\.com\/submit" method="POST">[\s\S]*?<\/form>/;
  
  const newForm = `<form id="whatsappForm" onsubmit="sendToWhatsApp(event)">
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Full Name</label>
                <input type="text" id="waName" placeholder="Your Name" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Email Address</label>
                <input type="email" id="waEmail" placeholder="Your Email" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Phone Number</label>
                <input type="tel" id="waPhone" placeholder="Your Phone Number">
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Message</label>
                <textarea id="waMessage" rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-secondary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                Send via WhatsApp 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.398.366 2.76 1.062 3.966L0 16l4.223-1.107a7.868 7.868 0 0 0 3.77.962h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.142-2.493.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </button>
              
              <script>
                function sendToWhatsApp(e) {
                  e.preventDefault();
                  const name = document.getElementById('waName').value;
                  const email = document.getElementById('waEmail').value;
                  const phone = document.getElementById('waPhone').value;
                  const message = document.getElementById('waMessage').value;
                  
                  const text = \`*New Inquiry from Website*%0A%0A*Name:* \${name}%0A*Email:* \${email}%0A*Phone:* \${phone}%0A*Message:*%0A\${message}\`;
                  
                  window.open(\`https://wa.me/971544453885?text=\${text}\`, '_blank');
                }
              </script>
            </form>`;
            
  content = content.replace(formRegex, newForm);
  fs.writeFileSync(filePath, content);
  console.log('Successfully updated contact.html with WhatsApp form');
}
