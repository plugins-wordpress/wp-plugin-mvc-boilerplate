<?php namespace Wpp\WpPluginMvcBoilerplate\Menus;

use Wpp\WpPluginMvcBoilerplate\Views\View;
class SubLevel
{
    public View $view;
    public function __construct()
    {
        $this->init();
    }

    protected function init()
    {
        add_action('admin_menu', [$this, 'wp_plugin_mvc_boilerplate_sub_level_submenu']);
        $this->view = new View();
    }
    public function wp_plugin_mvc_boilerplate_sub_level_submenu()
    {
        // Add a submenu page:
        add_submenu_page(
            'wp_plugin_mvc_boilerplate', // Parent slug
            'Sub Level', // Page title
            'Sub Level', // Menu title
            'manage_options', // Capability
            'wp_plugin_mvc_boilerplate_sub_level', // Menu slug
            [$this, 'wp_plugin_mvc_boilerplate_sub_level_submenu_page'] // Callback function
        );
    }

    // Callback function for the submenu:
    public function wp_plugin_mvc_boilerplate_sub_level_submenu_page()
    {
        if (is_user_logged_in()) {
            echo $this->view::render('menus/sub-level', ['user' => wp_get_current_user()]);
        }
    }
}
