;(function($, window, document, undefined ) { 'use strict';

    // Create the defaults once
    var pluginName = 'rds',
        defaults = {
        propertyName: 'value'
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            console.log('xD');


            // my stuff...
            var str = this.element.attributes['data-rds'].value;
            var matches = str.match(/\[(.*)\]/g);

            console.log(this.element.naturalHeight);
            console.log(this.element.naturalWidth);

            var vals = matches[0]
                .slice(1,-1)
                .split(/\,\s*/)
                .map(function(str){
                    return parseInt(str, 10);
                });

            var hash = {
                x: vals[0],
                y: vals[1],
                w: vals[2] - vals[0],
                h: vals[3] - vals[1]
            };

            var scale = this.element.width / this.element.naturalWidth;

            var el = document.createElement('div');

            $(el)
                .css({
                    'background-color': 'green',
                    'position': 'absolute',
                    'left': scale * hash.x + 'px',
                    'top': scale * hash.y + '40px',
                    'width': scale * hash.w + '100px',
                    'height': scale * hash.h + '50px'
                });

            $(this.element).after(el);

        },
        yourOtherFunction: function () {
            // some logic
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, 'plugin_' + pluginName ) ) {
                $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
            }
        });
    };


})(jQuery, window, document);
