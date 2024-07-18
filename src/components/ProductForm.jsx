import React, { useState, useEffect } from 'react';

const initialForm = {
  name: '',
  price: '',
  categoryId: '',
  id: null,
};

const ProductForm = ({ createData, updateData, dataToEdit, setDataToEdit, categories }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      alert('Datos incompletos');
      return;
    }

    form.price = parseFloat(form.price); // Convertir el precio a número

    if (form.id === null) {
      createData(form, 'producto');
    } else {
      updateData(form, 'producto');
    }

    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          onChange={handleChange}
          value={form.price}
        />
        <select name="categoryId" onChange={handleChange} value={form.categoryId}>
          <option value="">Seleccione una Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default ProductForm;
