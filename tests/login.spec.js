const app = require("../index");
const request = require("supertest");

describe("POST /login", () => {
  const validData = {
    username: "lecastro3",
    password: "lecastro3",
  };

  const invalidData = {
    username: "invaliduserss",
    password: "lecastro3",
  };

  const resp = {
    idusario: 1,
    nombreusuario: "lecastro3",
    contrasenausuario: "lecastro3",
  };

  test("debería devolver los datos del usuario correctamente", async () => {
    // Enviamos una solicitud POST al endpoint /login con datos válidos
    const response = await request(app)
      .post("/login")
      .send(validData)
      .expect(200) // Espero un código de estado 200 (OK)
      .expect("Content-Type", /application\/json/);

    // Verifico que el cuerpo de la respuesta sea igual a los datos de usuario esperados
    expect(response.body).toEqual(resp);
  });

  test("debería devolver un error en caso de inicio de sesión no válido", async () => {
    // Enviamos una solicitud POST al endpoint /login con datos inválidos
    const response = await request(app)
      .post("/login")
      .send(invalidData)
      .expect(400); // Supongo un código de estado 400 (Bad Request)

    // Verifico que el cuerpo de la respuesta esté vacío, lo que indica un error
    expect(response.body).toEqual({});
  });
});
