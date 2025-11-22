import { Button, Card } from 'wafoo-react-helpers';
import 'wafoo-css/dist/wafoo.css';

function App() {
  return (
    <div className="wf-container wf-p-4">
      <h1 className="wf-text-3xl wf-font-bold wf-mb-4">Wafoo React Starter</h1>
      <Card className="wf-card-washi">
        <h2 className="wf-card__title">Welcome</h2>
        <p className="wf-card__text">This is a starter template using React and Wafoo CSS.</p>
        <Button variant="primary" className="wf-mt-4">Get Started</Button>
      </Card>
    </div>
  );
}

export default App;
