<?php 

$puzzleInput = file_get_contents('puzzle_input.txt');
$boxes = explode("\n", $puzzleInput);

$totalSqFeet = 0;

foreach($boxes as $box){
	$dimensions = array_map('intval', explode("x", $box));
	
	$length = $dimensions[0];
	$width = $dimensions[1];
	$height = $dimensions[2];

	$boxArea = ((2 * $length * $width) + (2 * $width * $height) + (2 * $height * $length));
	$slackArea = min($length * $width,  $width * $height, $height * $length);

	$totalSqFeet += $boxArea;
	$totalSqFeet += $slackArea;
}

echo $totalSqFeet;

 ?>