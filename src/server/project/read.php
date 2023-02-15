<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/project.php";

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

$stmt = $project->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $projects_arr = array();
    $projects_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $project_item = array(
            "id" => $id,
            "title" => $title,
            "link" => $link,
            "dateCreation" => $dateCreation,
            "dateShooting" => $dateShooting,
            "cover" => $cover,
            "sequence" => $sequence
        );

        array_push($projects_arr["records"], $project_item);
    }

    http_response_code(200);

    echo json_encode($projects_arr);
} else {
    http_response_code(404);

    echo json_encode(array("message" => "Проекты не найдены."), JSON_UNESCAPED_UNICODE);
}
