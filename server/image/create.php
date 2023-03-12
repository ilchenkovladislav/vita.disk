<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/image.php";
require "../utility/createServerResponse.php";

$database = new Database();
$db = $database->getConnection();

define("FULL_PATH_TO_FOLDER", "{$_SERVER["DOCUMENT_ROOT"]}/files/{$_POST["projectId"]}/{$_POST["folderId"]}");

if (
    !empty($_POST["projectId"]) &&
    !empty($_POST["folderId"]) &&
    $_FILES
) {
    moveUploadedFiles(FULL_PATH_TO_FOLDER);

    $errors = [];

    $images = createRecords($db, FULL_PATH_TO_FOLDER, $errors);

    if (count($errors) === 0) {
        http_response_code(201);

        echo createServerResponse(201, "Изображения добавлены.", $images);
    } else {
        http_response_code(503);

        echo createServerResponse(503, "Невозможно добавить изображение.");
    }
} else {
    http_response_code(400);

    echo createServerResponse(400, "Невозможно добавить изображение. Данные неполные.");
}

function createRecords($db, $dir, &$errors)
{
    $images = [];

    foreach ($_FILES["images"]["name"] as $filename) {
        $image = new Image($db);

        $p = "http://vita.disk/files/{$_POST["projectId"]}/{$_POST["folderId"]}/{$filename}";

        $image->title = $filename;
//        $image->path = "{$dir}/{$filename}";
        $image->path = "http://vita.disk/files/{$_POST["projectId"]}/{$_POST["folderId"]}/{$filename}";
        $image->folderId = $_POST["folderId"];
        $image->sequence = $image->getTotalNumber();

        if (!$image->create()) {
            $errors[] = $image->title;
            continue;
        }

        $image->id = $image->getLastId();
        $image->numberDownloads = 0;
        $image->isFavourites = 0;

        $images[] = $image;
    }

    return $images;
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
