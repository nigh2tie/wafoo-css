# Wafoo React Helpers (Alpha)

React component wrappers and utilities for Wafoo CSS.

## Status
**Alpha Version**: This package is currently in early development. It is not yet published to npm. Please install it locally or via git dependency for testing purposes.


## Installation

```bash
npm install wafoo-react-helpers
```

## Usage

### Components

```jsx
import { Button, Card, Badge } from 'wafoo-react-helpers';

function App() {
  return (
    <Card>
      <Button variant="primary">Click Me</Button>
      <Badge variant="success">New</Badge>
    </Card>
  );
}
```

### Utilities

```jsx
import { cx } from 'wafoo-react-helpers';

const className = cx('wf-btn', isActive && 'active');
```
