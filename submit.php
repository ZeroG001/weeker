<?php 
	//If the request method is post and isset post

 echo "hello world this is a test";

	if($_SERVER['REQUEST_METHOD'] == "POST") {
		$postVars = $_POST;

		var_dump($_POST);


		foreach ( $postVars as $var ) {
			echo $var;
		}
	}

?>