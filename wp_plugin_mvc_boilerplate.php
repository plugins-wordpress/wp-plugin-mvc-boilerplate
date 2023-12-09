<?php
/**
 * WordPress Plugin MVC Boilerplate
 *
 * @package           WpPluginMVCBoilerplate
 * @author            Ericson Weah
 * @copyright         2019 The WordPress Plugin MVC Boilerplate Project
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       WordPress Plugin MVC Boilerplate
 * Plugin URI:        https://github.com/plugins-wordpress/wp-plugin-mvc-boilerplate.git
 * Description:       The WordPress Plugin MVC Boilerplate.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Ericson Weah
 * Author URI:        https://github.com/plugins-wordpress/wp-plugin-mvc-boilerplate.git
 * Text Domain:       plugin-slug
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Update URI:        https://github.com/plugins-wordpress/wp-plugin-mvc-boilerplate.git
 */

/*
WordPress Plugin MVC Boiler is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

WordPress Plugin MVC Boilerplate is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with WordPress Plugin MVC Boilerplate. If not, see {URI to Plugin License}.
*/


// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';


// Example initialization using Timber
if (!class_exists('Timber')) {
    // Timber not activated, handle accordingly
}
// Initialize Timber.
\Timber\Timber::init();
\Timber\Timber::$locations = plugin_dir_path(__FILE__) . './views';

use Wpp\WpPluginMvcBoilerplate\Plugin; 

new Plugin();





