;(function(color, undefined){
    /* transform a color string into an color array usable by canvas image data */
    var strategies = [];

    var array = color.array = function(name){
	var strategy = strategies.filter(function(strategy){
	    return strategy.appliesTo(name);
	})[0];
	return strategy(name);
    };
    array.addStrategy = function(strategy){
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
    array.addStrategy(rgb);

    var rgbaRegex = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    var rgba = function(name){
	var matches = name.match(rgbaRegex).slice(1).map(to_i);
	return [matches[0], matches[1], matches[2], matches[3]];
    };
    rgba.appliesTo = function(name){
	return (name || "").match(rgbaRegex);
    };
    array.addStrategy(rgba);

    function hex_to_i(name){
	return Number.parseInt(name, 16);
    }

    var doubleHexRegex = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/;
    var doubleHex = function(name){
	var matches = name.match(doubleHexRegex).slice(1).map(hex_to_i);
	return [matches[0], matches[1], matches[2], 255];
    };
    doubleHex.appliesTo = function(name){
	return (name || "").match(doubleHexRegex);
    };
    array.addStrategy(doubleHex);
})(window.color = window.color || {})
