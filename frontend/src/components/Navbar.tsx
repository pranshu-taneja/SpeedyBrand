import FormModal from './FormModal'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navBar-Wrapper">
      <div className="NavRoutes">
          <a href=''>All</a>
          <a href=''>Custom</a>
          <a href=''>ICP</a>
          <a href=''>Mission</a>
          <a href=''>Product</a>
      </div>
      <FormModal></FormModal>
    </div>
  )
}

export default Navbar