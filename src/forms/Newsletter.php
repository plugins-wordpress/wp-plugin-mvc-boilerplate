<?php 
namespace Wpp\WpPluginMvcBoilerplate\Forms;


use \Mailgun\Mailgun;
use \Twilio\Rest\Client;

class Newsletter {
   
        private $mailgun;
        private $twilio;
    
        public function __construct(){
            $this->init();
        }
        public function init(){
            // Initialize Mailgun and Twilio clients with credentials from .env
            //$this->mailgun = new Mailgun($_ENV('MAILGUN_API_KEY'));
            //$this->twilio = new Client($_ENV('TWILIO_ACCOUNT_SID'), $_ENV('TWILIO_AUTH_TOKEN'));
            //die($_ENV['MAILGUN_PRIVATE_KEY']);
        }
    
        public function sendEmail($to, $subject, $message) {
            // Compose and send an email using Mailgun
            $this->mailgun->sendMessage($_ENV('MAILGUN_DOMAIN'), [
                'from'    => 'ericson@gmail.com',
                'to'      => $to,
                'subject' => $subject,
                'html'    => $message,
            ]);
        }
    
        public function sendTextMessage($to, $message) {
            //Send a text message using Twilio
            $this->twilio->messages->create(
                $to,
                [
                    'from' => 'your_twilio_phone_number',
                    'body' => $message,
                ]
            );
        }
    
}

new Newsletter();
