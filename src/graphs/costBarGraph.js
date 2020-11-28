const buildBar = async () => {
  const response = await fetchAllCancer()

  const reducer = (object, currentPatient) => {
    const { total_costs, ccs_diagnosis_description } = currentPatient
    return object[ccs_diagnosis_description] ?
      {
        ...object,
        [ccs_diagnosis_description]: [...object[ccs_diagnosis_description], total_costs],
      }
      :
      {
        ...object,
        [ccs_diagnosis_description]: [total_costs],
      }
  }

  // groups every unique cancer together
  // type object
  const groupByUniqueCancers = response.reduce(reducer, {})

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
      histfunc: 'sum',
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

document.addEventListener('DOMContentLoaded', () => {
  buildBar()
})