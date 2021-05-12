class LineYAxisDecorator extends ALineChartDecorator
{
    constructor({
        chart,
        tickCount = 2,
        lineColor = 'black',
        lineStrokeWidth = 1,
        tickStrokeWidth = 0.5,
        font = {
            fontSize: 10,
            fontFamily: 'Times New Roman, Times, serif',
            textColor: 'black'
        },
        offset = 0,
    })
    {
        super(chart);
        this._lineColor = lineColor;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = font;
        this._offset = offset;
        this._tickCount = tickCount;
    }

    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateYAxis();
    }

    _CreateYAxis()
    {
        this._CreateAxis();
        this._CreateTicks();
    }

    _CreateAxis()
    {
        var yAxis = new Konva.Line({
            points: [-this._offset, 0, -this._offset, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        });
        this._group.add(yAxis); 
    }

    _CreateTicks()
    {
        var yTicks = this._yScale.ticks(this._tickCount);
        var helper = new Konva.Group();
        var tickLength = 6;
        var numberHeight = this._GetFontSize('M', this._font); 
        yTicks.forEach(d => {
            var numberWidth = this._GetFontSize(d, this._font);
            helper.add(new Konva.Line({
                points: [-this._offset, this._yScale(d) - 0.5, -tickLength-this._offset, this._yScale(d) - 0.5],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));
            var text = new Konva.Text({
                text: d,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: -tickLength - numberWidth - 5 - this._offset,
                y: this._yScale(d) - (numberHeight / 2),
            }); 
            helper.add(text);
        });
        this._group.add(helper);
    }
}