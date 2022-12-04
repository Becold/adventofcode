<?php
$inputs = [];
$handle = @fopen("inputs.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $inputs[] = $line;
    }
    fclose($handle);
}

// Part 1
$sum = 0;
foreach ($inputs as $key => $value) {
    $sum += intval($value, 10);
}
echo $sum;

// Part 2
$sum = 0;
$foundsSum = [];

for ($i = 0;;$i++) {
    if ($i == count($inputs)) {
        
        $i = 0;
    }

    if (in_array($sum, $foundsSum)) {
        echo "Double trouvé: " . $sum . PHP_EOL;
        break;
    }

    $foundsSum[] = $sum;

    $sum += intval($inputs[$i], 10);
}