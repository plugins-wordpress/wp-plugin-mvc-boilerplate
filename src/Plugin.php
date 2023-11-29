<?php namespace Wpp\WpPluginMvcBoilerplate;

/**
 * This class represents a WordPress plugin.
 * It initializes various plugin functionalities and hooks.
 */
 use Wpp\WpPluginMvcBoilerplate\Views\Extensions\Extension;
 use Wpp\WpPluginMvcBoilerplate\Menus\Menu;
 use Wpp\WpPluginMvcBoilerplate\Options\Option;
 use Wpp\WpPluginMvcBoilerplate\metadata\Metadatum;
 use Wpp\WpPluginMvcBoilerplate\Posts\Post;
 use Wpp\WpPluginMvcBoilerplate\Settings\Setting;
 use Wpp\WpPluginMvcBoilerplate\Taxonomies\Taxonomy;
 use Wpp\WpPluginMvcBoilerplate\Widgets\Widget;
 use Wpp\WpPluginMvcBoilerplate\Assets\Asset;
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
        new Menu();
        // new SubLevelMenus();
    }

    /**
     * Define plugin settings.
     */
    protected function wp_plugin_mvc_boilerplate_settings()
    {
        // Define and configure plugin settings here, if applicable.
        new Setting();
        
    }

    /**
     * Define custom post types for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_custom_post_types()
    {
        // Define and configure custom post types here, if applicable.
        new Post();
    }

    /**
     * Define taxonomies for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_taxonomies()
    {
        // Define and configure taxonomies here, if applicable.
        new Taxonomy();
    }

      /**
     * Define options for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_options()
    {
        // Define and configure options here, if applicable.
        new Option();
    }


   /**
     * Define metadata for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_metadata()
    {
        // Define and configure metadata here, if applicable.
        new Metadatum();
    }
    /**
     * Define widgets for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_widgets()
    {
        // Define and configure widgets here, if applicable.
        new Widget();
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
     * Define assets for the plugin.
     */
    protected function wp_plugin_mvc_boilerplate_assets()
    {
       
        // Define and configure assets here, if applicable.
        new Asset();
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
        $this->wp_plugin_mvc_boilerplate_options();
        $this->wp_plugin_mvc_boilerplate_metadata();
        $this->wp_plugin_mvc_boilerplate_widgets();
        $this->wp_plugin_mvc_boilerplate_view_extensions();
        $this->wp_plugin_mvc_boilerplate_assets();
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
