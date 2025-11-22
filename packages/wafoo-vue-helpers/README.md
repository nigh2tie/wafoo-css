# Wafoo Vue Helpers (Alpha)

Vue composables and utilities for Wafoo CSS.

## Status
**Alpha Version**: This package is currently in early development. It is not yet published to npm. Please install it locally or via git dependency for testing purposes.


## Installation

```bash
npm install wafoo-vue-helpers
```

## Usage

### Composables

```vue
<script setup>
import { useButtonClasses } from 'wafoo-vue-helpers';

const props = defineProps(['variant']);
const buttonClass = useButtonClasses(props);
</script>

<template>
  <button :class="buttonClass">Click Me</button>
</template>
```

### Utilities

```js
import { cx } from 'wafoo-vue-helpers';

const className = cx('wf-btn', isActive && 'active');
```
