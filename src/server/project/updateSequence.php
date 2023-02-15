<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/project.php";

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

$data = json_decode(file_get_contents("php://input"));

$res = true;

foreach ($data as $p) {
    $project->id = $p->id;
    $project->sequence = $p->sequence;

    $res = $project->updateSequence();

    if (!$res) {
        break;
    }
}

if ($res) {
    http_response_code(200);

    echo json_encode(array("message" => "Проекты обновлены"), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(503);

    echo json_encode(array("message" => "Невозможно обновить один или несколько проектов"), JSON_UNESCAPED_UNICODE);
}
