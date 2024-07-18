import React from 'react';

const ProductTable = ({ data, setDataToEdit, deleteData, categories }) => {
  const getCategoryName = (id) => {
    const category = categories.find((category) => category.id === parseInt(id));
    return category ? category.name : "Categoría no encontrada";
  };

  return (
    <div>
      <h3>Tabla de Productos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{getCategoryName(el.categoryId)}</td>
                <td>
                  <button onClick={() => setDataToEdit(el)}>Editar</button>
                  <button onClick={() => deleteData(el.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
