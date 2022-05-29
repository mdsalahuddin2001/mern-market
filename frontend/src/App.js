import Product from './components/product/Product';
import data from './data';

function App() {
  return (
    <>
      <section className="section">
        <div className="section-center">
          <h2>Featured Products</h2>
          {data.products.map((product) => (
            <Product {...product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
