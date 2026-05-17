import { Link } from "react-router-dom"
import "./ViewCartButton.css"

export const ViewCartButton = () => {
  return (
    <Link to={"/cart"} className='btn-view-cart'>
      ดูตะกร้า →
    </Link>
  )
}

export default ViewCartButton
