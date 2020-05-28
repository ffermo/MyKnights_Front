// Global variables.
var urlBase = 'http://coronacontacts.club/APICode';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var email = "";
var password ="";

function displayName()
{
	document.getElementById("userFirstName").innerHTML = "Howdy!" + userId;
}

function doLogin()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
	//var hash = md5(password);

	document.getElementById("loginResult").innerHTML = "";

	//var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"email" : "' + email + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText  );
		userId = jsonObject.id;

		if( userId < 1  )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "dashboard.html";
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doRegister()
{
	var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
	//var hash = md5(password);

	document.getElementById("regResult").innerHTML = "";

	//var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"first" : "' + firstName + '", "last" : "' + lastName + '", "email" : "'+ email + '", "password" : "' + password + '"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.id;

		if( userId < 1  )
		{
			        document.getElementById("regResult").innerHTML = "E-mail already exists!";
			        return;
		}

		document.getElementById("regResult").innerHTML = "In Database";
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		alert("Successfully Registered");

		window.location.href = "dashboard.html";
		
	}
	catch(err)
	{
		document.getElementById("regResult").innerHTML = err.message;
	}
}

	
function saveCookie()
{
	    var minutes = 20;
	    var date = new Date();
	    date.setTime(date.getTime()+(minutes*60*1000));
	    document.cookie = "firstName=" + firstName + ", lastName=" + lastName + ", userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		if( tokens[0] == "userId" )
		{
			userId = parseInt(tokens[1]);
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("searchResults").innerHTML = "";

	// Json DB elements
	var name = "";
	// var email = "";
	// var city = "";
	// var state = "";
	// var zip = "";
	// var phoneNumber = "";
	// var infected = "";

	// Converts to JSON package + sends to the API
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContact.' + extension;
	
	// API Call
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{	
				// Text displays to inform client the search results are displayed. 
				document.getElementById("searchResults").innerHTML = "Resulting Search Displayed";
				var jsonObject = JSON.parse( xhr.responseText );
				
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					// Needs to convert to 
					name += jsonObject.results[i].name;
					// infected += jsonObject.results[i].infected;
					if( i < jsonObject.results.length - 1 )
					{	
						name += "<br />\r\n";
					}
				}
				document.getElementById("print_sector").innerHTML = name;
				// document.getElementsByTagName("p")[i].innerHTML = test_name;

			}
		};
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("searchResults").innerHTML = err.message;
	}
	
}


{/* <div class="row justify-content-center">
	<table class="table">
		<thead>
			<tr>
				<th>name</th>
				<th>etc.</th>
				<th>buttons</th>
			</tr>
		</thead>

		//while loop
			<tr>
				<td></td>
				<td></td>
			</tr>
	</table>
</div> */}
