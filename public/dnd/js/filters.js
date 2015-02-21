'use strict';

/* filters */

var module = angular.module('dnd5e.filters', []);

module.filter('titlecase', function() {
    return function(s) {
        s = ( s === undefined || s === null ) ? '' : s;
        return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
            return ch.toUpperCase();
        });
    };
});

module.filter('removeFalsy', function() {
    return function(input) {
        if(input instanceof Array) {
            return input.filter(function(item) {
                return !!item;
            });
        } else {
            return [];
        }
    }
});

module.filter('abs', function() {
    return function(input) {
        if(typeof input == 'number') {
            return Math.abs(input);
        } else {
            return input;
        }
    }
});

// Filter: 'orderByTenure'
// Filter for rearranging the items in an array by their name, numerically. Used for ranges of dates (eg., '1-3 months', '4-6 months')
module.filter('orderByTenure', function() {
    return function(input) {
        return sort_tenures(input);
    }
});

module.filter('sortOptions', function() {
    return function(slicer) {
        if(slicer.name == 'Tenure Group') {
            return sort_tenures(slicer.options);
        } else if (slicer.name == 'DMA') {
            return slicer.options.sort(compare_names);
        } else {
            return slicer.options;
        }
    }
});

module.filter('sortOptionObject', function() {
    return function(slicer) {
        var options = [];
        for(var key in slicer.options) {
            if(slicer.options.hasOwnProperty(key)) {
                options.push(slicer.options[key]);
            }
        }
        if(slicer.name !== 'DMA') {
            return options;
        }
        return options.sort(compare_names);
    }
});

function sort_tenures(options) {
    if(options instanceof Array) {
        return options.sort(compare_tenures);
    } else if(typeof options == 'object' && options !== null) {
        var return_data = [];
        for(var key in options) {
            if(options.hasOwnProperty(key)) {
                return_data.push(options[key]);
            }
        }
        return return_data.sort(compare_tenures);
    }
}

function compare_tenures(a, b) {
    var a_date = a.name.split('-'),
        a_date = parseInt(a_date[0]),
        b_date = b.name.split('-'),
        b_date = parseInt(b_date[0]);

    return (a_date - b_date);
}

function compare_names(a,b) {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
}

module.filter('hstoreIndices', function() {
    return function(input) {
        if(typeof input == 'string' && input !== null) {
            switch(input) {
                case 'b':
                    return '1/mo';
                case 'c':
                    return '2/mo';
                case 'd':
                    return '3/mo';
                case 'e':
                    return '4+/mo';
                case 'f':
                    return '1plus';
                default:
                    return '?';
            }
        }
    }
});

module.filter('orderByNumeric', function() {
    return function(input, attribute, reverse) {
        if(input instanceof Array) {
            return input.sort(function(a,b) {
                var diff = parseFloat(a[attribute]) - parseFloat(b[attribute]);
                if(reverse) {
                    return -diff;
                } else {
                    return diff;
                }
            });
        } else {
            return input;
        }
    }
});

module.filter('textOrNumber', function ($filter) {
    return function (input, significance) {
        if (isNaN(input) || !isFinite(input)) {
            return input;
        } else {
            return $filter('number')(input, significance);
        };
    };
});

module.filter('titleCase', function() {
    return function(input) {
        if(typeof input !== 'string') {
            return input;
        } else {
            // Be prepared for TLAs
            if(input.length == 3) {
                return input.toUpperCase();
            } else {
                var words = input.split('_');
                for(var i = 0;i < words.length;i++) {
                    if(words[i].length > 1) {
                        var first_letter = words[i].substr(0,1);
                        var rest_of_word = words[i].substr(1);
                        words[i] = first_letter.toUpperCase() + rest_of_word;
                    } else {
                        words[i] = words[i].toUpperCase();
                    }
                }
                return words.join(' ');
            }
        }
    }
});
