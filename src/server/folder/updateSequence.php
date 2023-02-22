<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/folder.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();

$folder = new Folder($db);

$data = json_decode(file_get_contents("php://input"));

$res = true;

foreach ($data as $f) {
    $folder->id = $f->id;
    $folder->sequence = $f->sequence;

    $res = $folder->updateSequence();

    if (!$res) {
        break;
    }
}

if ($res) {
    http_response_code(200);

    echo createServerResponse(200, "Папки обновлены");
} else {
    http_response_code(503);

    echo createServerResponse(503, "Невозможно обновить одну или несколько папок");
}
