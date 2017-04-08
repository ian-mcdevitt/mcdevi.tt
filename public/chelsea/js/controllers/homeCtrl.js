'use strict';
/* Controllers */
angular.module('chelsea.controllers.home', ['bootstrapLightbox', 'ngAnimate']).controller('homeCtrl', function($scope, Lightbox) {
    $scope.coverSlides = [
        { image: 'public/img/cover/CLM_5062.jpg' },
        { image: 'public/img/cover/CLM_6487.jpg' },
        { image: 'public/img/cover/CLM_7843.jpg' },
        { image: 'public/img/cover/_MG_7872.jpg' },
        { image: 'public/img/cover/MT414.jpg'    },
        { image: 'public/img/cover/SMeng175.jpg' }
    ];

    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.coverSlides.length - 1) ? ++$scope.currentIndex : 0;
    };
    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.coverSlides.length - 1;
    };

    $scope.images = [
        {
            url: 'public/img/CLM_1907-Edit.jpg',
            thumbUrl: 'public/img/CLM_1907-Edit.jpg'
        }, {
            url: 'public/img/CLM_5147-Edit.jpg',
            thumbUrl: 'public/img/CLM_5147-Edit.jpg'
        }, {
            url: 'public/img/CLM_5218.jpg',
            thumbUrl: 'public/img/CLM_5218.jpg'
        }, {
            url: 'public/img/CLM_5893.jpg',
            thumbUrl: 'public/img/CLM_5893.jpg'
        }, {
            url: 'public/img/CLM_7047.jpg',
            thumbUrl: 'public/img/CLM_7047.jpg'
        }, {
            url: 'public/img/CLM_8332-Edit.jpg',
            thumbUrl: 'public/img/CLM_8332-Edit.jpg'
        }, {
            url: 'public/img/CLM_9954.jpg',
            thumbUrl: 'public/img/CLM_9954.jpg'
        }, {
            url: 'public/img/g0185.jpg',
            thumbUrl: 'public/img/g0185.jpg'
        }, {
            url: 'public/img/IMG_5960.jpg',
            thumbUrl: 'public/img/IMG_5960.jpg'
        }, {
            url: 'public/img/_MG_1248.jpg',
            thumbUrl: 'public/img/_MG_1248.jpg'
        }, {
            url: 'public/img/_MG_7115.jpg',
            thumbUrl: 'public/img/_MG_7115.jpg'
        }, {
            url: 'public/img/MT824.jpg',
            thumbUrl: 'public/img/MT824.jpg'
        }, {
            url: 'public/img/RTeng_1041.jpg',
            thumbUrl: 'public/img/RTeng_1041.jpg'
        }, {
            url: 'public/img/SIeng_2480-Edit.jpg',
            thumbUrl: 'public/img/SIeng_2480-Edit.jpg'
        }
    ];

    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
    };
});
