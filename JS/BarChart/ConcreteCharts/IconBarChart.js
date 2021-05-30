class IconBarChart extends ABarChart
{
    /**
     * Implementation notes:
     * 
     * 1. Width between elements should remain same (i.e. rotation shouldn't 
     *    impact padding).
     * 2. range -> (0 to h)
     * 3. xScale(dataPoint) / h -> linearGradient
     */
    constructor({data, group, width, height, padding, angleOffset = 0,
        icon = '\uf183', remainderColor = 'black', iconSize = 100, dynamicFont = false})
    {
        super(data, group, width, height, padding, 0, 'Icon');
        this._angleOffset = angleOffset;
        this._icon = icon;
        this._remainderColor = remainderColor;
        this._iconSize = parseFloat(iconSize);
        this._dynamicFont = dynamicFont;
    }

    CreateBarChart()
    {
        if (this._dynamicFont) this._DetermineFontSize();
        var upperBound = this._UpdateUpperBound();
        
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom) 

        var points = this._DetermineLinearGradient(upperBound);
        this._Draw(custom, points);
    }

    _UpdateUpperBound()
    {
        var upperBound = this._iconSize;
        if (this._angleOffset == 45) {
            upperBound = Math.sqrt(2 * Math.pow(this._iconSize, 2));
        } 
        return parseInt(upperBound);
    }

    _DetermineLinearGradient(upperBound)
    {
        if (this._angleOffset === 45) {
            /*
                y: upperBound -> width of bounding box
                x: upperBound -> height of bounding box
            */
            var multiplier = 0.6;
            return [
                { x: 0, y: upperBound * multiplier},
                { x: upperBound * multiplier, y: 0 }
            ];
        }

        return [
            { x: 0, y: upperBound + 1},
            { x: 0, y: -1 }
        ];
    }

    _GetIconWidth()
    {
        var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        document.getElementById('body').appendChild(canvas)

        ctx.font = '900 ' + this._iconSize + 'px ' + '"Font Awesome 5 Free"';
        var textMetrics = ctx.measureText(this._icon);
        var width = Math.abs(textMetrics.actualBoundingBoxLeft 
            - textMetrics.actualBoundingBoxRight);

        canvas.remove();

        return width;
    }

    _GetIconHeight()
    {
        var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        ctx.font = '900 ' + this._iconSize + 'px ' + '"Font Awesome 5 Free"';
        var textMetrics = ctx.measureText(this._icon);
        var height = Math.abs(textMetrics.actualBoundingBoxAscent) - 
            Math.abs(textMetrics.actualBoundingBoxDescent);
        
        canvas.remove();

        return height;
    }

    _FindMaxValue()
    {
        var max = (this._data.length > 0) ? this._data[0].value : 0;
        for (var i = 1; i < this._data.length; i++) {
            if (this._data[i].value > max) max = this._data[i].value;
        }
        return max;
    }

    _BindData(custom)
    {
        var minCategory = this._FindMinCategory();
        custom.selectAll('custom.elem')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'elem')
            .attr('x', (d, i) => {
                var offset = (i == 0) ? 0 : this._padding;
                return this._xScale(d.category) - this._xScale(minCategory) + offset;
            })
            .attr('y', () => {
                // Update to use text metrics to find height
                return (this._iconSize / 2);
            })
            .attr('width', () => {
                return this._xScale.bandwidth();
            })
            .attr('gradientHeight', (d) => {
                return d.value / this._FindMaxValue();
            })
            .attr('fillStyle', (d) => {
                return d.color;
            })
            .attr('icon', this._icon)
            .attr('remainderColor', this._remainderColor)
            .attr('size', this._iconSize)
            .attr('angleOffset', this._angleOffset);
    }

    _FindMinCategory()
    {
        var index = 0;
        for (var i = 1; i < this._data.length; i++) {
            if (this._data[i].value > this._data[i].value) index = i;
        }
        return this._data[index].category;
    }

    _Draw(custom, points)
    {
        var elements = custom.selectAll('custom.elem');
        var helper = new Konva.Group({
            x: 0, y: 0
        });
        elements.each(function() {
            var node = d3.select(this);

            var gradientHeight = parseFloat(node.attr('gradientHeight')),
                iconSize = parseFloat(node.attr('size')),
                x = parseFloat(node.attr('x')),
                y = parseFloat(node.attr('y'));

            var icon = new Konva.Text({
                text: node.attr('icon'),
                fontSize: iconSize,
                fontFamily: '"Font Awesome 5 Free"',
                fontStyle: '900',
                x: x,
                y: y,
                fillLinearGradientStartPoint: points[0],
                fillLinearGradientEndPoint: points[1],
                fillLinearGradientColorStops: [0, node.attr('fillStyle'), 
                    gradientHeight, node.attr('fillStyle'), 
                    gradientHeight, node.attr('remainderColor'), 
                    1, node.attr('remainderColor')]
            });
           
            icon.rotate(-node.attr('angleOffset'));
            helper.add(icon)
        });
        this._group.add(helper);
    }
}