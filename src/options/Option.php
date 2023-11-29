<?php namespace Wpp\WpPluginMvcBoilerplate\Options;


use Wpp\WpPluginMvcBoilerplate\Options\SocialFooter;
class Option {
    public function __construct(){
        $this->init();
    }
    public function init(){
        new SocialFooter();
    }
}