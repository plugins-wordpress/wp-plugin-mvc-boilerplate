<?php namespace Doz\DefendersOfZion\Views\Extension; 

class User {
    public function __construct() {
        add_action('init',[$this,'get_current_user']);
    }

    public function get_current_user(){
        return wp_get_current_user();
    }
}