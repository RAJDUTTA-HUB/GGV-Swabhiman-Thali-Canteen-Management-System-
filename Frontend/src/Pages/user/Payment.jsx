import InsideHeader from '../user/InsideHeader'
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'
const Payment = () => {
  const { selectedProductId } = useContext(ProductContext);
  return (
    <div>
      <InsideHeader />
      
    </div>
  )
}

export default Payment
