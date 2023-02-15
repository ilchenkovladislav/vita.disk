<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/folder.php";

$database = new Database();
$db = $database->getConnection();
$folder = new Folder($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->link) &&
    !empty($data->description) &&
    !empty($data->sequence) &&
    !empty($data->projectId)
) {
    $folder->title = $data->title;
    $folder->link = $data->link;
    $folder->description = $data->description;
    $folder->sequence = $data->sequence;
    $folder->projectId = $data->projectId;

    if ($folder->create()) {
        http_response_code(201);

        echo json_encode(array("message" => "Папка создана."), JSON_UNESCAPED_UNICODE);

        createFolder($folder->projectId, $folder->getLastId());
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Невозможно создать папку."), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Невозможно создать папку. Данные неполные."), JSON_UNESCAPED_UNICODE);
}

function createFolder($projectId, $folderId)
{
    $dir = "{$_SERVER["DOCUMENT_ROOT"]}/files/{$projectId}/{$folderId}";
    mkdir($dir, 0777, true);
}
