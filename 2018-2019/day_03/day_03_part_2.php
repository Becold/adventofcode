<?php
$inputs = [];
$handle = @fopen("inputs.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $inputs[] = $line;
    }
    fclose($handle);
}

class Area {
    public $id;
    public $x;
    public $y;
    public $w;
    public $h;
    public $isOverlapped;

    function __construct($id, $x, $y, $w, $h) {
        $this->id = $id;
        $this->x = $x;
        $this->y = $y;
        $this->w = $w;
        $this->h = $h;
        $this->isOverlapped = false;
    }

    function doOverlapWith(Area $area) {
        return !($this->x + $this->w < $area->x || $this->y + $this->h < $area->y ||
                 $this->x > $area->x + $area->w || $this->y > $area->y + $area->h);
    }
}

$inputs = array_map(function($item) {
    $item = trim($item);
    $parts = explode(" @ ", $item);
    $partsAreas = explode(": ", $parts[1]);
    $XandYArea = $partsAreas[0];
    $widthHeightArea = $partsAreas[1];

    $id = intval(ltrim($parts[0], "#"), 10);
    $x = intval(explode(",", $XandYArea)[0], 10);
    $y =  intval(explode(",", $XandYArea)[1], 10);
    $width = intval(explode("x", $widthHeightArea)[0], 10);
    $height = intval(explode("x", $widthHeightArea)[1], 10);

    return new Area($id, $x, $y, $width, $height);
}, $inputs);

foreach ($inputs as $key1 => $area1) {
    for ($key2 = $key1+1; $key2 < count($inputs); $key2++) {
        $area2 = $inputs[$key2];
        if ($area1->doOverlapWith($area2)) {
            $area1->isOverlapped = $area2->isOverlapped = true;
        }
        
        if ($key2 == count($inputs)-1 && !$area1->isOverlapped) {
            $claimedZone = $area1;
        }
    }
}

echo "Part 2 soluce: " . $claimedZone->id . PHP_EOL;