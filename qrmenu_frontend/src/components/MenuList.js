/** @format */

import styled from 'styled-components';
import MenuItem from './MenuItem';

const Place = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

const MenuList = ({ place, shoppingCart, onOrder }) => {
  return (
    <>
      <Place>
        <img src={place.image} width={100} height={100} alt={place.name} />
        <h3>
          <strong>{place.name}</strong>
        </h3>
      </Place>
      {place?.categories
        ?.filter(
          (category) => category.menu_items.filter((i) => i.is_available).length
        )
        .map((category) => (
          <div key={category.id} className="mt-5">
            <h4 className="mb-4">
              <strong>{category.name}</strong>
            </h4>
            {category.menu_items
              .filter((i) => i.is_available)
              .map((i) => (
                <MenuItem
                  key={i.id}
                  item={{
                    ...i,
                    quantity: shoppingCart[i.id]?.quantity,
                  }}
                  onOrder={onOrder}
                />
              ))}
          </div>
        ))}
    </>
  );
};

export default MenuList;
