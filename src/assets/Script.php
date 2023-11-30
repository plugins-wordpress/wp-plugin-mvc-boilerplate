<?php namespace Wpp\WpPluginMvcBoilerplate\Assets; 

class Script {
    public function __construct(){
        $this->init();
    }
    public function init(){
        add_action('wp_enqueue_scripts', [$this, 'wp_plugin_mvc_boilerplate_add_scripts']);
    }

    public function wp_plugin_mvc_boilerplate_add_scripts(){
        wp_enqueue_script('wppmvcb-main-script', plugins_url(). '/wp-plugin-mvc-boilerplate/public/js/app.js');
    }
}