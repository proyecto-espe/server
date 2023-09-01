const app = require("../index");
const request = require("supertest");

const validData = {
  apellidopreinscrito: "González",
  nombrepreinscrito: "Juan",
  cedulapreinscrito: "1234567890",
  edadpreinscrito: 25,
  sexopreinscrito: "Masculino",
  emergenciapreinscrito: "María González",
  telefonopreinscrito: "+1234567890",
  tutorpreinscrito: "Ana González",
  cursopreinscrito: "Programación Avanzada",
  correopreinscrito: "juan.gonzalez@example.com",
  fotopreinscrito: "https://example.com/juan_gonzalez.jpg",
};

const validDataState = {
  fotopreinscrito: "https://example.com/juan_gonzalez.jpg",
  estadopreinscrito1: "Aprobado",
  vaucherinscrito: "https://example.com/payment-confirmation.pdf",
};

const requestData = {
  idEstudiante: 46,
};


describe("POST /preinscritos", () => {
  test("debería devolver Registro Exitoso", async () => {
    const response = await request(app)
      .post("/preinscrito")
      .send(validData) // Enviamos el objeto 'validData' como cuerpo de la solicitud
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Aseguramos que el cuerpo de la respuesta contenga los datos esperados
    expect(response.body).toEqual({
      status: "Registro exitoso",
      result: true,
    });
  });

  test("debería devolver la respuesta esperada", async () => {
    const response = await request(app)
      .post("/consultar-voucher")
      .send(requestData)
      .expect(200) // Cambia el código de estado esperado si es diferente
      .expect("Content-Type", /application\/json/);

  });
});

describe("PUT /preinscritos", () => {
  const idpreinscrito = 55;
  test("debería devolver Actualización Exitosa.", async () => {
    const response = await request(app)
      .put("/preinscrito/actualizar/" + idpreinscrito)
      .send(validData) // Enviamos el objeto 'validData' como cuerpo de la solicitud
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Aseguramos que el cuerpo de la respuesta contenga los datos esperados
    expect(response.body).toEqual({
      status: "Actualizacion exitosa",
    });
  });

  test("debería devolver Actualización Exitosa.", async () => {
    //Actualizando el estado del preinscrito
    const response = await request(app)
      .put("/preinscrito/actualizar1/" + idpreinscrito)
      .send(validDataState) // Enviamos el objeto 'validData' como cuerpo de la solicitud
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Aseguramos que el cuerpo de la respuesta contenga los datos esperados
    expect(response.body).toEqual({
      status: "Actualizacion exitosa",
    });
  });
});

describe("GET /preinscritos", () => {
  test("debería devolver la respuesta esperada", async () => {
    const response = await request(app)
      .get("/preinscritos")
      .expect(200) // Cambia el código de estado esperado si es diferente
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);
    //debe de tener al menos un elemento
    expect(response.body.length).toBeGreaterThan(0);
  });
});
