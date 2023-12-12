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

	public function setFormDatum($instance, $key, $value) {
		return (!empty($instance[$key])) ? $instance[$key] : __($value, 'wppmvcb_domain');
	}
	public function setViewDatum($variable, $keyString = 'facebook_link'){
		return [
			'id' => $this->get_field_id($keyString),
			'for' => $this->get_field_id($keyString),
			'name' => $this->get_field_name($keyString),
			'value' => esc_attr($variable)
		];

	}
	public function getForm($instance){
		// Get Facebook Link
		$title = $this->setFormDatum($instance, 'title', 'Subscribe For Updates');
		$recipient = $this->setFormDatum($instance, 'recipient', 'email');
		$subject = $this->setFormDatum($instance, 'subject', 'subject');

		$data = [
			'title' => $this->setViewDatum($title, 'title'),
			'recipient' => $this->setViewDatum($recipient, 'recipient'),
			'subject' => $this->setViewDatum($subject, 'subject'),
		];
		echo $this->view::render('widgets/backend/newsletter', $data);
	}


	public function getDatum($instance){
		return [
		  'title' => esc_attr($instance['title']),
		  'recipient' => esc_attr($instance['recipient']),
		  'subject' => esc_attr($instance['subject']),
		  'action' => plugins_url(). '/wp-plugin-mvc-boilerplate/src/forms/Newsletter.php',
		];
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
			echo $args['before_title'];
				if(!empty($instance['title'])){
					echo $instance['title'];
				}
			echo $args['before_title'];
			echo $this->view::render('widgets/frontend/newsletter', ['inputs' => $this->getDatum($instance)]);
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


	

	  public function getUpdatedDatum($new_instance, $keyString){
		return (!empty($new_instance[$keyString])) ? strip_tags($new_instance[$keyString]) : '';
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
		return [
			'title' => $this->getUpdatedDatum($new_instance, 'title'),
			'recipient' => $this->getUpdatedDatum($new_instance, 'recipient'),
			'subject' => $this->getUpdatedDatum($new_instance, 'subject'),
		];
	
	}
}