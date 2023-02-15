<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/folder.php";

$database = new Database();
$db = $database->getConnection();

$folder = new Folder($db);

$stmt = $folder->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $folders_arr = array();
    $folders_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $folder_item = array(
            "id" => $id,
            "title" => $title,
            "link" => $link,
            "description" => $description,
            "sequence" => $sequence,
            "projectId" => $projectId
        );

        array_push($folders_arr["records"], $folder_item);
    }

    http_response_code(200);

    echo json_encode($folders_arr);
} else {
    http_response_code(404);

    echo json_encode(array("message" => "Папки не найдены."), JSON_UNESCAPED_UNICODE);
}
