/**
 * @author nthienan
 */
// admin controller
mainApp.controller('adminCtrl', function($rootScope, $scope, $http, $location, $filter) {
	$scope.selectedId = [];
	$http.defaults.headers.post['Content-Type'] = 'application/json';
	
	// sort
	var orderBy = $filter('orderBy');
	$scope.order = function(predicate, reverse) {
		$scope.response.content = orderBy($scope.response.content, predicate, reverse);
		switch(predicate){
			case 'username': 
				$scope.username = reverse ? 'glyphicon-sort-by-attributes-alt' : 'glyphicon-sort-by-attributes';
				$scope.name = '';
				break;
			case 'name': 
				$scope.name = reverse ? 'glyphicon-sort-by-attributes-alt' : 'glyphicon-sort-by-attributes';
				$scope.username = '';
				break;
		}
	};

	// load list
	$scope.load = function() {
		$http.get('/api/user' + '?page=' + ($rootScope.pageNumber - 1) + '&size=' + $rootScope.pageSize)
			.success(function(data) {
				$scope.response = data.response;
			});
	};
	
	// delete
	$scope.deleteMulti = function(){
		var values = JSON.stringify($scope.selectedId);
		jQuery.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'},
				'type' : 'DELETE',
				'url' : '/api/user',
				'data' : values,
				'dataType' : 'json'
			})
			.success(function(data){
				$scope.load();
		});
	};
	
	// push or splice selected id
	$scope.select = function(username){
		var idx = $scope.selectedId.indexOf(username);
		if(idx > -1)
			$scope.selectedId.splice(idx, 1);
		else
			$scope.selectedId.push(username);
	};
	
	// redirect to edit view
	$scope.editUser = function(username) {
		$location.path('/admin/edit-user/' + username);
	};
	
	// redirect to add user view
	$scope.addUser = function() {
		$location.path('/admin/add-user');
	};
	
	$scope.load();
});