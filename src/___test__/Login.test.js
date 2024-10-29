import { render, screen } from "@testing-library/react"
import Login from "../Components/Login/Login"
import store from "../redux/store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"


describe("Login Component", () => {
  // test("renders Login form correctly", () => {
  //   //render Login component

  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     </Provider>
  //   )
  //   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
  //   expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  //   expect(screen.getByTestId("submitBtn")).toBeInTheDocument()

  // })

  test("handle successfull login", async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          message: "Logged in",
          response: true,
          token: "faketoken",
          user: {
            _id: "67001334724c3efa820bd81b",
            name: "Shrikant Jha",
            email: "shrikantj@gmail.com",
            password: "$2b$10$3/vWFidtC77a6yKWQh7K3...",
            location: {
              type:"type",
              Point:""
            } // Add any other fields as necessary
          },
        })
      })
    })
  })
})