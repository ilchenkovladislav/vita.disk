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

$folder->id = $data->id;

$folder->title = $data->title;
$folder->link = $data->link;
$folder->description = $data->description;
$folder->sequence = $data->sequence;
$folder->projectId = $data->projectId;

if ($folder->update()) {
    http_response_code(200);

    echo createServerResponse(200, "Папка обновлена", $folder);
} else {
    http_response_code(503);

    echo createServerResponse(503, "Невозможно обновить папку");
}
