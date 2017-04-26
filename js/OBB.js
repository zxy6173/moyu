(function (window) {

    var OBB = function (centerPoint, width, height, rotation) {

        this.centerPoint = centerPoint;
        this.extents = [width / 2, height / 2];
        this.axes = [new Vector2(Math.cos(rotation), Math.sin(rotation)), new Vector2(-1 * Math.sin(rotation), Math.cos(rotation))];

        this._width = width;
        this._height = height;
        this._rotation = rotation;
    }
    OBB.prototype = {
        getProjectionRadius: function (axis) {
            return this.extents[0] * Math.abs(axis.dot(this.axes[0])) + this.extents[1] * Math.abs(axis.dot(this.axes[1]));
        }
    }
    window.OBB = OBB;
})(window);
