const mailgun = require("mailgun-js");
const DOMAIN = "mail.afrosintech.com";
const mg = mailgun({apiKey: "ENTER_API_KEY_HERE", domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@mail.afrosintech.com>",
	to: "ericson.weah@ericsonweah.com",
	subject: "Hello",
	template: "playgrorund alert",
	'h:X-Mailgun-Variables': {test: "test"}
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});
// # Send an email using your active template with the above snippet
// # You can see a record of this email in your logs: https://app.mailgun.com/app/logs.