<?php namespace Wpp\WpPluginMvcBoilerplate\Apis;


use Wpp\WpPluginMvcBoilerplate\Apis\Rest\Current;
class Api {
    public function __construct(){
        $this->init();
    }
    public function init(){

        new Current();
    }
}