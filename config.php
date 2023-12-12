<?php 

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

// Load .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Example initialization using Timber
if (!class_exists('Timber')) {
    // Timber not activated, handle accordingly
}
// Initialize Timber.
\Timber\Timber::init();
\Timber\Timber::$locations = plugin_dir_path(__FILE__) . './views';


