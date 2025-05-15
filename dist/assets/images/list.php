<?php
$folder = isset($_GET['folder']) ? basename($_GET['folder']) : '';
$base = __DIR__ . '/' . $folder;

if (!is_dir($base)) {
    http_response_code(404);
    echo json_encode([]);
    exit;
}

$files = array_values(array_filter(scandir($base), function($file) use ($base) {
    return is_file($base . '/' . $file) && preg_match('/\.(jpe?g|png|webp)$/i', $file);
}));

header('Content-Type: application/json');
echo json_encode($files);
