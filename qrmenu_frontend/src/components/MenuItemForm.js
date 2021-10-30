/** @format */

import { useContext, useRef, useState } from 'react';
import { Button, Form, Overlay, Popover } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { addCategory, addMenuItems, updateMenuItem } from '../apis';
import AuthContext from '../context/AuthContext';
import ImageDropZone from './ImageDropZone';

const MenuItemForm = ({ place, onDone, item = {} }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryFormShow, setCategoryFormShow] = useState(false);
  const [category, setCategory] = useState(item.category);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price || 0);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [isAvailable, setIsAvailable] = useState(
    item.is_available === undefined ? true : !!item.is_available
  );

  const target = useRef(null);
  const auth = useContext(AuthContext);

  const onAddCategory = async () => {
    const res = await addCategory(
      { name: categoryName, place: place.id },
      auth.token
    );

    if (res) {
      toast(`Category ${res.name} was created`, { type: 'success' });
      setCategory(res.id);
      setCategoryName('');
      setCategoryFormShow(false);
      onDone();
    }
  };

  const OnAddMenuItems = async () => {
    const res = await addMenuItems(
      {
        place: place.id,
        category,
        name,
        price,
        description,
        image,
        is_available: isAvailable,
      },
      auth.token
    );

    if (res) {
      toast(`Menu item ${res.name} was created succesfully`, {
        type: 'success',
      });
      setCategory('');
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setIsAvailable(true);
      onDone();
    }
  };

  const onUpdateMenuItem = async () => {
    const res = await updateMenuItem(
      item.id,
      {
        place: place.id,
        category,
        name,
        price,
        description,
        image,
        is_available: isAvailable,
      },
      auth.token
    );

    if (res) {
      toast(`Menu item ${res.name} updated successfully`, { type: 'success' });
      setCategory('');
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setIsAvailable(true);
      onDone();
    }
  };

  return (
    <div>
      {/* categories form */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected>Select Category</option>
            {place?.categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Control>
          <Button
            ref={target}
            variant="link"
            onClick={() => setCategoryFormShow(true)}
          >
            <RiPlayListAddFill size={25} />
          </Button>

          <Overlay
            show={categoryFormShow}
            target={target.current}
            placement="bottom"
            rootClose
            onHide={() => setCategoryFormShow(false)}
          >
            <Popover id="popover-contained">
              <Popover.Title as="h3">Category</Popover.Title>
              <Popover.Content>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
                <Button block variant="standard" onClick={onAddCategory}>
                  Add Category
                </Button>
              </Popover.Content>
            </Popover>
          </Overlay>
        </div>
      </Form.Group>
      {/* menu items form */}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <ImageDropZone value={image} onChange={setImage} />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Is Available"
          onChange={(e) => setIsAvailable(e.target.checked)}
          checked={isAvailable}
        />
      </Form.Group>
      <Button
        block
        variant="standard"
        onClick={item.id ? onUpdateMenuItem : OnAddMenuItems}
      >
        {item.id ? 'Update Menu Item' : '+ Add Menu Item'}
      </Button>
    </div>
  );
};

export default MenuItemForm;
