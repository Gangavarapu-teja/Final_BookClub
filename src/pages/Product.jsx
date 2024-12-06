import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { transformProductData } from "../utils/productTransformer";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";
const Product = () => {
  const { id } = useParams();

  const [newProducts, setNewProducts] = useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);
  const [selectedProduct, setSelectedProduct] = useState(
    newProducts.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
   
  }, []);

  const fetchProducts =  async () => {
    try {
      const response = await fetch(`http://localhost:8009/products`); 
      const data = await response.json();
      const newProducts = data.map(product => transformProductData(product));
      setNewProducts(newProducts)
      setRelatedProducts(newProducts)
      setSelectedProduct(
        newProducts.filter((item) => parseInt(item.id) === parseInt(id))[0]
      );
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useWindowScrollToTop();

  return (
    <Fragment>
      <NavBar></NavBar>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
      <Footer></Footer>
    </Fragment>
  );
};

export default Product;
