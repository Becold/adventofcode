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
$nbDoubleOccurence = $nbTripleOccurence = 0;
foreach ($inputs as $key => $word) {
    $word = str_split($word);

    $nbDouble = $nbTriple = 0;
    $alreadyCheckedChar = [];
    for ($i = 0; $i < count($word); $i++) {
        $nbOccurence = 0;
        $letter = $word[$i];
        if (!in_array($letter, $alreadyCheckedChar)) {
            for ($j = 0; $j < count($word); $j++) {
                if ($letter == $word[$j]) $nbOccurence++;
            }
            $alreadyCheckedChar[] = $letter;
        }
        if ($nbOccurence == 2) $nbDouble++;
        elseif ($nbOccurence == 3) $nbTriple++;
    }

    if ($nbDouble) $nbDoubleOccurence++;
    if ($nbTriple) $nbTripleOccurence++;
}
$checksum = $nbDoubleOccurence * $nbTripleOccurence;
echo "Part 1 soluce: " . $checksum . PHP_EOL;

// Part 2
foreach ($inputs as $key1 => $word1) {
	$word1 = str_split(trim($word1));

    for ($key2 = $key1+1; $key2 < count($inputs); $key2++) {
        if ($key1 == $key2) continue;

		$word2 = str_split(trim($inputs[$key2]));
        $nbDifferentLetter = $iLetter = 0;

		for ($i = 0; $i < count($word1); $i++) {
			$letter1 = $word1[$i];
            $letter2 = $word2[$i];
			if ($letter1 != $letter2) {
				$nbDifferentLetter++;
				$iLetterDifferent = $i;
			}
		}

		if ($nbDifferentLetter == 1) {
            $newWord = $word1;
			array_splice($newWord, $iLetterDifferent, 1);
			echo "Part 2 soluce: " . implode('', $newWord) . PHP_EOL;
			echo "Word1 = " . implode('', $word1) . PHP_EOL;
			echo "Word2 = " . implode('', $word2) . PHP_EOL;
			break;
		}
	}
}