class LineChart extends ALineChart 
{
    constructor({data, group, chartWidth, chartHeight, lineWidth = 1, 
        pointRadius = 1, pointColor = 'none', lineColor = 'black'})
    {
        super({ 
            data: data, 
            group: group,
            chartWidth: chartWidth,
            chartHeight: chartHeight,
            lineWidth: lineWidth,
            pointRadius: pointRadius,
            lineColor: lineColor,
            pointColor: pointColor
        });
    }

    CreateChart()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom);
        var orderedPairList = this._CreateOrderedPairList(custom)
        console.log(orderedPairList);
        this._DrawGraph(custom, orderedPairList)
    }

    _BindData(custom)
    {
        var selection = custom.selectAll('custom.point')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'point')
            .attr('x', (d) => {
                return this._xScale(d.date);
            })
            .attr('y', (d) => {
                return this._yScale(d.value);
            })
            .attr('pointColor', this._pointColor)
            .attr('pointRadius', this._pointRadius)
    }

    _CreateOrderedPairList(custom)
    {
        var elements = custom.selectAll('custom.point');
        var helper = new Konva.Group();

        var helperList = []
        elements.each(function(d, i){
            var node = d3.select(this);
            helperList[i] = {
                x: node.attr('x'),
                y: node.attr('y'),
            };
        });

        var list = [];
        for (var i = 0; i < helperList.length; i++) {
            if (i !== 0) {
                list[i - 1] = {
                    x1: helperList[i - 1].x,
                    y1: helperList[i - 1].y,
                    x2: helperList[i].x,
                    y2: helperList[i].y,
                }
            }
        }
        
        return list;
    }

    _DrawGraph(custom, list)
    {
        var elements = custom.selectAll('custom.point');
        var helper = new Konva.Group();

        elements.each(function(d, i){
            var node = d3.select(this);
            console.log('x: ' + node.attr('x'))
            var point = new Konva.Circle({
                radius: node.attr('pointRadius'),
                fill: node.attr('pointColor'),
                x: node.attr('x'),
                y: node.attr('y'),
            });
            helper.add(point);
        });

        list.forEach(d => {
            var line = new Konva.Line({
                points: [d.x1, d.y1, d.x2, d.y2],
                stroke: this._lineColor,
                strokeWidth: this._lineWidth,
            });
            helper.add(line);
        }); 

        this._group.add(helper);
    }
}