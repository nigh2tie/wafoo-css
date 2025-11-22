export default {
  title: 'Components/Card',
};

export const Standard = () => `
  <div class="wf-card" style="max-width: 300px;">
    <h3 class="wf-card__title">Card Title</h3>
    <p class="wf-card__text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="wf-btn wf-btn-primary">Go somewhere</button>
  </div>
`;

export const Washi = () => `
  <div class="wf-card-washi" style="max-width: 300px;">
    <h3 class="wf-card__title">Washi Card</h3>
    <p class="wf-card__text">This card has a traditional Japanese paper texture and decorative corners.</p>
    <button class="wf-btn wf-btn-outline">Action</button>
  </div>
`;
