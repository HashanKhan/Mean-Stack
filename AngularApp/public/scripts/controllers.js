'use strict';
const Myapp = angular.module('myModule',['ngRoute']);

Myapp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Homepage.html',
            controller: 'HomeController',
        })
        .when('/add', {
            templateUrl: 'Addbook.html',
            controller: 'HomeController',
        })
        .when('/delete', {
            templateUrl: 'Homepage.html',
            controller: 'HomeController',
        });
});

Myapp.controller('HomeController',function ($scope,$http,$location) {
    var refresh = function() {
        $scope.Bookfact = [];
        $http.get('/books').then(function (result) {
            $scope.Bookfact = result;
        });
    };

    refresh();

    $scope.Authorfact = [];
    $http.get('/authors').then(function (result) {
        $scope.Authorfact = result;
    });

    $scope.addBook = function (){
        $http.post('/addbook',{
            name: $scope.nm,
            isbn: $scope.isb,
            author: $scope.auth,
            price: $scope.pri,
            year: $scope.yr,
            publisher: $scope.pub
        }).then(function () {
                $scope.nm = '',
                $scope.isb = '',
                $scope.auth = '',
                $scope.pri = '',
                $scope.yr= '',
                $scope.pub = ''
            alert('Successfully Added!');
            $location.url('/');
        });
    };
    
    $scope.removebook = function (id) {
        console.log(id);
        $http.delete('/books/'+ id).then(function (result) {
            console.log(result);
            alert('Successfully Deleted!');
            refresh();
        });
    };

    $scope.editbook = function (id) {
        console.log(id);
        $http.get('/books/'+ id).then(function (result) {
            $scope.book = result;
        });
    };
});