import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import { InputGroupComponent } from "./components/inputGroup";
import { citysInterface } from "../../interface/citysInterface";
import userDataService from "../../services/user-data.service";

interface dataInterface {
  _id: string;
  name: string;
  citys: citysInterface[];
}

export function HomeComponent() {
  const [data, setData] = useState<dataInterface[]>([
    {
      _id: "1a",
      name: "grupo 1",
      citys: [
        { id: "1", cityName: "Brasilia", state: "DF" },
        { id: "2", cityName: "Rio de janeiro", state: "RJ" },
      ],
    },
    {
      _id: "2b",
      name: "grupo 2",
      citys: [
        { id: "3", cityName: "São Paulo", state: "SP" },
        { id: "4", cityName: "Belo Horizonte", state: "MG" },
      ],
    },
  ]);
  const [editData, setEditData] = useState<dataInterface>({} as dataInterface);
  const [loading, setLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState<{ name: string; email: string }>();

  const removeItem = async (id: string) => {
    setLoading(true);
    setData(prevState => {
      return prevState.filter(item => item._id !== id);
    });
    if (id.length > 5) {
      await userDataService.removeById(id);
    }
    await fetchData();
    setLoading(false);
  };
  const handleClose = async () => {
    setLoading(true);
    await handleSave({ ...editData });

    setshowModal(false);
    setLoading(false);
  };

  const handleShow = (id: string) => {
    const index = data.findIndex(item => item._id === id);
    console.log(id, index);

    setEditData(data[index]);
    setshowModal(true);
  };

  const handleSave = async (item: dataInterface) => {
    setLoading(true);
    setData(prevState => {
      const index = prevState.findIndex(oldItem => oldItem._id === item._id);
      const newState = [...prevState];
      newState[index] = item;
      return newState;
    });
    if (item._id.length < 5) {
      await userDataService.registerGroup({
        name: item.name,
        citys: item.citys,
      });
    } else {
      await userDataService.updateGroup(item);
    }
    await fetchData();
    setLoading(false);
  };

  const handleUpdate = (item: citysInterface) => {
    setEditData(prevState => {
      if (prevState) {
        const index = prevState.citys.findIndex(
          oldItem => oldItem.id === item.id
        );
        const newState = [...prevState.citys];
        newState[index] = item;
        return { ...prevState, citys: newState };
      }
      return prevState;
    });
  };

  const handleAddItem = () => {
    let oldData = data;
    oldData.push({
      _id: count.toFixed(0),
      name: "Novo grupo" + count.toFixed(0),
      citys: [{ id: "1", cityName: "", state: "" }],
    });
    setData(oldData);
    setCount(count + 1);
  };

  const handlerAddNewCity = () => {
    setEditData(prevState => {
      if (prevState && prevState.citys.length < 5) {
        const newState = [...prevState.citys];
        newState.push({
          id: Number(count + prevState.citys.length + 1).toFixed(0),
          cityName: "",
          state: "",
        });
        return { ...prevState, citys: newState };
      }
      return prevState;
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data, count]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = await userDataService.getUserInfo();
      const result = await userDataService.getGroupInfo();
      console.log(result);

      setData(result as unknown as dataInterface[]);
      setUserData(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section>
      <div
        className={
          "d-flex flex-row aling-item-center justify-content-center my-3"
        }
      >
        <h1>Grupos de Cidades</h1>
      </div>
      <h4 className={"px-5"}>Ola novamete, {userData?.name}</h4>
      <Container>
        {loading ? (
          <Spinner animation='border' variant='primary' />
        ) : (
          <Row className={"justify-content-between mt-2"}>
            {data?.map(item => (
              <Col
                xs={12}
                md={5}
                key={item._id}
                className={"card bg-light mt-md-0 mt-4 p-3 pt-2"}
              >
                <h2>{item.name}</h2>
                {item.citys.map(city => (
                  <div key={city.id} className={"cityLine"}>
                    <div className={"dot"}></div>
                    <p className={"px-2"}>
                      {city.cityName} - {city.state}
                    </p>
                  </div>
                ))}
                <Row className={"justify-content-around"}>
                  <Button
                    variant='primary'
                    className={"col-md-3 col-10"}
                    onClick={() => handleShow(item._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant='danger'
                    className={"col-md-3 col-10  mt-md-0 mt-3"}
                    onClick={() => removeItem(item._id)}
                  >
                    Excluir
                  </Button>
                </Row>
              </Col>
            ))}
          </Row>
        )}
        <Row className={"justify-content-center mt-5"}>
          <Button
            variant='primary'
            className={"col-md-6 col-10"}
            onClick={() => handleAddItem()}
          >
            Adicionar mais um grupo
          </Button>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{"Editar " + editData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className={"form-group mb-4"}>
              <label htmlFor='name'>Nome do Grupo</label>
              <input
                type='text'
                className='form-control'
                id='name'
                onChange={e =>
                  setEditData(prevState => ({
                    ...prevState,
                    name: e.target.value ? e.target.value : "",
                  }))
                }
                value={editData?.name}
              />
            </div>
          </div>
          {editData?.citys?.map((city, index) => {
            return (
              <div key={city.id}>
                <InputGroupComponent
                  item={city}
                  onUpdate={newItem => {
                    handleUpdate(newItem);
                  }}
                />
                {index !== editData?.citys.length - 1 && <hr />}
              </div>
            );
          })}
          <Row className={"justify-content-center mt-5"}>
            <Button
              variant='primary'
              className={"w-auto"}
              onClick={() => handlerAddNewCity()}
            >
              Adicionar mais uma cidade
            </Button>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
