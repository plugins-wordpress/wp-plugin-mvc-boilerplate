<?php namespace Wpp\WpPluginMvcBoilerplate\App\Models;


class Messaging  {

    private $mailgun;
    private $twilio;

    public function __construct(){
        $this->init();
    }
    public function init(){
        // Initialize Mailgun and Twilio clients with credentials from .env
        $this->mailgun = new \Mailgun\Mailgun(getenv('MAILGUN_API_KEY'));
        $this->twilio = new \Twilio\Rest\Client(getenv('TWILIO_ACCOUNT_SID'), getenv('TWILIO_AUTH_TOKEN'));
    }

    public function sendEmail($to, $subject, $message) {
        // Compose and send an email using Mailgun
        $this->mailgun->sendMessage(getenv('MAILGUN_DOMAIN'), [
            'from'    => 'your@email.com',
            'to'      => $to,
            'subject' => $subject,
            'html'    => $message,
        ]);
    }

    public function sendTextMessage($to, $message) {
        // Send a text message using Twilio
        $this->twilio->messages->create(
            $to,
            [
                'from' => 'your_twilio_phone_number',
                'body' => $message,
            ]
        );
    }
}