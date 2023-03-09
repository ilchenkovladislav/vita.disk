<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/project.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

$stmt = $project->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $projects_arr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $project_item = array(
            "id" => $id,
            "title" => $title,
            "link" => $link,
            "dateCreation" => $dateCreation,
            "dateShooting" => $dateShooting,
            "cover" => $cover,
            "sequence" => $sequence,
            "numberImages" => $project->getTotalNumberImages($id)
        );

        array_push($projects_arr, $project_item);
    }

    http_response_code(200);

    echo createServerResponse(200, "Успешно", $projects_arr);
} else {
    http_response_code(404);

    echo createServerResponse(404, "Проекты не найдены.");
}
