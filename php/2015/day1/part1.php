<?php 

$puzzleInput = file_get_contents('puzzle_input.txt');
$puzzleInputArray = str_split($puzzleInput);

$floor = 0;
$move = 1;

foreach ($puzzleInputArray as $instruction){
	if ($instruction == ')'){
		$floor--;
	}
	else{
		$floor++;
	}

	$move++;	
}

echo $floor;

?>