<?php namespace Wpp\WpPluginMvcBoilerplate\Options;


class SocialFooter {
    public $options;

    public function __construct(){
        $this->init();
    }

    public  function init(){
        $this->options = get_option('wplmvcb_settings');
        add_action('admin_menu', [$this, 'wplmvcb_social_footer_link_menu_page_setting' ]);
        add_action('admin_init', [$this, 'wplmvcb_social_footer_link_register_settings']);
        add_action('the_content', [$this, 'wplmvcb_social_footer_link_content']);
    }

    public  function wplmvcb_social_footer_link_menu_page_setting(){
        add_options_page(
           'WP Plugin MVC Social Link Options',
           'WP Plugin MVC Social Link',
           'manage_options',
           'wplmvcb-social-footer-link-menu-slug',
           [$this, 'wplmvcb_social_footer_link_menu_page_view'],
           null
        );
    }
    public function wplmvcb_social_footer_link_menu_page_view(){
        $this->options = get_option('wplmvcb_settings');
        ob_start(); ?> 
        <div class="wrap">
          <h2> <?php _e('Facebook Footer Link', 'wplmvcb_domain'); ?></h2>
          <p> <?php _e('Settings for Facebook Footer Link Plugin', 'wplmvcb_domain'); ?></p>
          <form method="POST" action="options.php">
              <?php settings_fields('wplmvcb_settings_group'); ?>
              <table class="form-table">
                  <tbody>
                      <tr>
                          <th scope="row"> <label for="wplmvcb_settings[enable]"><?php _e('Enable', 'wplmvcb_domain'); ?></label> </th>
                          <td> <input name="wplmvcb_settings[enable]" id="wplmvcb_settings[enable]" type="checkbox" value="1" <?php  if($this->options['enable']) checked('1', $this->options['enable']) ;?> /> </td>
                      </tr>
                      <tr>
                          <th scope="row"> <label for="wplmvcb_settings[social_link_url]"><?php _e('Facebook Profile URL', 'wplmvcb_domain'); ?></label> </th>
                          <td>
                               <input name="wplmvcb_settings[social_link_url]" id="wplmvcb_settings[social_link_url]" type="text" placeholder="Your profile facebook url" value="<?php  if($this->options['social_link_url']) echo $this->options['social_link_url'] ;?>"  class="regular-text" />
                               <p class="description"><?php _e('Enter your profile facebook url.', 'wplmvcb_domain') ;?></p>
                          </td>
                      </tr>
                      <tr>
                          <th scope="row"> <label for="wplmvcb_settings[social_link_color]"><?php _e('Link Color', 'wplmvcb_domain'); ?></label> </th>
                          <td>
                               <input name="wplmvcb_settings[social_link_color]" id="wplmvcb_settings[social_link_color]" type="text" placeholder="Your profile facebook url color" value="<?php  if($this->options['social_link_color']) echo $this->options['social_link_color'] ;?>"  class="regular-text" />
                               <p class="description"><?php _e('Enter a color or HEX value with a #.', 'wplmvcb_domain') ;?></p>
                          </td>
                      </tr>
                      <tr>
                          <th scope="row"> <label for="wplmvcb_settings[show_in_feed]"><?php _e('Show In Posts Feed', 'wplmvcb_domain'); ?></label> </th>
                          <td> <input name="wplmvcb_settings[show_in_feed]" id="wplmvcb_settings[show_in_feed]" type="checkbox" value="1" <?php  if($this->options['show_in_feed']) checked('1', $this->options['show_in_feed']) ;?> /> </td>
                      </tr>
                  </tbody>
              </table>
              <p class="submit"><input type="submit" class="button button-primary" name="submit" value="<?php _e('Save Changes', 'wplmvcb_domain');?>"></p>

          </form>
        </div>
      <?php  echo ob_get_clean();
    
    }

    public function wplmvcb_social_footer_link_content($content){
        return $content. '<div class="wrap" style="color:'.$this->options['social_link_color'].'">'.$this->options['social_link_url'].'</div>';
    }
   
    public function wplmvcb_social_footer_link_register_settings(){
        register_setting('wplmvcb_settings_group', 'wplmvcb_settings');
    }
}