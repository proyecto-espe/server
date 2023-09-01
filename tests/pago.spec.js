const app = require("../index");
const request = require("supertest");


describe("POST /pago", () => {
    test("debería registrar un pago exitosamente", async () => {
      // Definimos el cuerpo de la solicitud (request body)
      const requestBody = {
        cedulapago: "1234567890",
        nombrepago: "Juan González",
        idEstudiante: 46,
        fotopago: "https://example.com/payment-receipt.jpg",
      };
  
      // Definimos la respuesta esperada del servidor
      const expectedResponse = {
        result: true,
        status: "Registro exitoso",
      };
  
      // Realizamos la solicitud POST al endpoint /pago
      const response = await request(app)
        .post("/pago")
        .send(requestBody) // Enviamos el cuerpo de la solicitud
        .expect(200) // Esperamos un código de estado 200 (OK)
        .expect("Content-Type", /application\/json/); // Esperamos un tipo de contenido JSON
  
      // Verificamos que la respuesta del servidor coincida con la respuesta esperada
      expect(response.body).toEqual(expectedResponse);
    });
  });