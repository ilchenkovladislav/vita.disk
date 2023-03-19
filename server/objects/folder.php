<?php

class Folder
{
    private $conn;
    private $table_name = "folders";

    public $id;
    public $title;
    public $link;
    public $description;
    public $sequence;
    public $projectId;
    public $numberImages;

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

    function create()
    {
        $query = "INSERT INTO " . $this->table_name . "
        SET
            title=:title,
            link=:link,
            description=:description,
            sequence=:sequence,
            projectId=:projectId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":sequence", $this->sequence);
        $stmt->bindParam(":projectId", $this->projectId);

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
            link=:link,
            description=:description,
            sequence=:sequence,
            projectId=:projectId
        WHERE
            id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":sequence", $this->sequence);
        $stmt->bindParam(":projectId", $this->projectId);
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

    function getTotalNumber()
    {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . " WHERE projectId = :projectId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":projectId", $this->projectId);

        $stmt->execute();

        return (int) $stmt->fetch(PDO::FETCH_ASSOC)["count"];
    }

    function getTotalNumberImages($id)
    {
        $query = "SELECT COUNT(*) as count FROM images WHERE folderId = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return (int) $stmt->fetch(PDO::FETCH_ASSOC)["count"];
        }

        return false;
    }
}
