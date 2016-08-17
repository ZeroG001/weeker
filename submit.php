<?php 
	//If the server mode is post then show all the items in the array

 echo "hello world this is a test";

	if($_SERVER['REQUEST_METHOD'] == "POST") {
		$postVars = $_POST;

		var_dump($_POST);


		foreach ( $postVars as $var ) {
			echo $var;
		}
	}

?>