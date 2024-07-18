import React from 'react';

const OfferTable = ({ data, setDataToEdit, deleteData, products }) => {
  const getProductName = (id) => {
    const product = products.find((product) => product.id === Number(id));
    return product ? product.name : "Producto no encontrado";
  };

  return (
    <div>
      <h3>Tabla de Ofertas</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descuento (%)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <tr key={el.id}>
                <td>{getProductName(el.productId)}</td>
                <td>{el.discount}</td>
                <td>
                  <button onClick={() => setDataToEdit(el)}>Editar</button>
                  <button onClick={() => deleteData(el.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferTable;
