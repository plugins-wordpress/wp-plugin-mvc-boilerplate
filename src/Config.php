<?php namespace Wpp\WpPluginMvcBoilerplate;

class Config
{
    public function __construct()
    {
        $this->init();
    }
    public function init()
    {

        // Load .env file
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        // Example initialization using Timber
        if (!class_exists('Timber')) {
            // Timber not activated, handle accordingly
        }
        // Initialize Timber.
        \Timber\Timber::init();
        \Timber\Timber::$locations = plugin_dir_path(__FILE__) . './views';
    }
}
