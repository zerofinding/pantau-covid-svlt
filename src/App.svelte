<script>
  import { fade } from 'svelte/transition'
  // import Loadable from 'svelte-loadable'

  let url = ''
  import { Router, navigate } from 'svelte-routing'
  
  import Nav from './components/Nav.svelte'
  import Heroes from './components/Heroes.svelte'
  import Case from './components/Case.svelte'
  import Edu from './components/Edu.svelte'
  import Footer from './components/Footer.svelte'

  const handleNavigate = (event) => {
    navigate(event.detail.fullpath, { replace: true })
  }

  const handleFooter = (event) => {
    isBottom = event.detail.isBottom
  }

  let isBottom = false
</script>

<Router {url}>
  <div id="app">
    <div id="nav">
      <Nav on:handleNavigate={handleNavigate} />
    </div>
    <div class="heroes">
      <Heroes />
      <!-- <Loadable loader={() => import('./components/Heroes.svelte')} /> -->
    </div>
    <div class="case">
      <Case />
      <!-- <Loadable loader={() => import('./components/Case.svelte')} /> -->
    </div>
    <div class="edu">
      <Edu on:handleFooter={handleFooter} />
      <!-- <Loadable loader={() => import('./components/Edu.svelte')} /> -->
    </div>
    
    {#if isBottom}
    <div
    class="footer"
    in:fade="{{ delay:50, duration:500}}">
      <Footer on:handleNavigate={handleNavigate} />
    </div>
    {/if}
  </div>
</Router>