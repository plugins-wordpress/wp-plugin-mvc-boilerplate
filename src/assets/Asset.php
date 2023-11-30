<?php namespace Wpp\WpPluginMvcBoilerplate\Assets;


use Wpp\WpPluginMvcBoilerplate\Assets\Script;
use Wpp\WpPluginMvcBoilerplate\Assets\Style;

class Asset {
    public function __construct(){
        $this->init();
    }
    public function init(){
        new Script();
        new Style();
    }
}