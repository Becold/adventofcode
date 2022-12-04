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
$board = array_fill(0, 1000, array_fill(0, 1000, 0));
$nbClaimedCells = 0;

foreach($inputs as $key => $item) {
    $item = trim($item);
    $parts = explode(" @ ", $item);
    $partsAreas = explode(": ", $parts[1]);
    $XandYArea = $partsAreas[0];
    $widthHeightArea = $partsAreas[1];

    $x = intval(explode(",", $XandYArea)[0], 10);
    $y =  intval(explode(",", $XandYArea)[1], 10);
    $width = intval(explode("x", $widthHeightArea)[0], 10);
    $height = intval(explode("x", $widthHeightArea)[1], 10);
    
    for ($b = $y; $b < ($y+$height); $b++) {
        for ($a = $x; $a < ($x+$width); $a++) {
            $board[$b][$a]++;

            if ($board[$b][$a] == 2)
                $nbClaimedCells++;
        }
    }
}
echo $nbClaimedCells;