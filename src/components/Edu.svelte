<script>
  import { fly, fade } from 'svelte/transition'
  import LazyImage from '../components/LazyImage.svelte'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const handleFooter = (payload) => {
    dispatch('handleFooter', {
      isBottom: payload
    })
  }

  let scrollY
  let innerHeight

  $: isEduc = innerHeight < 768
  ? (innerHeight < 500
    ? (scrollY > 2150 ? (handleFooter(true), true) : false)
    : (scrollY > 844 ? (handleFooter(true), true) : false))
  : (scrollY > 846 ? (handleFooter(true), true) : false)
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight />

<div id="edukasi">
  <section class="py-20">
    <div class="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
      <div class="flex flex-wrap items-center -mx-3">
        <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
          <div class="w-full lg:max-w-md">
            <h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">
              Cegah covid dengan menggunakan 3M.
            </h2>
            <p class="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
              Penyebaran virus Corona atau COVID-19 di Indonesia harus ditekan
              semaksimal mungkin. Salah satu cara utamanya adalah dengan
              menerapkan perilaku hidup disiplin. Maka, selalu #ingatpesanibu
              dengan melakukan langkah 3M sebagai upaya mencegah sekaligus
              memutus rantai penularan COVID-19.
            </p>
            <ul>
            {#if isEduc}
              <li
              class="flex items-center py-2 space-x-4 xl:py-3"
              transition:fly="{{ y: 20, duration: 1800 }}">
                <img src="/assets/img/masker.svg" class="eduimg" alt="some title" title="some title" />
                <span class="font-medium text-gray-500">Memakai masker</span>
              </li>
              <li
              class="flex items-center py-2 space-x-4 xl:py-3"
              transition:fly="{{ y: 30, duration: 2200 }}">
                <img src="/assets/img/hand-wash.svg" class="eduimg" alt="some title" title="some title" />
                <span class="font-medium text-gray-500">Mencuci tangan</span>
              </li>
              <li
              class="flex items-center py-2 space-x-4 xl:py-3"
              transition:fly="{{ y: 50, duration: 2600 }}">
                <img src="/assets/img/social-distance.svg" class="eduimg" alt="some title" title="some title" />
                <span class="font-medium text-gray-500">Menjaga jarak dan menghindari kerumunan</span>
              </li>
            {/if}
            </ul>
          </div>
        </div>

        <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
          {#if isEduc}
          <div in:fade="{{ delay:100, duration:500}}">
            <LazyImage
            attrclass="mx-auto sm:max-w-sm lg:max-w-full"
            src="/assets/img/3-m.svg"
            placeholder="/assets/some.png"
            alt="some title"
            title="some title"
            isAria="true" />
          </div>
          {/if}
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  #edukasi{
    min-height: 650px;
  }
</style>
