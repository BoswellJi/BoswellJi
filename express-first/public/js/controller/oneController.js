export default (app) => {
    app.controller('one', ['$scope', '$parse','$interpolate', ($scope, $parse,$interpolate) => {
        $scope.name = 'jmz';
        $scope.parsedValue = '1';

        $scope.$watch('epr', (newVal, oldVal, scope) => {
            if (newVal !== oldVal) {
                // 用该表达式设置parseFun
                var parseFun = $parse(newVal);
                // 获取经过解析后表达式的值
                $scope.parsedValue = parseFun(scope);
            }
        });

        $scope.$watch('emailBody', function(body) {
            if (body) {
                var template = $interpolate(body);
                $scope.previewText =
                    template({ to: $scope.to });
            }
        });

    }]);
}



/**
 * $parse ： 手动触动解析表达式
 * $watch ： 监听控制器下的$scope上的某个属性，变化后，调用指定函数
 */
