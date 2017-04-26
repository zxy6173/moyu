(function(window){
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
    };
    var Vector2 = function (x, y) {
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

    var CollisionDetector = {

        detectorOBBvsOBB: function (OBB1, OBB2) {
            var nv = OBB1.centerPoint.sub(OBB2.centerPoint);
            var axisA1 = OBB1.axes[0];
            if (OBB1.getProjectionRadius(axisA1) + OBB2.getProjectionRadius(axisA1) <= Math.abs(nv.dot(axisA1))) return false;
            var axisA2 = OBB1.axes[1];
            if (OBB1.getProjectionRadius(axisA2) + OBB2.getProjectionRadius(axisA2) <= Math.abs(nv.dot(axisA2))) return false;
            var axisB1 = OBB2.axes[0];
            if (OBB1.getProjectionRadius(axisB1) + OBB2.getProjectionRadius(axisB1) <= Math.abs(nv.dot(axisB1))) return false;
            var axisB2 = OBB2.axes[1];
            if (OBB1.getProjectionRadius(axisB2) + OBB2.getProjectionRadius(axisB2) <= Math.abs(nv.dot(axisB2))) return false;
            return true;

        }
    };
    var Util = {
        impact:function(role1,role2){
            var x1 = role1.x || 0;
            var x2 = role2.x || 0;
            var y1 = role1.y || 0;
            var y2 = role2.y || 0;
            var w1 = role1.w || 0;
            var w2 = role2.w || 0;
            var h1 = role1.h || 0;
            var h2 = role2.h || 0;
            var r1 = role1.rotate || 0;
            var r2 = role2.rotate || 0;
            var obb1 = new OBB(new Vector2(x1, y1), w1, h1, r1);
            var obb2 = new OBB(new Vector2(x2, y2), w2, h2, r2);
            return CollisionDetector.detectorOBBvsOBB(obb1,obb2);
        }
    }
    window.Util = Util;

})(window);
