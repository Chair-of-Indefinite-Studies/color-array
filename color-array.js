;(function(color, undefined){
    /* transform a color string into an color array usable by canvas image data */
    var strategies = [];

    var array = color.array = function(name){
	var strategy = strategies.filter(function(strategy){
	    return strategy.appliesTo(name);
	})[0];
	return strategy(name);
    };
    array.registerStrategy = function(strategy){
	strategies.push(strategy);
    }

    function to_i(n){
	return Number.parseInt(n);
    }

    var rgbRegex = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    var rgb = function(name){
	var matches = name.match(rgbRegex).slice(1).map(to_i);
	return [matches[0], matches[1], matches[2], 255];
    };
    rgb.appliesTo = function(name){
	return (name || "").match(rgbRegex);
    };
    array.registerStrategy(rgb);

    var rgbaRegex = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    var rgba = function(name){
	var matches = name.match(rgbaRegex).slice(1).map(to_i);
	return [matches[0], matches[1], matches[2], matches[3]];
    };
    rgba.appliesTo = function(name){
	return (name || "").match(rgbaRegex);
    };
    array.registerStrategy(rgba);
})(window.color = window.color || {})
