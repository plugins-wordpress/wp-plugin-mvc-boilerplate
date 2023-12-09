
// Define the path to the .env file
// $env_file = __DIR__ . '/.env';

// if (file_exists($env_file)) {
//     // Read the .env file and parse it
//     $env_data = file_get_contents($env_file);
//     $env_lines = explode("\n", $env_data);

//     foreach ($env_lines as $line) {
//         $line = trim($line);
//         if (!empty($line) && strpos($line, '=') !== false) {
//             list($key, $value) = explode('=', $line, 2);
//             // Set the environment variable
//             $_ENV[$key] = $value;
//             $_SERVER[$key] = $value;
//         }
//     }
// }

// $db_host = $_ENV['DB_HOST'];
// $db_user = $_ENV['DB_USER'];
// $db_pass = $_ENV['DB_PASS'];