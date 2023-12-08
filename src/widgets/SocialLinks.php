<?php namespace Wpp\WpPluginMvcBoilerplate\Widgets; 


//use Wpp\WpPluginMvcBoilerplate\Widgets\WP_Widget;; 

use WP_Widget;

class SocialLinks extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'wppmvcb_social_links_widget',
			'description' => 'WP Plugin MVC Boilerplate Social Links Widget',
		);
		parent::__construct( 'wppmvcb_social_links_widget', 'My Widget', $widget_ops );
        // parent::__construct( 'wppmvcb_social_links_widget', 'My Widget' );
        // $this->init();
	}

  
    public function init() {}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
        return "Supper Cool Stuff: ";
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
        ?>
            <h1>Here we go with the form </h1>
        <?php 
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
	}
}