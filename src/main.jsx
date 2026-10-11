import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

/**
 * ErrorBoundary — catches render-time React errors and shows the message
 * on-screen instead of a blank page, making future crashes immediately visible.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message ?? String(this.state.error);
      return (
        <div style={{
          minHeight: '100vh',
          background: '#FBF7F1',
          color: '#1F1612',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          padding: '2rem',
          gap: '1rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, color: '#A8612E' }}>☕</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#A8612E' }}>
            React crashed — something went wrong
          </h1>
          <pre style={{
            background: '#EADBC8',
            border: '1px solid #C9A27E',
            borderRadius: 12,
            padding: '1.25rem 1.5rem',
            maxWidth: 700,
            width: '100%',
            overflowX: 'auto',
            fontSize: '0.8rem',
            textAlign: 'left',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {msg}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '0.5rem',
              padding: '0.6rem 1.6rem',
              borderRadius: 999,
              background: '#A8612E',
              color: '#FBF7F1',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
);
