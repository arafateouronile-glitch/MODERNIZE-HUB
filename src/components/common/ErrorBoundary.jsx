import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Erreur React capturée:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Erreur</h1>
            <p className="text-text-main mb-6">
              Une erreur s'est produite lors du chargement de la page.
            </p>
            <details className="text-left bg-surface p-4 rounded-lg mb-4">
              <summary className="cursor-pointer font-bold mb-2">
                Détails de l'erreur
              </summary>
              <pre className="text-xs overflow-auto">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:bg-white transition-colors"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}



