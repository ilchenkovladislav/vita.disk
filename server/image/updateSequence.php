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

$data = json_decode(file_get_contents("php://input"));

$res = true;

$res_images = [];

foreach ($data as $i) {
    $image = new Image($db);

    $image->id = $i->id;
    $image->sequence = $i->sequence;

    $res = $image->updateSequence();

    if (!$res) {
        break;
    }

    $res_images[] = $image;
}

if ($res) {
    http_response_code(200);

    echo createServerResponse(200, "Изображения обновлены", $res_images);
} else {
    http_response_code(503);

    echo createServerResponse(503, "Невозможно обновить одно или несколько изображений");
}
