<?php namespace Wpp\WpPluginMvcBoilerplate\Views; 

class View {

    public function __construct() {}

    public function init(){}

    public  static function render($view = '', $data = []){
        \Timber\Timber::render($view, $data);
    }
    public function view($view = '', $data = []){
        \Timber\Timber::render($view, $data);
    }
}