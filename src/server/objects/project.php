<?php

class Project
{
    private $conn;
    private $table_name = "projects";

    public $id;
    public $title;
    public $link;
    public $dateCreation;
    public $dateShooting;
    public $cover;
    public $sequence;

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
            dateCreation=:dateCreation,
            dateShooting=:dateShooting,
            cover=:cover,
            sequence=:sequence";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":dateCreation", $this->dateCreation);
        $stmt->bindParam(":dateShooting", $this->dateShooting);
        $stmt->bindParam(":cover", $this->cover);
        $stmt->bindParam(":sequence", $this->sequence);

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
            dateCreation=:dateCreation,
            dateShooting=:dateShooting,
            cover=:cover,
            sequence=:sequence
        WHERE
            id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":dateCreation", $this->dateCreation);
        $stmt->bindParam(":dateShooting", $this->dateShooting);
        $stmt->bindParam(":cover", $this->cover);
        $stmt->bindParam(":sequence", $this->sequence);
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
