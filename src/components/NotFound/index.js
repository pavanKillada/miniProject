import './index.css'

const NotFound = props => {
  const onHomePageBtn = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <div>
        <img
          className="not-found-img"
          src="https://ik.imagekit.io/pavanKillada/erroring_1notFound_1_.png?updatedAt=1680172681215"
          alt="not found"
        />
        <h1 className="not-found-head">Page Not Found</h1>
        <p className="not-found-para">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <button onClick={onHomePageBtn} type="button" className="home-btn">
          Home Page
        </button>
      </div>
    </div>
  )
}
export default NotFound
