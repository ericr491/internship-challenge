const groupLikeCancers = (cancerArray) => {
  const reducer = (object, currentPatient) => {
    const { ccs_diagnosis_description } = currentPatient
    return object[ccs_diagnosis_description] ?
      {
        ...object,
        [ccs_diagnosis_description]: [...object[ccs_diagnosis_description], currentPatient],
      }
      :
      {
        ...object,
        [ccs_diagnosis_description]: [currentPatient],
      }
  }

  // groups every unique cancer together
  // type object
  return cancerArray.reduce(reducer, {})
}

const buildBar = async () => {
  const response = await fetchAllCancer()

  const groupByUniqueCancers = groupLikeCancers(response)

  // remove everything except total cost from the patients
  for (propety in groupByUniqueCancers) {
    groupByUniqueCancers[propety] = groupByUniqueCancers[propety]
      .map(patient => patient.total_costs)
  }

  const cancerNameAndCost = [
  ]

  for (propety in groupByUniqueCancers) {
    cancerNameAndCost.push([
      propety,
      groupByUniqueCancers[propety]
        .reduce((totalSum, currentVal) => totalSum + Number(currentVal), 0)
      / groupByUniqueCancers[propety].length,
    ])
  }

  let sortedCancerNameAndCost

  if (document.getElementById('checkbox').checked) {
    sortedCancerNameAndCost = cancerNameAndCost.sort((cancer1, cancer2) => {
      return cancer1[1] - cancer2[1]
    })
  } else {
    sortedCancerNameAndCost = cancerNameAndCost
      .sort((cancer1, cancer2) => {
        if (cancer1[0] > cancer2[0]) return 1
        else if (cancer1[0] < cancer2[0]) return -1
        else return 0
      })
  }
  console.log(sortedCancerNameAndCost)

  const data = [
    {
      x: sortedCancerNameAndCost.map(tuple => tuple[0]),
      y: sortedCancerNameAndCost.map(tuple => tuple[1]),
      type: 'bar',
      name: 'type of cancer',
    }
  ]

  const layout = {
    title: 'Average cost of each cancer type',
    xaxis: {
      title: 'Cancer Types',
    },
    yaxis: {
      title: 'Cost in USD',
    },
  }

  Plotly.newPlot('costBarGraph', data, layout)
}
