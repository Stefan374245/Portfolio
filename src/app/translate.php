<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS', true, 405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

header('Access-Control-Allow-Origin: *');

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$texts = $payload['texts'] ?? [];
$targetLang = strtoupper(trim($payload['targetLang'] ?? ''));
$sourceLang = strtoupper(trim($payload['sourceLang'] ?? 'EN'));

if (!is_array($texts) || count($texts) === 0 || $targetLang === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: texts, targetLang']);
    exit;
}

$deeplApiKey = getenv('DEEPL_API_KEY');
if (!$deeplApiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'DeepL API key is not configured']);
    exit;
}

$deeplApiUrl = getenv('DEEPL_API_URL');
if (!$deeplApiUrl) {
    $isFreeKey = str_ends_with($deeplApiKey, ':fx');
    $deeplApiUrl = $isFreeKey
        ? 'https://api-free.deepl.com/v2/translate'
        : 'https://api.deepl.com/v2/translate';
}

$postFields = [
    'auth_key' => $deeplApiKey,
    'source_lang' => $sourceLang,
    'target_lang' => $targetLang,
    'preserve_formatting' => '1'
];

foreach ($texts as $text) {
    $postFields['text'][] = (string)$text;
}

$curl = curl_init($deeplApiUrl);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postFields));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_TIMEOUT, 20);

$responseBody = curl_exec($curl);
$curlError = curl_error($curl);
$httpCode = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($responseBody === false || $curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'DeepL request failed', 'details' => $curlError]);
    exit;
}

$responseData = json_decode($responseBody, true);
if ($httpCode < 200 || $httpCode >= 300 || !isset($responseData['translations'])) {
    http_response_code($httpCode > 0 ? $httpCode : 502);
    echo json_encode(['error' => 'DeepL response invalid', 'details' => $responseData]);
    exit;
}

$translations = array_map(
    static fn($entry) => $entry['text'] ?? '',
    $responseData['translations']
);

echo json_encode(['translations' => $translations], JSON_UNESCAPED_UNICODE);
