// Cullen, Riley
// ALineChart.js
// May 8, 2021
 
class ALineChart 
{
    /**
     * @summary     Abstract class for LineChart type.
     * @description Abstract class that is used to provide common structure to
     *              the LineChart type.
     * 
     * @param {JSON Array}  data        Data used to populate line chart.
     *                              
     *                                  Should be in the following format:
     *                                      data = [dataElems]
     *          
     *                                  Where dataElem = {
     *                                      year: string,
     *                                      month: string,
     *                                      day: string,
     *                                      value: (integer)
     *                                  }       
     * 
     * @param {Konva.Group} group       The group that contains the line chart.
     * @param {double}      chartWidth  Line chart width.
     * @param {double}      chartHeight Line chart height.
     * @param {double}      lineWidth   Size of the line on the line chart.
     * @param {double}      pointRadius Size of the points on the line chart.
     * @param {string}      lineColor   Color of line on line chart.
     */
    constructor({data, group, chartWidth, chartHeight, lineWidth = 1, 
        pointRadius = 1, pointColor = 'none', lineColor = 'black'})
    {
        if (ALineChart === this.constructor) {
            throw new TypeError('Abstract class "ALineChart" cannot be instantiated.')
        }
        if (this.CreateChart === undefined) {
            throw new TypeError('Types extending "ALineChart" must implement CreateChart')
        }

        this._data = data;
        this._group = group;
        this._chartWidth = chartWidth;
        this._chartHeight = chartHeight;
        this._lineWidth = lineWidth;
        this._pointRadius = pointRadius;
        this._pointColor = pointColor;
        this._lineColor = lineColor;

        this._xScale = d3.scaleTime()
            .range([0, this._chartWidth]);
        
        this._yScale = d3.scaleLinear()
            .range([this._chartHeight, 0])

        this._FormatData();
        this._SetUpXDomain();
        this._SetUpYDomain();
    }
    
    _FormatData()
    {
        this._data.forEach((d,i) => {
            var date;

            if (d3.timeParse("%Y-%m-%d")(d.date)) {
                date = d3.timeParse('%Y-%m-%d')(d.date);
            } else if (d3.timeParse('%Y')(d.date)) {
                date = d3.timeParse('%Y')(d.date);
            } else if (d3.timeParse('%b')(d.date)) {
                date = d3.timeParse('%b')(d.date);
            }

            this._data[i] = {
                date: date,
                value: +d.value
            }
        });
    }

    _SetUpXDomain()
    {
        this._xScale.domain(d3.extent(this._data, function(d) { return d.date; }));
    }

    _SetUpYDomain()
    {
        this._yScale.domain([0, d3.max(this._data, function(d) { return +d.value; })]);
    }
}