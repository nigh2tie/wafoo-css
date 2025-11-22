import { computed } from 'vue';

/**
 * Utility to join class names conditionally (Simple version)
 * @param  {...any} args - Class names
 * @returns {string}
 */
export function cx(...args) {
  return args
    .flat()
    .filter(x => x !== null && x !== undefined && typeof x !== 'boolean')
    .join(' ')
    .trim();
}

/**
 * Composable for Button classes
 * @param {Object} props 
 * @returns {import('vue').ComputedRef<string>}
 */
export function useButtonClasses(props) {
  return computed(() => {
    return cx(
      'wf-btn',
      props.variant && `wf-btn-${props.variant}`,
      props.size && `wf-btn-${props.size}`,
      props.outline && 'wf-btn-outline',
      props.ghost && 'wf-btn-ghost',
      props.class
    );
  });
}

/**
 * Composable for Card classes
 * @param {Object} props 
 * @returns {import('vue').ComputedRef<string>}
 */
export function useCardClasses(props) {
  return computed(() => {
    return cx('wf-card', props.class);
  });
}

/**
 * Vue Plugin to register global helpers if needed
 */
export default {
  install: (app) => {
    app.config.globalProperties.$wf = {
      cx
    };
  }
};
