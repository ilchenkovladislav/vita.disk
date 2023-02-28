<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/project.php";
include_once "../objects/folder.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();
$project = new Project($db);
$folder = new Folder($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->link) &&
    !empty($data->dateShooting) &&
    !empty($data->cover) &&
    !empty($data->sequence)
) {
    $project->title = $data->title;
    $project->link = $data->link;
    $project->dateCreation = date("Y-m-d");
    $project->dateShooting = $data->dateShooting;
    $project->cover = $data->cover;
    $project->sequence = $data->sequence;

    if ($project->create()) {
        http_response_code(201);

        $project_item = array(
            "id" => $project->getLastId(),
            "title" => $project->title,
            "link" => $project->link,
            "dateCreation" => $project->dateCreation,
            "dateShooting" => $project->dateShooting,
            "cover" => $project->cover,
            "sequence" => $project->sequence,
            "numberImages" => 0
        );

        echo createServerResponse(201, "Проект создан.", $project_item);

        createDirectory($project->getLastId());
        createFolder($folder, $project);
    } else {
        http_response_code(503);

        echo createServerResponse(503, "Невозможно создать проект.");
    }
} else {
    http_response_code(400);

    echo createServerResponse(400, "Невозможно создать проект. Данные неполные.");
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
