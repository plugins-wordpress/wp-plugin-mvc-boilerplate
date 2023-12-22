<?php namespace Wpp\WpPluginMvcBoilerplate\Assets; 

class Script {
    public function __construct(){
        $this->init();
    }
    public function init(){
        add_action('wp_enqueue_scripts', [$this, 'wp_plugin_mvc_boilerplate_add_scripts']);
    }

    public function wp_plugin_mvc_boilerplate_add_scripts(){
        
        wp_enqueue_script('wppmvcb-socket-client-script', 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js', array('jquery'),true);
        wp_enqueue_script('wppmvcb-axios-script', 'https://unpkg.com/axios/dist/axios.min.js', array('jquery'),true);
        wp_enqueue_script('wppmvcb-rest-script', plugins_url(). '/wp-plugin-mvc-boilerplate/public/js/rest/app.js', array('wp-api'), '1.0.0', true);
        wp_enqueue_script('wppmvcb-main-script', plugins_url(). '/wp-plugin-mvc-boilerplate/public/js/app.js', array('jquery'), '1.0.0', true);
        wp_enqueue_script('wppmvcb-newsletter-script', plugins_url(). '/wp-plugin-mvc-boilerplate/public/js/newsletter.js', array('jquery'), '1.0.0', true);


    }
}