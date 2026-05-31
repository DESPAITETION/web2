<?php
// Устанавливаем заголовки для работы с JSON
header('Content-Type: application/json; charset=utf-8');

// --- НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ ---
$host = 'localhost';
$db   = 'u82369'; // Укажи точное имя своей базы данных, если оно отличается
$user = 'u82369';
$pass = '4449825'; // Вставь сюда свой реальный пароль от базы данных
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка подключения к БД: ' . $e->getMessage()]);
    exit;
}

// Читаем JSON-данные, которые прислал React-компонент
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['status' => 'error', 'message' => 'Получены пустые данные']);
    exit;
}

// Безопасно достаем поля
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$message = trim($input['message'] ?? '');
$userId = !empty($input['id']) ? (int)$input['id'] : null;

// --- СТРОГАЯ БЭКЕНД-ВАЛИДАЦИЯ (Защита ТЗ) ---
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Поля Имя, Email и Сообщение обязательны.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Некорректный формат Email адреса.']);
    exit;
}

// Жесткая проверка телефона: разрешаем только от 10 до 15 цифр (опционально плюс в начале)
if (!empty($phone) && !preg_match('/^\+?[0-9]{10,15}$/', $phone)) {
    echo json_encode(['status' => 'error', 'message' => 'Некорректный телефон! Должно быть от 10 до 15 цифр без букв и пробелов.']);
    exit;
}

// --- ОБРАБОТКА ЗАПРОСА ---
if ($userId) {
    // Режим АВТОРblockИЗОВАННОГО пользователя (Обновление профиля)
    try {
        $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, phone = ?, company = ?, message = ? WHERE id = ?");
        $stmt->execute([$name, $email, $phone, $company, $message, $userId]);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Данные вашего профиля успешно изменены!'
        ]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка обновления базы: ' . $e->getMessage()]);
    }
} else {
    // Режим НЕАВТОРblockИЗОВАННОГО пользователя (Регистрация нового аккаунта по ТЗ)
    $login = 'user_' . time() . '_' . rand(10, 99); // Уникальный логин
    $plainPassword = bin2hex(random_bytes(4));     // Случайный читаемый пароль (8 символов)
    $passwordHash = password_hash($plainPassword, PASSWORD_BCRYPT); // Хэш для БД

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, company, message, login, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $company, $message, $login, $passwordHash]);
        
        $newId = $pdo->lastInsertId();
        $profileUrl = "http://u82369.kubsu-dev.ru/lab4/index.html?id=" . $newId;

        // Возвращаем именно те ключи, которые ждет твой React (`result.login`, `result.password` и т.д.)
        echo json_encode([
            'status' => 'success',
            'login' => $login,
            'password' => $plainPassword,
            'profile_url' => $profileUrl
        ]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка записи в базу: ' . $e->getMessage()]);
    }
}