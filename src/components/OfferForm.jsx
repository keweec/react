import React, { useState, useEffect } from 'react';

const OfferForm = ({ createData, updateData, dataToEdit, setDataToEdit, products }) => {
  const initialForm = {
    productId: '',
    discount: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productId || !form.discount) {
      alert('Datos incompletos');
      return;
    }

    const product = products.find(prod => prod.id === parseInt(form.productId));
    if (product) {
      const priceWithDiscount = product.price * (1 - parseInt(form.discount) / 100);
      const offerData = {
        ...form,
        discount: parseInt(form.discount),
        priceWithDiscount: priceWithDiscount,
      };

      if (dataToEdit) {
        updateData(offerData, 'oferta');
      } else {
        createData(offerData, 'oferta');
      }
      handleReset();
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? 'Editar' : 'Agregar'} Oferta</h3>
      <form onSubmit={handleSubmit}>
        <select name="productId" onChange={handleChange} value={form.productId}>
          <option value="">Seleccionar Producto</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="discount"
          placeholder="Descuento (%)"
          onChange={handleChange}
          value={form.discount}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default OfferForm;
