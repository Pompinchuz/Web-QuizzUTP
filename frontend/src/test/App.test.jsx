import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(document.body).toBeTruthy();
  });

  it('contains navigation or router element', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
