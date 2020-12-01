const buildStackedBar = async () => {
  const cancerArray = await fetchAllCancer()

  const groupByUniqueCancers = groupLikeCancers(cancerArray)

  for (property in groupByUniqueCancers) {
    groupByUniqueCancers[property] = groupByUniqueCancers[property]
      .map(patient => patient.race)

    const reducer = (object, race) => {
      if (object[race])
        object[race] = object[race] + 1
      else
        object[race] = 1
      return object
    }

    groupByUniqueCancers[property] = groupByUniqueCancers[property].reduce(reducer, {})
  }
  console.log(groupByUniqueCancers)

  const data = [
    trace('White', groupByUniqueCancers),
    trace('Black/African American', groupByUniqueCancers),
    trace('Multi-racial', groupByUniqueCancers),
    trace('Other Race', groupByUniqueCancers)
  ]

  const layout = {
    barmode: 'stack',
    title: 'Frequency of Cancer By Race',
    xaxis: {
      title: 'Cancer Types',
    },
    yaxis: {
      title: 'Frequency',
    },
  }

  Plotly.newPlot('raceBarGraph', data, layout)
}

const keys = (object) => {
  const array = []
  for (property in object) {
    array.push(property)
  }
  return array
}

const values = (object, value) => {
  const values = []
  for (property in object) {
    values.push(object[property][value] || 0)
  }
  return values
}

const trace = (race, cancerObject) => ({
  x: keys(cancerObject),
  y: values(cancerObject, race),
  type: 'bar',
  name: race,
})