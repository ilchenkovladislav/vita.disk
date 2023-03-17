<?php
$error = "";

if (isset($_POST["projectId"])) {
    $file_folder = "{$_SERVER["DOCUMENT_ROOT"]}/files/{$_POST["projectId"]}";

    if (extension_loaded('zip')) {
        $zip = new ZipArchive();
        $zip_name = time() . ".zip";

        if ($zip->open($zip_name, ZIPARCHIVE::CREATE) !== TRUE) {
            $error .= "* Sorry ZIP creation failed at this time";
        }

        $directories = scandir($file_folder);


        foreach ($directories as $directory) {
            if ($directory === "." || $directory === "..") continue;

            $directory_path = $file_folder . DIRECTORY_SEPARATOR . $directory;

            if (is_dir($directory_path)) {
                $files = scandir($directory_path);

                foreach ($files as $file) {
                    if ($file === "." || $file === "..") continue;

                    $file_path = $directory_path . DIRECTORY_SEPARATOR . $file;
                    $res = $zip->addFile($file_path, $file);
                }
            };
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
