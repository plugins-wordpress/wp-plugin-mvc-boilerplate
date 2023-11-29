<?php namespace Wpp\WpPluginMvcBoilerplate\Controllers; 

use Wpp\WpPluginMvcBoilerplate\Views\View;

class Controller {
    public View $view; 
    public function __construct(){

        $this->init();

    }
    public function init(){
        $this->view = new View();
    }

}