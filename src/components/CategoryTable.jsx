import React from 'react';

const CategoryTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h3>Tabla de Categorías</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>
                  <button onClick={() => setDataToEdit(el)}>Editar</button>
                  <button onClick={() => deleteData(el.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
