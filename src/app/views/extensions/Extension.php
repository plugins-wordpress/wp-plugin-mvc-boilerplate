<?php namespace Wpp\WpPluginMvcBoilerplate\App\Views\Extensions;

class Extension {
    public function __construct(){
        $this->init();
    }   

    public  function init(){
        add_filter('timber/twig', [$this, 'addCustomFunction']);
    }
    public function addCustomFunction($twig) {
        $twig->addFunction(new \Twig\TwigFunction('working_function', [$this, 'working_function']));
        return $twig;
    }
    public function working_function(){
        return "I am a working function in this class!";
    }
 
}