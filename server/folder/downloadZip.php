<?php
$error = "";

if (isset($_POST["projectId"]) && isset($_POST["folderId"])) {
    $file_folder = "{$_SERVER["DOCUMENT_ROOT"]}/files/{$_POST["projectId"]}/{$_POST["folderId"]}";

    if (extension_loaded('zip')) {
        $zip = new ZipArchive();
        $zip_name = time() . ".zip";

        if ($zip->open($zip_name, ZIPARCHIVE::CREATE) !== TRUE) {
            $error .= "* Sorry ZIP creation failed at this time";
        }

        $files = scandir($file_folder);

        foreach ($files as $file) {
            $file_path = $file_folder. DIRECTORY_SEPARATOR . $file;

            if (is_dir($file_path)) continue;

            $zip->addFile($file_path, $file);
        }

        $zip->close();

        if (file_exists($zip_name)) {
            header("Access-Control-Allow-Origin: *");
            header('Content-type: application/zip');
            header('Content-Disposition: attachment');
            header("Content-length: " . filesize($zip_name));

            readfile($zip_name);

            unlink($zip_name);
        }
    } else
        $error .= "* You dont have ZIP extension";
}