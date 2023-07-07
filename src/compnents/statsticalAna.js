import React, { PureComponent } from 'react';
import { stasticCal } from '../utils/helper';
import wineData from '../json/wineData';
import './style.css';

class StatsticalAnalysis extends PureComponent {

  // used to calculate the gamm i.e. (ash * hue) / magnesium
  calGamma = (ash, hue, magnesium) => {
    const gamma = (ash * hue) / magnesium;
    return gamma.toFixed(3);
  }

  // refactor and combine the classes data into single one and call a function to calculate for mean, median and mode.  
  calStatistic = (data) => {
    const classes = {};
    data?.forEach(item => {
      const gamma = this.calGamma(item.Ash, item.Hue, item.Magnesium);
      if (classes[`Alcohol_${item.Alcohol}`]) {
        classes[`Alcohol_${item.Alcohol}`] = [...classes[`Alcohol_${item.Alcohol}`], { ...item, gamma }]
      } else {
        classes[`Alcohol_${item.Alcohol}`] = [{ ...item, gamma }]
      }
    })
    const result = stasticCal(classes);
    return result;
  }

  // used to display the flavanoids mean, median and mode.
  dispFlavanoidsAnalysis = (data) => {
    const dispFlavanoidsmean = data?.map(item => {
      return <td key={item.flavanoidsCal.mean}>{item.flavanoidsCal.mean}</td>
    })
    const dispFlavanoidsmedian = data?.map(item => {
      return <td key={item.flavanoidsCal.median}>{item.flavanoidsCal.median}</td>
    })
    const dispFlavanoidsmode = data?.map(item => {
      return <td key={item.flavanoidsCal.mode}>{item.flavanoidsCal.mode}</td>
    })
    return (
      <React.Fragment>
        <tr>
          <td>Flavanoids mean</td>
          {dispFlavanoidsmean}
        </tr>
        <tr>
          <td>Flavanoids median</td>
          {dispFlavanoidsmedian}
        </tr>
        <tr>
        <td>Flavanoids mode</td>
          {dispFlavanoidsmode}
        </tr>
      </React.Fragment>
    )
  }


  // used to display the gamma mean, median and mode.
  dispGammaAnalysis = (data) => {
    const dispGammamean = data?.map(item => {
      return <td key={item.gammaCal.mean}>{item.gammaCal.mean}</td>
    })
    const dispGammamedian = data?.map(item => {
      return <td key={item.gammaCal.median}>{item.gammaCal.median}</td>
    })
    const dispGammamode = data?.map(item => {
      return <td key={item.gammaCal.mode}>{item.gammaCal.mode}</td>
    })
    return (
      <React.Fragment>
        <tr>
          <td>Gamma mean</td>
          {dispGammamean}
        </tr>
        <tr>
          <td>Gamma median</td>
          {dispGammamedian}
        </tr>
        <tr>
          <td>Gamma mode</td>
          {dispGammamode}
        </tr>
      </React.Fragment>
    )
  }

  render() {
    const analysis = this.calStatistic(wineData);
    const dispClasses = analysis?.map(item => {
      return <td key={item}>{item.class}</td>
    })
    return (
      <div>
        <h3>Flavanoids calculation</h3>
        <table>
          <tbody>
            <tr>
              <td>measure</td>
              {dispClasses}
            </tr>
            {this.dispFlavanoidsAnalysis(analysis)}
          </tbody>
        </table>
        <h3>Gamma calculation</h3>
        <table>
          <tbody>
            <tr>
              <td>measure</td>
              {dispClasses}
            </tr>
            {this.dispGammaAnalysis(analysis)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default StatsticalAnalysis