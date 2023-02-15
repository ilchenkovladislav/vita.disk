<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/image.php";

$database = new Database();
$db = $database->getConnection();

$image = new Image($db);

$stmt = $image->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $images_arr = array();
    $images_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $image_item = array(
            "id" => $id,
            "title" => $title,
            "path" => $path,
            "numberDownloads" => $numberDownloads,
            "isFavourites" => $isFavourites,
            "sequence" => $sequence,
            "folderId" => $folderId
        );

        array_push($images_arr["records"], $image_item);
    }

    http_response_code(200);

    echo json_encode($images_arr);
} else {
    http_response_code(404);

    echo json_encode(array("message" => "Изображения не найдены."), JSON_UNESCAPED_UNICODE);
}
