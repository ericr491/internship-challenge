const buildPlot = async () => {
  const breastCancerPatientsArray = await fetchBreastCancer()

  const filtered = breastCancerPatientsArray.map(patient => patient.age_group)

  const ages = [
    '0 to 17',
    '18 to 29',
    '30 to 49',
    '50 to 69',
    '70 or Older',
  ]

  // counts the number of occurences for each age group
  let count = [
  ]

  ages.forEach(age_group => {
    count.push(
      filtered.reduce((count, age) => {
        if (age === age_group)
          return count + 1
        return count
      }, 0)
    )
  })

  if (document.getElementById('checkbox2').checked) {
    count = count.map(total => total / filtered.length)
  }

  console.log(count)

  const data = [
    {
      histfunc: 'sum',
      x: ages,
      y: count,
      type: 'histogram',
      name: 'num of patients',
    }
  ]

  const layout = {
    title: 'Frequency of Breast Cancer among age groups',
    xaxis: {
      title: 'Age Groups',
    },
    yaxis: {
      title: 'Frequency',
    },
  }

  Plotly.newPlot('breastCancerHistogram', data, layout)
}


window.onload = async () => {
  await buildPlot()
  await buildBar()
  await buildStackedBar()
}