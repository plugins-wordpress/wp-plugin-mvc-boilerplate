<?php namespace Wpp\WpPluginMvcBoilerplate\Assets; 

class Style {
    public function __construct(){
        $this->init();
    }
    public function init(){
        add_action('wp_enqueue_scripts', [$this, 'wp_plugin_mvc_boilerplate_add_styles']);
    }

    public function wp_plugin_mvc_boilerplate_add_styles(){
        wp_enqueue_style('wppmvcb-main-style', plugins_url(). '/wp-plugin-mvc-boilerplate/public/css/app.css');
        wp_enqueue_style('wppmvcb-newsletter-style', plugins_url(). '/wp-plugin-mvc-boilerplate/public/css/newsletter.css');
    }
}