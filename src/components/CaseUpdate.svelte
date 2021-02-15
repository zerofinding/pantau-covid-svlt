<script>
  import { fly } from 'svelte/transition'

  let scrollY
  let innerHeight

  $: isCase = innerHeight < 768
  ? (innerHeight < 500
    ? (scrollY > 741 ? true : false)
    : (scrollY > 275 ? true : false))
  : (scrollY > 275 ? true : false)

  export let covid
  
  let dt = new Date(covid.lastUpdate)

  let dtd = dt.getDate()
  let dtm = dt.toLocaleString('id-ID', { month: 'long' })
  let dty = dt.getFullYear()

  let tmh = ('0' + dt.getHours()).slice(-2)
  let tmm = ('0' + dt.getMinutes()).slice(-2)
  let tms = ('0' + dt.getSeconds()).slice(-2)
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight />

<section class="pt-20 pb-32" id="kasus">
  <div class="px-20 mx-auto max-w-6xl">
    <h2 class="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
      Kasus Di indonesia
    </h2>
    <p class="mb-10 text-lg text-gray-500">Update, <span style="font-weight: bold;">{ dtd } { dtm } { dty }</span> <span style="font-style: italic">{ tmh }:{ tmm }:{ tms }</span></p>
    {#if isCase}
    <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 lg:gap-x-24 gap-y-20"
    transition:fly="{{ y: 100, duration: 2000 }}">
      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4 text-red-600 bg-red-100 rounded-full">
          <img src="/assets/img/coronavirus.svg" alt="positif" title="positif" class="iconkasus" />
        </div>
        <h1 class="mb-2 text-base font-bold leading-tight text-gray-600 lg:text-lg kasus">{ covid.confirmed.toLocaleString("de-DE") }</h1>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900 lg:text-lg">Kasus positif</h3>
      </div>

      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4 text-green-600 bg-green-100 rounded-full">
          <img src="/assets/img/protection.svg" alt="sembuh" title="sembuh" class="iconkasus" />
        </div>
        <h1 class="mb-2 text-base font-bold leading-tight text-gray-600 lg:text-lg kasus">{ covid.recovered.toLocaleString("de-DE") }</h1>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900 lg:text-lg">Kasus sembuh</h3>
      </div>

      <div>
        <div class="flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-gray-300 rounded-full">
          <img src="/assets/img/death.svg" alt="meninggal" title="meninggal" class="iconkasus" />
        </div>
        <h1 class="mb-2 text-base font-bold leading-tight text-gray-600 lg:text-lg kasus">{ covid.deaths.toLocaleString("de-DE") }</h1>
        <h3 class="mb-2 text-base font-semibold leading-tight text-gray-900 lg:text-lg">Kasus meninggal</h3>
      </div>
    </div>
    {/if}
  </div>
</section>
