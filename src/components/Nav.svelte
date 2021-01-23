<script>
  import { fade } from 'svelte/transition'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const handleNavigate = (payload) => {
    dispatch('handleNavigate', {
      fullpath: payload
    })
  }
</script>

<header class="w-full px-8 text-gray-700 body-font">
  <div class="container flex flex-col items-center justify-center py-5 mx-auto max-w-7xl md:flex-row">
    <a
    href="/"
    class="flex items-center inline-block font-sans text-3xl font-extrabold text-center text-black no-underline bg-transparent cursor-pointer focus:no-underline"
    on:click|preventDefault={() => handleNavigate('/')}>Covid<span style="color: #f73c00">.svlt</span></a>
  </div>
</header>