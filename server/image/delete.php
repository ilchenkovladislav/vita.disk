<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/image.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();

$image = new Image($db);

$data = json_decode(file_get_contents("php://input"));

$image->id = $data->id;

if ($image->delete()) {
    http_response_code(200);

    echo createServerResponse(200, "Изображение удалено");
} else {
    http_response_code(503);

    echo createServerResponse(503, "Не удалось удалить изображение");
}
