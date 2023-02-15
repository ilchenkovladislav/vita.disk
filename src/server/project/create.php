<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/project.php";
include_once "../objects/folder.php";

$database = new Database();
$db = $database->getConnection();
$project = new Project($db);
$folder = new Folder($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->link) &&
    !empty($data->dateCreation) &&
    !empty($data->dateShooting) &&
    !empty($data->cover) &&
    !empty($data->sequence)
) {
    $project->title = $data->title;
    $project->link = $data->link;
    $project->dateCreation = $data->dateCreation;
    $project->dateShooting = $data->dateShooting;
    $project->cover = $data->cover;
    $project->sequence = $data->sequence;

    if ($project->create()) {
        http_response_code(201);

        echo json_encode(array("message" => "Проект создан."), JSON_UNESCAPED_UNICODE);

        createDirectory($project->getLastId());
        createFolder($folder, $project);
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Невозможно создать проект."), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Невозможно создать проект. Данные неполные."), JSON_UNESCAPED_UNICODE);
}


function createDirectory($projectId)
{
    $dir = "{$_SERVER["DOCUMENT_ROOT"]}/files/{$projectId}";
    mkdir($dir, 0777, true);
}

function createFolder($folder, $project)
{
    $folder->title = "photos";
    $folder->link = "photos";
    $folder->description = "";
    $folder->projectId = $project->getLastId();
    $folder->sequence = 0;

    $folder->create();
}
