const baseUrl = 'https://health.data.ny.gov/resource/gnzp-ekau.json'

const fetchAllCancer = async () => {
  const res = await fetch(baseUrl + `?$where=UPPER(ccs_diagnosis_description) like '%25CANCER%25'&$limit=10000`, {
    method: 'GET',
    headers: {
      'X-App-Token': `52qt6guHRHKFEmYLSbmAVVwEc`
    }
  })
  const json = await res.json()
  console.log(json)
  return json
}

const fetchBreastCancer = async () => {
  const res = await fetch(baseUrl + `?$limit=10000&ccs_diagnosis_description=Cancer of breast&gender=F`, {
    method: 'GET',
    headers: {
      'X-App-Token': `52qt6guHRHKFEmYLSbmAVVwEc`,
    }
  })
  const json = await res.json()
  console.log(json)
  return json
}
