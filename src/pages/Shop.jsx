import { 
  Col,
   Container, 
   Row ,
   Form,
  } from "react-bootstrap";
import { Fragment, useState ,useEffect} from "react";

import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { transformProductData } from '../utils/productTransformer'
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";


const Shop = () => {
  const [filterList, setFilterList] = useState([]);
  const [orginalList, setOrginalList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e) => {
  
    setSelectedOption(e.target.value);

    if(e.target.value == ''){
   
    fetchProducts();
      setFilterList([...orginalList])
    }

    setFilterList(
      orginalList.filter((item)=>{
        return item.category === e.target.value
      })
    )
  };

  useWindowScrollToTop();


  useEffect(() => {
  
    fetchProducts();

  }, []);

  const fetchProducts = async () => {
    console.log("121111")
    try {
      const response = await fetch('http://localhost:8009/products/', {
        headers: {
          
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const data = await response.json();
  
      console.log("getProd", data);
  
      const newProducts = data.map(product => transformProductData(product));
      setOrginalList(newProducts);
      setFilterList(newProducts)
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };


  return (
    <Fragment>
      <NavBar></NavBar>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
            <Form.Group as={Col} controlId="formPlaintextEmail">
            <Form.Label column sm="2" style={{ }}>
   Category
</Form.Label>

      <Col sm="10" >
        <Form.Control
          as="select"
          value={selectedOption}
          onChange={handleChange}
          
        >
          <option value="" >Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              
            </option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};

const options = [
  { value: "FICTION", label: "Fiction" },
  { value: "NON_FICTION", label: "Non-Fiction" },
  { value: "MYSTERY_THRILLER", label: "Mystery & Thriller" },
  { value: "ROMANCE", label: "Romance" },
  { value: "PSYCHOLOGY", label: "Psychology" },
  { value: "PARENTING_FAMILY", label: "Parenting & Family" },
  { value: "POETRY", label: "Poetry" },
];



export default Shop;
