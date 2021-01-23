<script>
  // https://github.com/alexstaroselsky/svelte-lazy-image
  import { onMount } from 'svelte'
  
  let observerCallback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intersected = true;
        observer.unobserve(imgElement);
      }
    });
  };

  export let placeholder;
  export let src;
  export let alt;
  export let title;
  export let attrclass;
  export let isAria;

  let imgElement;
  let path;
  let observer;
  let intersected = false;
  let loaded = false;

  $: path = intersected ? src : placeholder;

  onMount(() => {
    observer = new IntersectionObserver(observerCallback)
    observer.observe(imgElement);
    return () => {
      observer.unobserve(imgElement);
    };
  });

  const handleLoad = () => {
    if (!loaded && path === src) {
      loaded = true;
    }
  }
</script>

<img
src={path}
{alt}
{title}
on:load={handleLoad}
bind:this={imgElement}
class="{attrclass} svelte-lazy-image"
class:svelte-lazy-image--loaded={loaded}
aria-hidden="{isAria === 'true' ? 'true' : 'false'}"
width="90%"
height="100%"
loading="lazy" />
