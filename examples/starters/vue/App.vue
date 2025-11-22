<script setup>
import { useButtonClasses } from 'wafoo-vue-helpers';
import 'wafoo-css/dist/wafoo.css';

const btnClass = useButtonClasses({ variant: 'primary' });
</script>

<template>
  <div class="wf-container wf-p-4">
    <h1 class="wf-text-3xl wf-font-bold wf-mb-4">Wafoo Vue Starter</h1>
    <div class="wf-card-washi">
      <h2 class="wf-card__title">Welcome</h2>
      <p class="wf-card__text">This is a starter template using Vue and Wafoo CSS.</p>
      <button :class="[btnClass, 'wf-mt-4']">Get Started</button>
    </div>
  </div>
</template>
