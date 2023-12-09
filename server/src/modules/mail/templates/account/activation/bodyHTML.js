module.exports = (data = {}) => `<strong style="color: blue;">Dear ${data.firstname} ${data.lastname}</strong>, <br>

Welcome to Playground LLC! We're thrilled that you've chosen to join our community. To get started, we just need you to activate your account.

Here's how to activate your account:
<ul>
 <li>
   <h4>Step 1: Verify Your Email Address</h4>
   To ensure the security of your account, we require email verification. Please click on the following link to verify your email address:
<a href="${data.buttonLink = data.buttonLink || ' Data ButtonLink'}" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing:  font-size: 14px; color: #FFF; text-decoration: none; font-weight: bold; text-align: center; cursor: pointer; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda;">${data.buttonTitle = data.buttonTitle || ' Data Button Title'}</a>

If the link above doesn't work, you can copy and paste this URL into your web browser:
${data.buttonLink = data.buttonLink}
 </li>
 <li>
  <h4>Step 2: Set Your Password <strong style="color:red;">only if needed</strong></h4>
After verifying your email address, you may be prompted to set a password for your account. If so, make sure to choose a strong and secure password to protect your information.
 </li>
</ul>


Once your account is activated, you'll gain access to all the fantastic features and benefits of Playground LLC, including:

Real-time Chat Access
Create and Manage Teams
Personal Email Box
If you ever forget your password or need any assistance, don't hesitate to reach out to our support team at <a href="mailto:support@playground.com" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing:  font-size: 14px; color: #FFF; text-decoration: none; font-weight: bold; text-align: center; cursor: pointer; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda;">Playground Support</a>. We're here to help.

Thank you for choosing Playground LLC. We're looking forward to having you as part of our community, and we can't wait to see what you'll achieve with us.

If you have any questions or need further assistance with the activation process, please feel free to contact us. <br> <br> <br>

<strong>Best regards</strong>, <br>

Ericson S. Weah <br>
Chef Executive Officer <br>
Playground LLC, Salt Lake City, UT, USA <br>
website: http://localhost:3000 <br>
email: ericson.weah@playground.com <br>
phone: +1.385.204.5167 
`