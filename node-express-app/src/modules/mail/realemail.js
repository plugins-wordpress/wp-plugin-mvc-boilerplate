const express = require('express');
const dns = require('dns');
const { isEmail } = require('email-validator');

const app = express();
const port = 3000;

// Define an API endpoint to check the email
app.get('/check-email', async (req, res) => {
  const { email } = req.query;

  // Validate the email format
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Extract the domain from the email
  const domain = email.split('@')[1];

  // Perform a DNS lookup for the domain's MX records
  dns.resolveMx(domain, (err, addresses) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'DNS lookup failed. Invalid domain or no MX records found.' });
    }

    if (addresses.length === 0) {
      return res.status(400).json({ error: 'No MX records found for the domain. Invalid email address.' });
    }

    res.status(200).json({ message: 'DNS lookup successful. Valid email address.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
