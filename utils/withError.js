import ErrorPage from 'next/error'

export withError = (Component) => class extends React.Component {
  
  static async getInitialProps(ctx) {
    const props = await Component.getInitialProps(ctx)
    const {statusCode} = ctx.res
    return {statusCode, ...props}
  }

  render() {
    const {statusCode} = this.props
    if(statusCode && statusCode !== 200) {
        return <ErrorPage statusCode={statusCode} />
    }
    return <Component {...this.props} />
  }
}
