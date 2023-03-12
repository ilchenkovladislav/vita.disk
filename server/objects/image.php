<?php

class Image
{
    private $conn;
    private $table_name = "images";

    public $id;
    public $title;
    public $path;
    public $numberDownloads;
    public $isFavourites;
    public $sequence;
    public $folderId;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {
        $query = "SELECT * FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    function getTotalNumber()
    {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . " WHERE folderId = :folderId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":folderId", $this->folderId);

        $stmt->execute();

        return (int) $stmt->fetch(PDO::FETCH_ASSOC)["count"];
    }

    function create()
    {
        $query = "INSERT INTO " . $this->table_name . "
        SET
            title=:title,
            path=:path,
            sequence=:sequence,
            folderId=:folderId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":path", $this->path);
        $stmt->bindParam(":sequence", $this->sequence);
        $stmt->bindParam(":folderId", $this->folderId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function update()
    {
        $query = "UPDATE " . $this->table_name . "
        SET
            title=:title,
            path=:path,
            numberDownloads=:numberDownloads,
            isFavourites=:isFavourites,
            sequence=:sequence,
            folderId=:folderId
        WHERE
            id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":path", $this->path);
        $stmt->bindParam(":numberDownloads", $this->numberDownloads);
        $stmt->bindParam(":isFavourites", $this->isFavourites);
        $stmt->bindParam(":sequence", $this->sequence);
        $stmt->bindParam(":folderId", $this->folderId);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function updateSequence()
    {
        $query = "UPDATE " . $this->table_name . "
        SET
            sequence=:sequence
        WHERE
            id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":sequence", $this->sequence);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function getLastId()
    {
        return $this->conn->lastInsertId();
    }
}
