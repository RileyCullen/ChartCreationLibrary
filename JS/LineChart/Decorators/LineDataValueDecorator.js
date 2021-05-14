class LineDataValueDecorator extends ALineChartDecorator
{
    constructor({
        chart, 
        location = 'bottom', 
        font = {
            fontSize: 8,
            fontFamily: 'Times New Roman, Times, serif',
            fontColor: 'black'
        }
    })
    {
        super(chart);
        this._font = font;
        this._location = location;
    }

    CreateChart() 
    {
        this._chart.CreateChart();
        this._AddValues();
    }

    _AddValues()
    {
        this._data.forEach((d) => {
            var text       = d.value,
                textWidth  = this._GetFontSize(text, this._font),
                xPos       = this._xScale(d.date) + this._internalOffsetX - textWidth / 2,
                yPos       = this._yScale(d.value) + this._internalOffsetY,
                fontHeight = this._GetFontSize('M', this._font);

            switch(this._location) {
                case 'bottom':
                    yPos += (fontHeight / 2) + this._pointRadius;
                    break;
                case 'top':
                    yPos -= (fontHeight / 2) + this._pointRadius;
                    break;
                case 'left':
                    xPos -= (textWidth / 2) + this._pointRadius;
                    break;
                case 'right':
                    xpos += (textWidth / 2) + this._pointRadius;
                    break;
            }

            var text = new Konva.Text({
                x: xPos,
                y: yPos,
                text: text,
                fontSize: this._font.fontSize,
                fontfamily: this._font.fontFamily,
                fill: this._font.fontColor,
            });
            this._group.add(text);
        });
    }
}