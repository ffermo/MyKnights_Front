<?php
	$inData = getRequestInfo();
	// $ID = getID();

	// $searchResults = "";
	// NOTE: Variables (might change later)
	// Parse and store individuals fields from JSON field into variables.
	$ID = $inData["ID"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "faizar", "", "coronacontacts");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 

	else
	{
		$sql = "delete from Contacts where ID = '" . $ID . "'" . "and UserID ='" . $userId . "'";
		
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		
		$conn->close();
	}

	returnWithError("CONTACT DELETED!");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>