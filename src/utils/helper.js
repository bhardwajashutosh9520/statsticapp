// used to calculate mean on the basis of incoming data.
const calMean = (data) => {
  const sum = data?.reduce((sum, num) => {
    return (sum += num);
  }, 0);
  const mean = sum / data.length;
  return mean.toFixed(3);
}

// used to calculate median on the basis of incoming data.
const calMedian = (data) => {
  const mid = Math.floor(data.length / 2);
  const median = data?.length % 2 !== 0 ? data[mid] : (data[mid - 1] + data[mid]) / 2;
  return median.toFixed(3);
}

// used to calculate mode on the basis of incoming data.
const calMode = (data) => {
  const valueWithCount = {};
  data.forEach(value => {
    if (valueWithCount[value]) {
      valueWithCount[value] = valueWithCount[value] + 1;
    } else {
      valueWithCount[value] = 1;
    }
  })
  let mode = data[0];
  data.forEach(item => {
    if (valueWithCount[item] > valueWithCount[mode]) {
      mode = item;
    }
  })
  return mode;
}

/**
 * 
 * @param {*} data It will take object of classes with there corresponding values. 
 * on the basis of values we are calculating mean media and mode for flavanoids and gamma and return in the form of classes with corresponding data. 
 */
const stasticCal = (data) => {
  const result = Object.keys(data).map(item => {
    const flavanoidsStaData = data[item].map(values => {
      return Number(values.Flavanoids);
    })
    const gammaStaData = data[item].map(values => {
      return Number(values.gamma);
    })

    const flavanoidsSortData = flavanoidsStaData?.sort((a, b) => a - b);
    const flavanoidsMean = calMean(flavanoidsSortData);
    const flavanoidsMedian = calMedian(flavanoidsSortData);
    const flavanoidsMode = calMode(flavanoidsSortData);

    const gammaSortData = gammaStaData?.sort((a, b) => a - b);
    const gammaMean = calMean(gammaSortData);
    const gammaMedian = calMedian(gammaSortData);
    const gammaMode = calMode(gammaSortData);

    return {
      class: item,
      flavanoidsCal: { mean: flavanoidsMean, median: flavanoidsMedian, mode: flavanoidsMode },
      gammaCal: { mean: gammaMean, median: gammaMedian, mode: gammaMode },
    }
  })
  return result;
}

export { stasticCal };