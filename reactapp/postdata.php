<?php

// Не тестировал, но по идее должно работать!

function pdoSet($allowed, &$values, $source = array()) {
    $set = '';
    $values = array();
    if (!$source) $source = &$_POST;
    foreach ($allowed as $field) {
      if (isset($source[$field])) {
        $set.="`".str_replace("`","``",$field)."`". "=:$field, ";
        $values[$field] = $source[$field];
      }
    }
    return substr($set, 0, -2); 
}

$host = '127.0.0.1';
$db   = 'test';
$user = 'test';
$pass = 'test';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $dbh = new PDO($dsn, $user, $pass, $opt);
} catch (PDOException $e) {
    die('Подключение не удалось: ' . $e->getMessage());
}

$values = [
    uname => $_POST['uname'],
    umail =>  $_POST['umail'],
    upass =>  $_POST['upass']
];

$allowed = array("name", "email", "password"); // MD5: хранить пароль в явном виде это круто! 
$sql = "INSERT INTO users SET ".pdoSet($allowed, $values);
$stm = $dbh->prepare($sql);
$stm->execute($values) ? die('good job bro!') : die('invalid operation');

?>