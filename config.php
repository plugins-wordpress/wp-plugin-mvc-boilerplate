<?php 

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

// Load .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Retrieve variables
// $db_host = getenv('DB_HOST');
// $db_user = getenv('DB_USER');
// $db_pass = getenv('DB_PASS');
// $db_name = getenv('DB_NAME');


// Example initialization using Timber
if (!class_exists('Timber')) {
    // Timber not activated, handle accordingly
}
// Initialize Timber.
\Timber\Timber::init();
\Timber\Timber::$locations = plugin_dir_path(__FILE__) . './views';