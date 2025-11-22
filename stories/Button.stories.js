export default {
  title: 'Components/Button',
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'outline', 'ghost', 'gradient'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

const Template = ({ label, variant, size }) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.className = ['wf-btn', `wf-btn-${variant}`, size ? `wf-btn-${size}` : ''].join(' ');
  return btn;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  variant: 'primary',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Button',
  variant: 'outline',
};

export const Gradient = Template.bind({});
Gradient.args = {
  label: 'Button',
  variant: 'gradient',
};
