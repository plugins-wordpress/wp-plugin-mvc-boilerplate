<?php namespace Wpp\WpPluginMvcBoilerplate\App\Views; 

class View {

    public function __construct() {
        $this->init();
    }

    public function init(){}
    public  static function render($view = '', $data = []){
        \Timber\Timber::render($view. '.twig', $data);
    }
    public function view($view = '', $data = []){
        \Timber\Timber::render($view. '.twig', $data);
    }
}