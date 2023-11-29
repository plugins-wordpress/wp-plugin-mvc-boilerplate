<?php namespace Wpp\WpPluginMvcBoilerplate;

/**
 * This class represents a WordPress plugin.
 * It initializes various plugin functionalities and hooks.
 */
 use Wpp\WpPluginMvcBoilerplate\Views\Extensions\Extension;
class Plugin
{
    /**
     * Constructor method for the Plugin class.
     * Initializes the plugin by calling various initialization methods.
     */
    public function __construct()
    {
        $this->wp_plugin_mvc_boilerplate_initialize();
    }

    /**
     * Register plugin hooks upon initialization.
     */
    protected function wp_plugin_mvc_boilerplate_hooks()
    {
        register_activation_hook(__FILE__, [$this, 'wp_plugin_mvc_boilerplate_activate']);
        register_deactivation_hook(__FILE__, [$this, 'wp_plugin_mvc_boilerplate_deactivate']);
        register_uninstall_hook(__FILE__, [$this, 'wp_plugin_mvc_boilerplate_uninstall']);
    }

    /**
     * Define plugin menus.
     */
    protected function wp_plugin_mvc_boilerplate_menus()
    {
        // Define and configure plugin menus here, if applicable.
    }

    /**
     * Define plugin settings.
     */
    protected function wp_plugin_mvc_boilerplate_settings()
    {
        // Define and configure plugin settings here, if applicable.
    }

    /**
     * Define custom post types for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_custom_post_types()
    {
        // Define and configure custom post types here, if applicable.
    }

    /**
     * Define taxonomies for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_taxonomies()
    {
        // Define and configure taxonomies here, if applicable.
    }

   /**
     * Define metadata for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_metadata()
    {
        // Define and configure metadata here, if applicable.
    }
    /**
     * Define widgets for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_widgets()
    {
        // Define and configure widgets here, if applicable.
    }

      /**
     * Define view extensions for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_view_extensions()
    {
       
        // Define and configure view extensions here, if applicable.
        new Extension();
    }


    /**
     * Initialize the plugin by calling various initialization methods.
     */
    protected function wp_plugin_mvc_boilerplate_initialize()
    {
        $this->wp_plugin_mvc_boilerplate_hooks();
        $this->wp_plugin_mvc_boilerplate_menus();
        $this->wp_plugin_mvc_boilerplate_settings();
        $this->wp_plugin_mvc_boilerplate_custom_post_types();
        $this->wp_plugin_mvc_boilerplate_taxonomies();
        $this->wp_plugin_mvc_boilerplate_metadata();
        $this->wp_plugin_mvc_boilerplate_widgets();
        $this->wp_plugin_mvc_boilerplate_view_extensions();
    }

    /**
     * Activation hook callback when the plugin is activated.
     */
    protected function wp_plugin_mvc_boilerplate_activate()
    {
        // Code to execute when the plugin is activated.
    }

    /**
     * Deactivation hook callback when the plugin is deactivated.
     */
    protected function wp_plugin_mvc_boilerplate_deactivate()
    {
        // Code to execute when the plugin is deactivated.
    }

    /**
     * Uninstall hook callback when the plugin is uninstalled.
     */
    protected function wp_plugin_mvc_boilerplate_uninstall()
    {
        // Code to execute when the plugin is uninstalled.
    }
}
