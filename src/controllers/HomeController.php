<?php namespace Wpp\WpPluginMvcBoilerplate\Controllers; 

use Wpp\WpPluginMvcBoilerplate\Views\View;

class HomeController {
    public View $view; 
    public function __construct(){
        $this->init();

    }
    public function init(){
        $this->view = new View();
    }

    public function index(){
        return $this->view::render('home/index');
    }


}