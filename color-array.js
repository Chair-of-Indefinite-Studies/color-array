;(function(color, undefined){
    /* transform a color string into an color array usable by canvas image data */
    var strategies = [];

    var array = color.array = function(name){
        var strategy = strategies.filter(function(strategy){
            return strategy.appliesTo(name);
        })[0];
        if (!strategy) { throw new Error('no known strategy to convert color \'' + name + '\''); }
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

    function to_f(f) {
        return Number.parseFloat(f);
    }

    function scale(range) {
        return function(f){
            return Math.ceil(f * range);
        }
    }

    var rgbaRegex = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(1|0|(0?\.\d*)|1\.0*)\s*\)/;
    var rgba = function(name){
        var match = name.match(rgbaRegex);
        var colors = match.slice(1, 4).map(to_i);
        var alpha = match.slice(4, 5).map(to_f).map(scale(255));
        return [colors[0], colors[1], colors[2], alpha[0]];
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

    function twice(name){
        return name + name;
    }

    var singleHexRegex = /#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})/;
    var singleHex = function(name){
        var matches = name.match(singleHexRegex).slice(1).map(twice).map(hex_to_i);
        return [matches[0], matches[1], matches[2], 255];
    };
    singleHex.appliesTo = function(name){
        return (name || "").match(singleHexRegex);
    };
    array.addStrategy(singleHex);

    function procent_to_i(i){
        return Math.ceil(255 * i / 100);
    }

    var rgbProcentRegex = /rgb\s*\(\s*(\d+)\s*%\s*,\s*(\d+)\s*%\s*,\s*(\d+)\s*%\s*\)/;
    var rgbProcent = function(name){
        var matches = name.match(rgbProcentRegex).slice(1).map(to_i).map(procent_to_i);
        return [matches[0], matches[1], matches[2], 255];
    };
    rgbProcent.appliesTo = function(name){
        return (name || "").match(rgbProcentRegex);
    };
    array.addStrategy(rgbProcent);

    var named = function(name){
        return doubleHex(named.names[name]);
    }
    named.appliesTo = function(name){
        return !!named.names[name];
    }
    array.addStrategy(named);
    named.names = {
        'black':'#000000',
        'silver':'#c0c0c0',
        'gray':'#808080',
        'white':'#ffffff',
        'maroon':'#800000',
        'red':'#ff0000',
        'purple':'#800080',
        'fuchsia':'#ff00ff',
        'green':'#008000',
        'lime':'#00ff00',
        'olive':'#808000',
        'yellow':'#ffff00',
        'navy':'#000080',
        'blue':'#0000ff',
        'teal':'#008080',
        'aqua':'#00ffff',
        'orange':'#ffa500',
        'aliceblue':'#f0f8ff',
        'antiquewhite':'#faebd7',
        'aquamarine':'#7fffd4',
        'azure':'#f0ffff',
        'beige':'#f5f5dc',
        'bisque':'#ffe4c4',
        'blanchedalmond':'#ffe4c4',
        'blueviolet':'#8a2be2',
        'brown':'#a52a2a',
        'burlywood':'#deb887',
        'cadetblue':'#5f9ea0',
        'chartreuse':'#7fff00',
        'chocolate':'#d2691e',
        'coral':'#ff7f50',
        'cornflowerblue':'#6495ed',
        'cornsilk':'#fff8dc',
        'crimson':'#dc143c',
        'darkblue':'#00008b',
        'darkcyan':'#008b8b',
        'darkgoldenrod':'#b8860b',
        'darkgray':'#a9a9a9',
        'darkgreen':'#006400',
        'darkgrey':'#a9a9a9',
        'darkkhaki':'#bdb76b',
        'darkmagenta':'#8b008b',
        'darkolivegreen':'#556b2f',
        'darkorange':'#ff8c00',
        'darkorchid':'#9932cc',
        'darkred':'#8b0000',
        'darksalmon':'#e9967a',
        'darkseagreen':'#8fbc8f',
        'darkslateblue':'#483d8b',
        'darkslategray':'#2f4f4f',
        'darkslategrey':'#2f4f4f',
        'darkturquoise':'#00ced1',
        'darkviolet':'#9400d3',
        'deeppink':'#ff1493',
        'deepskyblue':'#00bfff',
        'dimgray':'#696969',
        'dimgrey':'#696969',
        'dodgerblue':'#1e90ff',
        'firebrick':'#b22222',
        'floralwhite':'#fffaf0',
        'forestgreen':'#228b22',
        'gainsboro':'#dcdcdc',
        'ghostwhite':'#f8f8ff',
        'gold':'#ffd700',
        'goldenrod':'#daa520',
        'greenyellow':'#adff2f',
        'grey':'#808080',
        'honeydew':'#f0fff0',
        'hotpink':'#ff69b4',
        'indianred':'#cd5c5c',
        'indigo':'#4b0082',
        'ivory':'#fffff0',
        'khaki':'#f0e68c',
        'lavender':'#e6e6fa',
        'lavenderblush':'#fff0f5',
        'lawngreen':'#7cfc00',
        'lemonchiffon':'#fffacd',
        'lightblue':'#add8e6',
        'lightcoral':'#f08080',
        'lightcyan':'#e0ffff',
        'lightgoldenrodyellow':'#fafad2',
        'lightgray':'#d3d3d3',
        'lightgreen':'#90ee90',
        'lightgrey':'#d3d3d3',
        'lightpink':'#ffb6c1',
        'lightsalmon':'#ffa07a',
        'lightseagreen':'#20b2aa',
        'lightskyblue':'#87cefa',
        'lightslategray':'#778899',
        'lightslategrey':'#778899',
        'lightsteelblue':'#b0c4de',
        'lightyellow':'#ffffe0',
        'limegreen':'#32cd32',
        'linen':'#faf0e6',
        'mediumaquamarine':'#66cdaa',
        'mediumblue':'#0000cd',
        'mediumorchid':'#ba55d3',
        'mediumpurple':'#9370db',
        'mediumseagreen':'#3cb371',
        'mediumslateblue':'#7b68ee',
        'mediumspringgreen':'#00fa9a',
        'mediumturquoise':'#48d1cc',
        'mediumvioletred':'#c71585',
        'midnightblue':'#191970',
        'mintcream':'#f5fffa',
        'mistyrose':'#ffe4e1',
        'moccasin':'#ffe4b5',
        'navajowhite':'#ffdead',
        'oldlace':'#fdf5e6',
        'olivedrab':'#6b8e23',
        'orangered':'#ff4500',
        'orchid':'#da70d6',
        'palegoldenrod':'#eee8aa',
        'palegreen':'#98fb98',
        'paleturquoise':'#afeeee',
        'palevioletred':'#db7093',
        'papayawhip':'#ffefd5',
        'peachpuff':'#ffdab9',
        'peru':'#cd853f',
        'pink':'#ffc0cb',
        'plum':'#dda0dd',
        'powderblue':'#b0e0e6',
        'rosybrown':'#bc8f8f',
        'royalblue':'#4169e1',
        'saddlebrown':'#8b4513',
        'salmon':'#fa8072',
        'sandybrown':'#f4a460',
        'seagreen':'#2e8b57',
        'seashell':'#fff5ee',
        'sienna':'#a0522d',
        'skyblue':'#87ceeb',
        'slateblue':'#6a5acd',
        'slategray':'#708090',
        'slategrey':'#708090',
        'snow':'#fffafa',
        'springgreen':'#00ff7f',
        'steelblue':'#4682b4',
        'tan':'#d2b48c',
        'thistle':'#d8bfd8',
        'tomato':'#ff6347',
        'turquoise':'#40e0d0',
        'violet':'#ee82ee',
        'wheat':'#f5deb3',
        'whitesmoke':'#f5f5f5',
        'yellowgreen':'#9acd32',
        'rebeccapurple':'#663399'
    };
})(window.color = window.color || {})
