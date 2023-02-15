<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/image.php";

$database = new Database();
$db = $database->getConnection();
$image = new Image($db);

define("FULL_PATH_TO_FOLDER", "{$_SERVER["DOCUMENT_ROOT"]}/files/{$_POST["projectId"]}/{$_POST["folderId"]}");

if (
    !empty($_POST["folderId"]) &&
    !empty($_POST["projectId"]) &&
    $_FILES
) {
    moveUploadedFiles(FULL_PATH_TO_FOLDER);

    $errors = [];
    createRecords($image, FULL_PATH_TO_FOLDER, $errors);

    if (count($errors) === 0) {
        http_response_code(201);

        echo json_encode(array("message" => "Изображения добавлены."), JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Невозможно добавить изображение."), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Невозможно добавить изображение. Данные неполные."), JSON_UNESCAPED_UNICODE);
}

function createRecords($image, $dir, &$errors)
{
    foreach ($_FILES["images"]["name"] as $filename) {
        $image->title = $filename;
        $image->path = "{$dir}/{$filename}";
        $image->folderId = $_POST["folderId"];
        $image->sequence = $image->getTotalNumber();

        if (!$image->create()) {
            $errors[] = $image->title;
        }
    }

    var_dump($errors);
}

function moveUploadedFiles($dir)
{
    for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
        $path = "{$dir}/{$_FILES["images"]["name"][$i]}";

        if (!file_exists($dir)) {
            createDirectory($dir);
        }

        move_uploaded_file($_FILES['images']['tmp_name'][$i], $path);
    }
}

function createDirectory($path)
{
    mkdir($path, 0777, true);
}
