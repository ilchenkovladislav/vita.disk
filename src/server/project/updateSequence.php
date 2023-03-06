<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/project.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();



$data = json_decode(file_get_contents("php://input"));

$res = true;

$res_projects = [];

foreach ($data as $p) {
    $project = new Project($db);

    $project->id = $p->id;
    $project->sequence = $p->sequence;

    $res = $project->updateSequence();

    if (!$res) {
        break;
    }

    array_push($res_projects, $project);
}

if ($res) {
    http_response_code(200);

    echo createServerResponse(200, "Проекты обновлены", $res_projects);
} else {
    http_response_code(503);

    echo createServerResponse(503, "Невозможно обновить один или несколько проектов");
}
