<?php namespace Wpp\WpPluginMvcBoilerplate\Routes;


use Wpp\WpPluginMvcBoilerplate\Routes\Routes;
class Route {
    public function __construct(){
        $this->init();
    }
    public function init(){
        $this->wpppmvb_regsiter_http_routes();
    }

    public function wpppmvb_regsiter_http_routes(){
        new Routes();
    }
}