import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
      switch(error.status) {
        case 404: return <NotFound />
        default: return <Generic error={error}/>
      }
    } else {
      return <Generic error={error}/>
    }
};

function NotFound() {
  return <div>404 Not Found</div>;
}


function Generic(props: any) {
  const { error } = props;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{JSON.stringify(error)}</i>
      </p>
    </div>
  )
}

export default ErrorPage;