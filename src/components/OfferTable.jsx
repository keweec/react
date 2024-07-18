import React from 'react';

const OfferTable = ({ data, setDataToEdit, deleteData, products }) => {
  const getProductName = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    return product ? product.name : 'Producto no encontrado';
  };

  const getProductPrice = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    return product ? product.price : 0;
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  return (
    <div>
      <h3>Tabla de Ofertas</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descuento (%)</th>
            <th>Precio con Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((offer) => (
              <tr key={offer.id}>
                <td>{getProductName(offer.productId)}</td>
                <td>{offer.discount}</td>
                <td>${calculateDiscountedPrice(getProductPrice(offer.productId), offer.discount).toFixed(0)}</td>
                <td>
                  <button onClick={() => setDataToEdit(offer)}>Editar</button>
                  <button onClick={() => deleteData(offer.id, 'oferta')}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay ofertas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferTable;
