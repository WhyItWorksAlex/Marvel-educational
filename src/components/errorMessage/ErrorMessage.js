import img from './error.gif'

const ErrorMessage = () => {
  return (
    <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contatin', margin: '0 auto'}} src={img} alt='error' />

    // <img src={process.env.PUBLIC_URL + '/error.gif'} alt='error' /> такую конструкцию используем когда данные лежат в Public
  )
}

export default ErrorMessage;