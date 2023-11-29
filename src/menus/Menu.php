<?php namespace Wpp\WpPluginMvcBoilerplate\Menus;


use Wpp\WpPluginMvcBoilerplate\Menus\TopLevel;
use Wpp\WpPluginMvcBoilerplate\Menus\SubLevel;

class Menu {
    public function __construct(){
        $this->init();
    }
    public function init(){
        new TopLevel(); 
        new SubLevel();
    }
}