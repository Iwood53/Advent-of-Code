<?php 

$puzzleInput = file_get_contents('puzzle_input.txt');
$puzzleInputArray = str_split($puzzleInput);

$floor = 0;
$move = 0;

foreach ($puzzleInputArray as $instruction){
	if($floor != -1){
		if ($instruction == ')'){
			$floor--;
		}
		else{
			$floor++;
		}

		$move++;	
	}
	else{
		break;
	}	
}

echo $move;

?>