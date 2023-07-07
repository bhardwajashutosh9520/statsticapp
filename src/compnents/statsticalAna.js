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
      return <tr key={item.flavanoidsCal.mean}><td>{item.flavanoidsCal.mean}</td></tr>
    })
    const dispFlavanoidsmedian = data?.map(item => {
      return <tr key={item.flavanoidsCal.median}><td>{item.flavanoidsCal.median}</td></tr>
    })
    const dispFlavanoidsmode = data?.map(item => {
      return <tr key={item.flavanoidsCal.mode}><td>{item.flavanoidsCal.mode}</td></tr>
    })
    return (
      <React.Fragment>
        <tr>
          <td>Flavanoids mean</td>
          <td>{dispFlavanoidsmean}</td>
        </tr>
        <tr>
          <td>Flavanoids median</td>
          <td>{dispFlavanoidsmedian}</td>
        </tr>
        <tr>
          <td>Flavanoids mode</td>
          <td>{dispFlavanoidsmode}</td>
        </tr>
      </React.Fragment>
    )
  }


  // used to display the gamma mean, median and mode.
  dispGammaAnalysis = (data) => {
    const dispGammamean = data?.map(item => {
      return <tr key={item.gammaCal.mean}><td>{item.gammaCal.mean}</td></tr>
    })
    const dispGammamedian = data?.map(item => {
      return <tr key={item.gammaCal.median}><td>{item.gammaCal.median}</td></tr>
    })
    const dispGammamode = data?.map(item => {
      return <tr key={item.gammaCal.mode}><td>{item.gammaCal.mode}</td></tr>
    })
    return (
      <React.Fragment>
        <tr>
          <td>Gamma mean</td>
          <td>{dispGammamean}</td>
        </tr>
        <tr>
          <td>Gamma median</td>
          <td>{dispGammamedian}</td>
        </tr>
        <tr>
          <td>Gamma mode</td>
          <td>{dispGammamode}</td>
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