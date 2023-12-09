<?php namespace Wpp\WpPluginMvcBoilerplate\App\Controllers; 

use Wpp\WpPluginMvcBoilerplate\App\Views\View;

class Controller {
    public View $view; 
    public function __construct(){
        $this->init();

    }
    public function init(){
        $this->view = new View();
    }


}