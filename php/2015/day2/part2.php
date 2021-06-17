<?php 

$puzzleInput = file_get_contents('puzzle_input.txt');
$boxes = explode("\n", $puzzleInput);

$totalRibbonFt = 0;

foreach($boxes as $box){
	$dimensions = array_map('intval', explode("x", $box));
	
	$length = $dimensions[0];
	$width = $dimensions[1];
	$height = $dimensions[2];

	$ribbon = 2 * min($length + $width, $width + $height, $height + $length);
	$bow = $length * $width * $height;

	$totalRibbonFt += $ribbon;
	$totalRibbonFt += $bow;
}

echo $totalRibbonFt;

 ?>