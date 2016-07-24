'use strict';

angular.module('app')
	.controller('taskSchedulerController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = '任务管理';
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/task/read/schedulers',
				data: $scope.param
			}).then(function(result) {
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.pageInfo = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		}
		
		$scope.search();
		
		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
		}
		
		$scope.disableItem = function(id, enable) {
			
		}
		
		// 翻页
        $scope.pagination = function (page) {
            var params = {pageIndex: page};
            // 合并搜索字段
            if($scope.keyword) {
                angular.extend(params, $scope.user);
            }
            go(params);
        };
} ]);