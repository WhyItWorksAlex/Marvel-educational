import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false
  }

  // Эта штука умеет обновлять только State и больше ни чего
  // static getDerivedStateFromError(error) {
  //   return {error: true}
  // }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    this.setState({
      error: true
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;