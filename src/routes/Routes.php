<?php namespace Wpp\WpPluginMvcBoilerplate\Routes;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route as SymfonyRoute;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

//use Wpp\WpPluginMvcBoilerplate\Controllers\HomeController;

use Wpp\WpPluginMvcBoilerplate\Views\View;

class Routes
{
    public View $view; 
    public function __construct()
    {
        $this->init();
    }
    public function init()
    {
        $this->view = new View();
        $this->wpppmvcb_register_routes();
    }


    public function index(){
        return $this->view::render('home/index');
    }
    public function wpppmvcb_register_routes()
    {
        // Define your routes
        $routes = new RouteCollection();
        // $routes->add('you', new Route('/you', [HomeController::class, 'index']));
        $routes->add('about', new SymfonyRoute('/about', ['_controller' =>array($this, 'index' ) ]));
        // $routes->add('about', new Route('/about', ['_controller' => 'MyController::about']));
        // $routes->add('contact', new Route('/contact', ['_controller' => ''M'yController::contact']));

        // Create a RequestContext
        $requestContext = new RequestContext();
        $requestContext->fromRequest(Request::createFromGlobals());

        // Initialize the UrlMatcher
        $matcher = new UrlMatcher($routes, $requestContext);

        // Handle the request and call the appropriate controller action
        try {
            $parameters = $matcher->match($requestContext->getPathInfo());
            list($controllerClass, $action) = explode('::', $parameters['_controller']);
            $controller = new $controllerClass();
            $response = $controller->$action();
      
        } catch (ResourceNotFoundException $e) {
            // Handle 404 errors here
            $response = new Response('Not Found', 404);
            $response->send();
        }

        // Send the response
       // $response->send();
    }
}
