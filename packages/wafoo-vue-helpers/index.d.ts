import { ComputedRef } from 'vue';

export function cx(...args: any[]): string;

export interface ButtonProps {
  variant?: string;
  size?: string;
  outline?: boolean;
  ghost?: boolean;
  class?: string;
}

export function useButtonClasses(props: ButtonProps): ComputedRef<string>;

export interface CardProps {
  class?: string;
}

export function useCardClasses(props: CardProps): ComputedRef<string>;

declare const _default: {
  install: (app: any) => void;
};

export default _default;
