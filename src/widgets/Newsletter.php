<?php namespace Wpp\WpPluginMvcBoilerplate\Widgets; 



use Wpp\WpPluginMvcBoilerplate\Views\View;

class Newsletter extends \WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */

	 public View $view;
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'wppmvcb_newsletter_widget',
			'description' => 'WP Plugin MVC Boilerplate Newsletter Widget',
		);
		parent::__construct( 'wppmvcb_newsletter_widget', 'Newsletter Subscriber', $widget_ops );
        // parent::__construct( 'wppmvcb_social_links_widget', 'My Widget' );
        $this->init();
	}

  
    public function init() {
		$this->view = new View();
	}

	public function getForm($instance){
		// Get Facebook Link
		echo $this->view::render('widgets/backend/newsletter');

	}


	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		echo $args['before_widget'];
		echo $this->view::render('widgets/frontend/newsletter');
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */

	
	public function form( $instance ) {
		// outputs the options form on admin
		$this->getForm($instance);
		
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