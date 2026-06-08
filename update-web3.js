const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'services.html', 'contact.html', 'policy.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update footer copyright correctly
    content = content.replace(
      /Copyright &copy; Web Branding/g,
      'Copyright &copy; <span style="color: #9b59b6; font-weight: 600;">thewebbranding.com</span>'
    );
    
    // Specifically for contact.html, update the form
    if (file === 'contact.html') {
      const oldForm = `<form>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Full Name</label>
                <input type="text" placeholder="Your Name" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Email Address</label>
                <input type="email" placeholder="Your Email" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Phone Number</label>
                <input type="tel" placeholder="Your Phone Number">
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" class="btn btn-secondary" style="width: 100%;">Submit Inquiry <i data-lucide="mail"></i></button>
            </form>`;
            
      const newForm = `<form action="https://api.web3forms.com/submit" method="POST">
              <!-- Replace with your actual Web3Forms Access Key -->
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
              <input type="hidden" name="subject" value="New Inquiry from Bandhan Website">
              <input type="hidden" name="from_name" value="Bandhan Website Form">
              <input type="hidden" name="redirect" value="https://webbrandingsites.github.io/Bandhan-WEB/contact.html?success=true">

              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Full Name</label>
                <input type="text" name="name" placeholder="Your Name" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Email Address</label>
                <input type="email" name="email" placeholder="Your Email" required>
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Phone Number</label>
                <input type="tel" name="phone" placeholder="Your Phone Number">
              </div>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Message</label>
                <textarea name="message" rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              
              <!-- Check for success parameter in URL to show success message -->
              <script>
                if(window.location.search.includes('success=true')) {
                  document.write('<div style="background-color: #d4edda; color: #155724; padding: 10px; margin-bottom: 15px; border-radius: 4px; text-align: center;">Your inquiry has been sent successfully!</div>');
                }
              </script>
              
              <button type="submit" class="btn btn-secondary" style="width: 100%;">Submit Inquiry <i data-lucide="mail"></i></button>
            </form>`;
            
      content = content.replace(oldForm, newForm);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated content in ${file}`);
  }
});
