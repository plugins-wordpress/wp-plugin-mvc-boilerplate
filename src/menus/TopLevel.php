<?php namespace Wpp\WpPluginMvcBoilerplate\Menus;


use Wpp\WpPluginMvcBoilerplate\Views\View;
class TopLevel {
    public View $view;
    public function __construct(){

        $this->init();

    }

    public function init(){
        $this->view = new View();
        add_action('admin_menu', [$this, 'wp_plugin_mvc_boilerplate_add_top_level_menu_page'] );
    }

    public function wp_plugin_mvc_boilerplate_top_level_menu_page(){
        if ( is_user_logged_in()) echo $this->view::render('home', ['user' => wp_get_current_user()]);
        
    }

    public function wp_plugin_mvc_boilerplate_add_top_level_menu_page(){
        add_menu_page(
            'WP Plugin MVC Boilerplate',
            'WP Plugin MVC',
            'manage_options',
            'wp_plugin_mvc_boilerplate',
            [$this, 'wp_plugin_mvc_boilerplate_top_level_menu_page'],
            null, 
            20
        );
    }

}