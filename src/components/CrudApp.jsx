import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import ProductForm from './ProductForm';
import OfferForm from './OfferForm';
import CategoryTable from './CategoryTable';
import ProductTable from './ProductTable';
import OfferTable from './OfferTable';

const CrudApp = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedOffers = JSON.parse(localStorage.getItem('offers')) || [];

    setCategories(storedCategories);
    setProducts(storedProducts);
    setOffers(storedOffers);

    console.log('Loaded Categories from localStorage:', storedCategories);
    console.log('Loaded Products from localStorage:', storedProducts);
    console.log('Loaded Offers from localStorage:', storedOffers);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
      console.log('Saving Categories to localStorage:', categories);
    }
  }, [categories]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      console.log('Saving Products to localStorage:', products);
    }
  }, [products]);

  useEffect(() => {
    if (offers.length > 0) {
      localStorage.setItem('offers', JSON.stringify(offers));
      console.log('Saving Offers to localStorage:', offers);
    }
  }, [offers]);

  const createData = (data, type) => {
    data.id = Date.now();
    switch (type) {
      case 'categoria':
        setCategories([...categories, data]);
        break;
      case 'producto':
        setProducts([...products, data]);
        break;
      case 'oferta':
        setOffers([...offers, data]);
        break;
      default:
        break;
    }
  };

  const updateData = (data, type) => {
    switch (type) {
      case 'categoria':
        setCategories(categories.map((el) => (el.id === data.id ? data : el)));
        break;
      case 'producto':
        setProducts(products.map((el) => (el.id === data.id ? data : el)));
        break;
      case 'oferta':
        setOffers(offers.map((el) => (el.id === data.id ? data : el)));
        break;
      default:
        break;
    }
  };

  const deleteData = (id, type) => {
    switch (type) {
      case 'categoria':
        setCategories(categories.filter((el) => el.id !== id));
        break;
      case 'producto':
        setProducts(products.filter((el) => el.id !== id));
        break;
      case 'oferta':
        setOffers(offers.filter((el) => el.id !== id));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <button className="button" onClick={() => window.location.href = "/html/catalogo.html"}>Ir al Catálogo</button>
      <CategoryForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CategoryTable
        data={categories}
        setDataToEdit={setDataToEdit}
        deleteData={(id) => deleteData(id, 'categoria')}
      />
      <ProductForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        categories={categories}
      />
      <ProductTable
        data={products}
        setDataToEdit={setDataToEdit}
        deleteData={(id) => deleteData(id, 'producto')}
        categories={categories}
      />
      <OfferForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        products={products}
      />
      <OfferTable
        data={offers}
        setDataToEdit={setDataToEdit}
        deleteData={(id) => deleteData(id, 'oferta')}
        products={products}
      />
    </div>
  );
};

export default CrudApp;
