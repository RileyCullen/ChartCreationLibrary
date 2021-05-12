class LineXAxisDecorator extends ALineChartDecorator
{
    constructor({
        chart, 
        option = 'Year',
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
        this._option = option;
    }

    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateXAxis();
    }

    _CreateXAxis()
    {
        console.log('X-axis')
        this._CreateAxis();    
        this._CreateTicks();
    }

    _CreateAxis()
    {
        var helper = new Konva.Group();
        this._group.add(helper);
        helper.add(new Konva.Line({
            points: [0 - this._offset, this._chartHeight, this._chartWidth + this._offset, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        }));
    }

    _CreateTicks()
    {
        var helper = new Konva.Group();
        var textHeight = this._GetFontSize('M', this._font);
        this._group.add(helper);
        this._xScale.domain().forEach(d => {
            helper.add(new Konva.Line({
                points: [this._xScale(d), this._chartHeight, this._xScale(d), 
                    this._chartHeight + 6],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));

            // clean text 
            var label = this._GetTextLabel(d);
            console.log(label)
            var textWidth = this._GetFontSize(label, this._font);
            var text = new Konva.Text({
                text: label,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: this._xScale(d) - (textWidth / 2),
                y: this._chartHeight + (textHeight),
            }) 
            helper.add(text);
        });
    }

    _GetTextLabel(date)
    {
        if (this._option === 'Year') return d3.timeFormat('%Y')(date);
        return date;
    }
}