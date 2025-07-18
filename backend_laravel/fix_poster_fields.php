<?php

// Скрипт для исправления имен полей постеров в ProjectController.php

$file = 'app/Http/Controllers/Api/ProjectController.php';
$content = file_get_contents($file);

// Исправляем все вхождения media_items.{$index}.poster на media_items.{$index}.poster_file
$patterns = [
    // Валидация постеров
    '/\$request->hasFile\("media_items\.\{\$index\}\.poster"\)/' => '$request->hasFile("media_items.{$index}.poster_file")',
    '/\$request->file\("media_items\.\{\$index\}\.poster"\)/' => '$request->file("media_items.{$index}.poster_file")',
    '/\$validator->errors\(\)->add\("media_items\.\{\$index\}\.poster"/' => '$validator->errors()->add("media_items.{$index}.poster_file"',
    
    // Логирование
    '/"hasPoster" => \$request->hasFile\("media_items\.\{\$index\}\.poster"\)/' => '"hasPoster" => $request->hasFile("media_items.{$index}.poster_file")',
];

foreach ($patterns as $pattern => $replacement) {
    $content = preg_replace($pattern, $replacement, $content);
}

// Сохраняем исправленный файл
file_put_contents($file, $content);

echo "Исправления применены к файлу: $file\n";
echo "Проверьте изменения и убедитесь, что все работает корректно.\n";