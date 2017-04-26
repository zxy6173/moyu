(function (window) {
    Vector2 = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Vector2.prototype = {
        sub: function (v) {
            return new Vector2(this.x - v.x, this.y - v.y)
        },
        dot: function (v) {
            return this.x * v.x + this.y * v.y;
        }
    };
    window.Vector2 = Vector2;
} (window))
