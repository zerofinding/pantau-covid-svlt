<script>
  import CaseUpdate from './CaseUpdate.svelte'

  let covid = {
    confirmed: 951651,
    recovered: 772790,
    deaths: 27203,
    lastUpdate: '2021-01-21T16:22:31.000Z'
  }

  let data = handleData()
  async function handleData(){
    const res = await fetch("https://covid19.mathdro.id/api/countries/ID")
    const datas = await res.json()

    if(res.ok){
      covid.confirmed = datas.confirmed.value
      covid.recovered = datas.recovered.value
      covid.deaths = datas.deaths.value
      covid.lastUpdate = datas.lastUpdate

      return covid
    }else{
      throw new Error(data)
    }
  }
</script>

{#await data}
<CaseUpdate {covid} />
{:then datacovid}
<CaseUpdate covid={datacovid} />
{/await}