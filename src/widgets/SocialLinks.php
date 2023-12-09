<?php namespace Wpp\WpPluginMvcBoilerplate\Widgets; 


//use Wpp\WpPluginMvcBoilerplate\Widgets\WP_Widget;; 

use Wpp\WpPluginMvcBoilerplate\Views\View;

class SocialLinks extends \WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */

	 public View $view;
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'wppmvcb_social_links_widget',
			'description' => 'WP Plugin MVC Boilerplate Social Links Widget',
		);
		parent::__construct( 'wppmvcb_social_links_widget', 'Social Links Widget', $widget_ops );
        // parent::__construct( 'wppmvcb_social_links_widget', 'My Widget' );
        $this->init();
	}

  
    public function init() {
		$this->view = new View();
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
		if(isset($instance['facebook_link'])){
			$facebook_link = esc_attr($instance['facebook_link']);
		}else{
			$facebook_link = 'https://www.facebook.com';
		}

		// Get LinkedIn Link
		if(isset($instance['linkedin_link'])){
			$linkedin_link = esc_attr($instance['linkedin_link']);
		}else{
			$linkedin_link = 'https://www.linkedin.com';
		}

		// Get Twitter Link
		if(isset($instance['twitter_link'])){
			$twitter_link = esc_attr($instance['twitter_link']);
		}else{
			$twitter_link = 'https://www.twitter.com';
		}

		// Get Github Link
		if(isset($instance['github_link'])){
			$github_link = esc_attr($instance['github_link']);
		}else{
			$github_link = 'https://www.github.com';
		}

		// Get Google Link
		if(isset($instance['google_link'])){
			$google_link = esc_attr($instance['google_link']);
		}else{
			$google_link = 'https://www.google.com';
		}
		$data = [
			'facebook' => $this->setViewDatum($facebook_link, 'facebook_link'),
			'linkedin' => $this->setViewDatum($linkedin_link, 'linkedin_link'),
			'twitter' => $this->setViewDatum($twitter_link, 'twitter_link'),
			'github' => $this->setViewDatum($github_link, 'github_link'),
			'google' => $this->setViewDatum($google_link, 'google_link')
		];
		echo $this->view::render('widgets/backend/social-links', $data);

	}


	public function getDatumLinks($instance){
	  return [
		'facebook' => esc_attr($instance['facebook_link']),
		'linkedin' => esc_attr($instance['linkedin_link']),
		'github' => esc_attr($instance['github_link']),
		'google' => esc_attr($instance['google_link']),
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
		echo $this->view::render('widgets/frontend/social-links', $this->getDatumLinks($instance));
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
			'facebook_link' => $this->getUpdatedDatum($new_instance, 'facebook_link'),
			'linkedin_link' => $this->getUpdatedDatum($new_instance, 'linkedin_link'),
			'github_link' => $this->getUpdatedDatum($new_instance, 'github_link'),
			'google_link' => $this->getUpdatedDatum($new_instance, 'google_link'),
		];
	
	}
}