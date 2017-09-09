// Code goes here
var app = angular.module('myModule', []);

app.controller('MainCtrl', function($scope) {
    $scope.userArray = [];

    //$scope.formData = {};
    $scope.IsHidden = false;
    //console.log($scope.userArray);
    $scope.submitForm = function(isValid) {

        if (isValid) {
            $scope.userArray.push('Name' + ":" + $scope.formData.username, 'Address' + ":" + $scope.formData.address);
        }
        $scope.IsHidden = $scope.IsHidden ? true : true;
        // console.log($scope.userArray);
        $scope.formData.username = '';
        $scope.formData.address = '';
        $scope.formattedString = $scope.userArray.toString()
            //.replace(",", "</br>") //remove the commas
            .replace("[", "") //remove the right bracket
            .replace("]", "")
            //remove the left bracket
            .trim();
        // console.log($scope.userArray);
    };
});