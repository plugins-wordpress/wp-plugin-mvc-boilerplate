<?php namespace Wpp\WpPluginMvcBoilerplate\Widgets;



class Widget {
    public function __construct(){
        $this->init();
    }
    public function init(){
        $this->wpppmvb_regsiter_add_widget_actions();
    }


    public function wpppmvb_regsiter_add_widget_actions(){
        add_action( 'widgets_init', [$this, 'wpppmvb_regsiter_widgets']);
    }
    public function wpppmvb_regsiter_widgets(){

        register_widget('Wpp\WpPluginMvcBoilerplate\Widgets\SocialLinks');
        register_widget('Wpp\WpPluginMvcBoilerplate\Widgets\Simple');

    }
} 