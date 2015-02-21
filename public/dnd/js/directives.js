'use strict';

/* Directives */

angular.module('dnd5e.directives', [])
    .directive('qtip', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var my = attrs.my || 'bottom center'
                  , at = attrs.at || 'top center'
                  , qtipClass = attrs.class || 'qtip'
                  , content;

                if (attrs.title) {
                    content = {'title': attrs.title, 'text': attrs.content}
                } else {
                    content = attrs.content
                }

                $(element).qtip({
                    content: content,
                    position: {
                        my: my,
                        at: at,
                        target: element
                    },
                    hide: {
                        fixed : true,
                        delay : 100
                    },
                    style: qtipClass
                });
            }
        }
    });
