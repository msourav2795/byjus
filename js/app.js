var app = angular.module('byjus', []);


app.controller('course-listing', function($scope, $http) {
  $scope.availabelSearchOptions = [   // first serach box data
      {id: 'Provider', name: 'Provider'},
      {id: 'Universities', name: 'Universities'},
      {id: 'Parent Subject', name: 'Subject'}
    ];
	$scope.courseData = "";
	$scope.provider = [];
	$scope.universities = [];
	$scope.parentSubject = [];
	$scope.firstDropdown = "";
	$scope.secondDropdownList = [];
	$scope.secondDropdown = "";
	$scope.modifiedData = [];
	$scope.dataLength = "";
	
  $http.get("https://api.myjson.com/bins/1fq8pm").then(function (response) { // api call
    $scope.courseData = response.data;
	$scope.modifiedData = $scope.courseData;
	
 
	$scope.getDropdownData($scope.courseData);
    //console.log( $scope.courseData);
	
	}).finally(function() {
    toggleBodyLoader()
  });
  $scope.getDropdownData = function(data){  // parse data for second dropdown
	var provider = [];
	var universities = [];
	var parentSubject = [];
	angular.forEach(data, function (value, key) {  // conditions for repeated data
		if(provider.indexOf(value.Provider)=== -1 && value.Provider != "")
			provider.push(value.Provider);
		if(universities.indexOf(value.Universities.Institutions)=== -1 && value.Universities.Institutions != "")
			universities.push(value.Universities.Institutions);
		if(parentSubject.indexOf(value["Parent Subject"])=== -1 && value["Parent Subject"] != "")
			parentSubject.push(value["Parent Subject"]);
    });
	$scope.provider = provider;
	$scope.universities = universities;
	$scope.parentSubject = parentSubject;
	//console.log($scope.provider);
	//console.log($scope.parentSubject);

  }
  $scope.changeFirstDropDown = function(data){  // function called when first dropdown is clicked
	$scope.firstDropdown = data;
	//console.log(data);
	if(data == "Provider"){
		$scope.secondDropdownList = $scope.provider;
		//console.log($scope.secondDropdownList);
	}
	else if(data == "Universities"){
		data=""
		$scope.secondDropdownList = $scope.universities;
		//console.log($scope.secondDropdownList);
	}
	else if(data == "Parent Subject"){
		$scope.secondDropdownList = $scope.parentSubject;
		//console.log($scope.secondDropdownList);
	}
	
  }
  
  $scope.changeSecondDropDown = function(data){  // function called when second dropdown is clicked
	$scope.secondDropdown = data;
	//console.log($scope.courseData);
	var customData = [];
	for(var i in $scope.courseData){
		var temp = $scope.courseData[i];
		//console.log(temp);
		if($scope.firstDropdown == "Universities"){
			if(temp[$scope.firstDropdown].Institutions == $scope.secondDropdown){
				customData.push(temp);
			}
		}
		if(temp[$scope.firstDropdown] == $scope.secondDropdown){
			customData.push(temp);
		}
		
		
		// data is modified to sort the by release date
		var date=temp["Next Session Date"];
		date = date.replace(",", "");
		date = date.replace("st", "");
		date = date.replace("nd", "");
		date = date.replace("rd", "");
		date = date.replace("th", "");
		var arr= date.split(" ");
		if(arr.length == 2){
			date =  arr[1] + $scope.getMonth(arr[0]);
		}
		else{
			date = arr[2] + $scope.getMonth(arr[1]) + $scope.getDate(arr[0]);
		}
		
		temp["Date"]=date;
		//console.log(temp);
	}
	$scope.dataLength = customData.length;
	$scope.modifiedData = customData;
	//console.log($scope.modifiedData);
  }
  $scope.setOrder = function(propertyName) {  //function to order data by property
	$scope.order_type = propertyName;
  };
  $scope.getDate = function(data){  // get formatted date
	if(data < 10){
		return "0"+data;
	}
	return data;
  }
  $scope.getMonth = function(data){ // get a number for month
	if(data == "Jan")
		return "01";
	else if(data == "Feb")
		return "02";
	else if(data == "Mar")
		return "03";
	else if(data == "Apr")
		return "04";
	else if(data == "May")
		return "05";
	else if(data == "Jun")
		return "06";
	else if(data == "Jul")
		return "07";
	else if(data == "Aug")
		return "08";
	else if(data == "Sep")
		return "09";
	else if(data == "Oct")
		return "10";
	else if(data == "Nov")
		return "11";
	else if(data == "Dec")
		return "12";
	return "00";
  }



});