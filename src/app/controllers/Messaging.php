<?php namespace Wpp\WpPluginMvcBoilerplate\App\Controllers; 

use Wpp\WpPluginMvcBoilerplate\App\Views\View;

class Messaging {
    public View $view; 
    public function __construct(){
        $this->init();
    }
    public function init(){
        $this->view = new View();
        // WordPress Plugin Initialization (main plugin file)
        add_action('init', [$this, 'register_my_plugin_routes']);
    }

    public function sendEmailAction() {
        $model = new MessagingModel();
        
        // Example usage to send an email
        $to = 'recipient@example.com';
        $subject = 'Hello from my WordPress plugin!';
        $message = '<p>This is the email content.</p>';
        
        $model->sendEmail($to, $subject, $message);
    }

    public function sendTextMessageAction() {
        $model = new MessagingModel();
        
        // Example usage to send a text message
        $to = '+1234567890'; // Replace with the recipient's phone number
        $message = 'Hello from my WordPress plugin!';
        
        $model->sendTextMessage($to, $message);
    }

    function register_my_plugin_routes() {
        $controller = new MessagingController();
    
        // Define custom routes and associate them with controller methods
        add_action('wp_ajax_send_email', [$controller, 'sendEmailAction']);
        add_action('wp_ajax_nopriv_send_email', [$controller, 'sendEmailAction']);
        
        add_action('wp_ajax_send_text_message', [$controller, 'sendTextMessageAction']);
        add_action('wp_ajax_nopriv_send_text_message', [$controller, 'sendTextMessageAction']);
    }
}